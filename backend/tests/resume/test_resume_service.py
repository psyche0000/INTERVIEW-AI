"""
Tests for Resume Service
========================

These tests verify Resume business logic independently of the database.

The repository is replaced with a lightweight mock so that the tests
focus only on the ResumeService behavior.
"""

from types import SimpleNamespace
from uuid import uuid4

import pytest

from app.schemas.resume import ResumeUpdate
from app.services import resume_service
from app.services.resume_service import (
    ResumeNotFoundError,
    ResumeOwnershipError,
    ResumeService,
)


# ---------------------------------------------------------------------------
# Mock Repository
# ---------------------------------------------------------------------------


class MockResumeRepository:
    """
    Simple in-memory repository used by the ResumeService tests.
    """

    def __init__(self):
        self.resumes = {}

    async def create(self, resume_data):
        """Create an in-memory Resume record."""

        resume_id = uuid4()

        resume = SimpleNamespace(
            id=resume_id,
            user_id=resume_data["user_id"],
            original_file_name=resume_data["original_file_name"],
            stored_file_name=resume_data["stored_file_name"],
            file_type=resume_data["file_type"],
            file_size=resume_data["file_size"],
            storage_path=resume_data["storage_path"],
            version=resume_data["version"],
            is_active=True,
        )

        self.resumes[resume_id] = resume

        return resume

    async def get_by_id(self, resume_id):
        """Return a Resume by ID."""

        return self.resumes.get(resume_id)

    async def get_user_resumes(
        self,
        user_id,
        *,
        skip=0,
        limit=20,
    ):
        """Return resumes belonging to a user."""

        user_resumes = [
            resume
            for resume in self.resumes.values()
            if resume.user_id == user_id
        ]

        total = len(user_resumes)

        return (
            user_resumes[skip : skip + limit],
            total,
        )

    async def get_active_resume(self, user_id):
        """Return the active Resume for a user."""

        for resume in self.resumes.values():
            if (
                resume.user_id == user_id
                and resume.is_active
            ):
                return resume

        return None

    async def update(self, resume_id, resume_data):
        """Update an in-memory Resume."""

        resume = self.resumes.get(resume_id)

        if resume is None:
            return None

        for field, value in resume_data.items():
            setattr(resume, field, value)

        return resume

    async def delete(self, resume_id):
        """Delete an in-memory Resume."""

        if resume_id not in self.resumes:
            return False

        del self.resumes[resume_id]

        return True

    async def get_history(self, resume_id):
        """Return an empty history for these unit tests."""

        return []


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------


@pytest.fixture
def repository():
    """Provide a fresh mock repository."""

    return MockResumeRepository()


@pytest.fixture
def service(repository):
    """Provide a ResumeService using the mock repository."""

    return ResumeService(repository)


@pytest.fixture
def user_id():
    """Provide a test user ID."""

    return uuid4()


@pytest.fixture
def other_user_id():
    """Provide a different test user ID."""

    return uuid4()





async def async_create_resume(repository, user_id):
    """Create a reusable test Resume."""

    return await repository.create(
        {
            "user_id": user_id,
            "original_file_name": "resume.pdf",
            "stored_file_name": "stored-resume.pdf",
            "file_type": "pdf",
            "file_size": 1024,
            "storage_path": "storage/resumes/stored-resume.pdf",
            "version": 1,
        }
    )


# ---------------------------------------------------------------------------
# Upload Tests
# ---------------------------------------------------------------------------


@pytest.mark.anyio
async def test_upload_resume_cleans_up_file_when_repository_creation_fails(
    service,
    user_id,
    monkeypatch,
):
    """A failed database write should remove the stored resume file."""

    class FailingRepository:
        async def create(self, resume_data):
            raise RuntimeError("Repository creation failed.")

    service = ResumeService(FailingRepository())

    async def mock_save_resume_file(upload_file):
        return (
            "stored-resume.pdf",
            1024,
            "storage/resumes/stored-resume.pdf",
        )

    deleted_paths = []

    def mock_delete_resume_file(storage_path):
        deleted_paths.append(storage_path)

    monkeypatch.setattr(
        resume_service,
        "save_resume_file",
        mock_save_resume_file,
    )

    monkeypatch.setattr(
        resume_service,
        "delete_resume_file",
        mock_delete_resume_file,
    )

    upload_file = SimpleNamespace(
        filename="resume.pdf",
    )

    with pytest.raises(
        RuntimeError,
        match="Repository creation failed.",
    ):
        await service.upload_resume(
            user_id=user_id,
            upload_file=upload_file,
        )

    assert deleted_paths == [
        "storage/resumes/stored-resume.pdf"
    ]


@pytest.mark.anyio
async def test_upload_resume_creates_metadata_and_returns_record(
    user_id,
    monkeypatch,
):
    """A valid upload should produce complete repository metadata."""

    captured_data = {}

    class RecordingRepository:
        async def create(self, resume_data):
            captured_data.update(resume_data)

            return SimpleNamespace(
                id=uuid4(),
                user_id=resume_data["user_id"],
                original_file_name=resume_data["original_file_name"],
                stored_file_name=resume_data["stored_file_name"],
                file_type=resume_data["file_type"],
                file_size=resume_data["file_size"],
                storage_path=resume_data["storage_path"],
                version=resume_data["version"],
                is_active=True,
            )

    service = ResumeService(RecordingRepository())

    async def mock_save_resume_file(upload_file):
        return (
            "generated-file.docx",
            4096,
            "storage/resumes/generated-file.docx",
        )

    monkeypatch.setattr(
        resume_service,
        "save_resume_file",
        mock_save_resume_file,
    )

    upload_file = SimpleNamespace(
        filename="MyResume.DOCX",
    )

    result = await service.upload_resume(
        user_id=user_id,
        upload_file=upload_file,
    )

    assert result.user_id == user_id
    assert result.original_file_name == "MyResume.DOCX"

    assert captured_data["user_id"] == user_id
    assert captured_data["original_file_name"] == "MyResume.DOCX"
    assert captured_data["file_type"] == "docx"
    assert captured_data["stored_file_name"] == "generated-file.docx"
    assert captured_data["file_size"] == 4096
    assert captured_data["storage_path"] == (
        "storage/resumes/generated-file.docx"
    )
    assert captured_data["version"] == 1

# ---------------------------------------------------------------------------
# Get Resume Tests
# ---------------------------------------------------------------------------


@pytest.mark.anyio
async def test_get_resume_returns_owned_resume(
    service,
    repository,
    user_id,
):
    """A user should be able to retrieve their own Resume."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    result = await service.get_resume(
        user_id=user_id,
        resume_id=resume.id,
    )

    assert result.id == resume.id
    assert result.user_id == user_id


@pytest.mark.anyio
async def test_get_resume_raises_for_missing_resume(
    service,
    user_id,
):
    """A missing Resume should raise ResumeNotFoundError."""

    with pytest.raises(ResumeNotFoundError):
        await service.get_resume(
            user_id=user_id,
            resume_id=uuid4(),
        )


@pytest.mark.anyio
async def test_get_resume_rejects_other_user(
    service,
    repository,
    user_id,
    other_user_id,
):
    """A user must not access another user's Resume."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    with pytest.raises(ResumeOwnershipError):
        await service.get_resume(
            user_id=other_user_id,
            resume_id=resume.id,
        )


# ---------------------------------------------------------------------------
# List Tests
# ---------------------------------------------------------------------------


@pytest.mark.anyio
async def test_list_user_resumes_returns_only_user_resumes(
    service,
    repository,
    user_id,
    other_user_id,
):
    """Listing resumes should only return records owned by the user."""

    await async_create_resume(
        repository,
        user_id,
    )

    await async_create_resume(
        repository,
        other_user_id,
    )

    items, total = await service.list_user_resumes(
        user_id=user_id,
    )

    assert total == 1
    assert len(items) == 1
    assert items[0].user_id == user_id


@pytest.mark.anyio
async def test_list_user_resumes_applies_pagination(
    service,
    repository,
    user_id,
):
    """Pagination values should be passed through correctly."""

    await async_create_resume(
        repository,
        user_id,
    )

    await async_create_resume(
        repository,
        user_id,
    )

    items, total = await service.list_user_resumes(
        user_id=user_id,
        skip=1,
        limit=1,
    )

    assert total == 2
    assert len(items) == 1


# ---------------------------------------------------------------------------
# Active Resume Tests
# ---------------------------------------------------------------------------


@pytest.mark.anyio
async def test_get_active_resume(
    service,
    repository,
    user_id,
):
    """The service should return the user's active Resume."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    result = await service.get_active_resume(
        user_id,
    )

    assert result.id == resume.id


@pytest.mark.anyio
async def test_get_active_resume_returns_none_when_no_active_resume_exists(
    service,
    user_id,
):
    """A user without an active Resume should receive None."""

    result = await service.get_active_resume(
        user_id,
    )

    assert result is None


@pytest.mark.anyio
async def test_list_user_resumes_normalizes_negative_skip(
    service,
    repository,
    user_id,
):
    """Negative pagination offsets should be normalized by the service."""

    await async_create_resume(
        repository,
        user_id,
    )

    items, total = await service.list_user_resumes(
        user_id=user_id,
        skip=-10,
        limit=20,
    )

    assert total == 1
    assert len(items) == 1


@pytest.mark.anyio
async def test_list_user_resumes_normalizes_invalid_limit(
    service,
    repository,
    user_id,
):
    """A non-positive limit should fall back to the service default."""

    await async_create_resume(
        repository,
        user_id,
    )

    items, total = await service.list_user_resumes(
        user_id=user_id,
        skip=0,
        limit=0,
    )

    assert total == 1
    assert len(items) == 1

# ---------------------------------------------------------------------------
# Update Tests
# ---------------------------------------------------------------------------


@pytest.mark.anyio
async def test_update_resume_changes_allowed_metadata(
    service,
    repository,
    user_id,
):
    """Allowed Resume metadata should be updated."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    update_data = ResumeUpdate(
        original_file_name="updated-resume.pdf"
    )

    result = await service.update_resume(
        user_id=user_id,
        resume_id=resume.id,
        update_data=update_data,
    )

    assert result.original_file_name == "updated-resume.pdf"

@pytest.mark.anyio
async def test_update_resume_raises_when_repository_returns_none(
    service,
    repository,
    user_id,
    monkeypatch,
):
    """A missing repository result should be treated as a missing Resume."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    async def mock_update(resume_id, resume_data):
        return None

    monkeypatch.setattr(
        repository,
        "update",
        mock_update,
    )

    update_data = ResumeUpdate(
        original_file_name="updated-resume.pdf",
    )

    with pytest.raises(ResumeNotFoundError):
        await service.update_resume(
            user_id=user_id,
            resume_id=resume.id,
            update_data=update_data,
        )

@pytest.mark.anyio
async def test_update_resume_returns_existing_resume_when_no_fields_are_provided(
    service,
    repository,
    user_id,
):
    """An empty update should leave the existing Resume unchanged."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    update_data = ResumeUpdate()

    result = await service.update_resume(
        user_id=user_id,
        resume_id=resume.id,
        update_data=update_data,
    )

    assert result.id == resume.id
    assert result.original_file_name == "resume.pdf"

@pytest.mark.anyio
async def test_update_resume_rejects_other_user(
    service,
    repository,
    user_id,
    other_user_id,
):
    """Users must not update another user's Resume."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    update_data = ResumeUpdate(
        original_file_name="changed.pdf"
    )

    with pytest.raises(ResumeOwnershipError):
        await service.update_resume(
            user_id=other_user_id,
            resume_id=resume.id,
            update_data=update_data,
        )


# ---------------------------------------------------------------------------
# Delete Tests
# ---------------------------------------------------------------------------


@pytest.mark.anyio
async def test_delete_resume(
    service,
    repository,
    user_id,
    monkeypatch,
):
    """Deleting a Resume should remove the database record."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    monkeypatch.setattr(
        resume_service,
        "delete_resume_file",
        lambda storage_path: True,
    )

    result = await service.delete_resume(
        user_id=user_id,
        resume_id=resume.id,
    )

    assert result is True
    assert resume.id not in repository.resumes


@pytest.mark.anyio
async def test_delete_resume_succeeds_when_storage_file_is_missing(
    service,
    repository,
    user_id,
    monkeypatch,
):
    """Resume deletion should succeed when the stored file is already missing."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    deleted_paths = []

    def mock_delete_resume_file(storage_path):
        deleted_paths.append(storage_path)
        return False

    monkeypatch.setattr(
        resume_service,
        "delete_resume_file",
        mock_delete_resume_file,
    )

    result = await service.delete_resume(
        user_id=user_id,
        resume_id=resume.id,
    )

    assert result is True
    assert resume.id not in repository.resumes
    assert deleted_paths == [
        resume.storage_path
    ]


@pytest.mark.anyio
async def test_delete_resume_propagates_storage_cleanup_failure(
    service,
    repository,
    user_id,
    monkeypatch,
):
    """Storage cleanup failures should be surfaced after record deletion."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    def mock_delete_resume_file(storage_path):
        raise OSError("Storage cleanup failed.")

    monkeypatch.setattr(
        resume_service,
        "delete_resume_file",
        mock_delete_resume_file,
    )

    with pytest.raises(OSError, match="Storage cleanup failed."):
        await service.delete_resume(
            user_id=user_id,
            resume_id=resume.id,
        )

    # The repository deletion already succeeded before storage cleanup.
    assert resume.id not in repository.resumes


@pytest.mark.anyio
async def test_delete_resume_rejects_other_user(
    service,
    repository,
    user_id,
    other_user_id,
):
    """Users must not delete another user's Resume."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    with pytest.raises(ResumeOwnershipError):
        await service.delete_resume(
            user_id=other_user_id,
            resume_id=resume.id,
        )


# ---------------------------------------------------------------------------
# History Tests
# ---------------------------------------------------------------------------


@pytest.mark.anyio
async def test_get_resume_history(
    service,
    repository,
    user_id,
):
    """History should only be available for an owned Resume."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    result = await service.get_resume_history(
        user_id=user_id,
        resume_id=resume.id,
    )

    assert result == []


@pytest.mark.anyio
async def test_get_resume_history_rejects_other_user(
    service,
    repository,
    user_id,
    other_user_id,
):
    """Users must not access another user's Resume history."""

    resume = await async_create_resume(
        repository,
        user_id,
    )

    with pytest.raises(ResumeOwnershipError):
        await service.get_resume_history(
            user_id=other_user_id,
            resume_id=resume.id,
        )
        