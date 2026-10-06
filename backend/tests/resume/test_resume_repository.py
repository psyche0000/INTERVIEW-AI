from uuid import uuid4
from unittest.mock import MagicMock

import pytest

from app.models.resume import Resume
from app.models.resume_history import ResumeHistory
from app.repositories.sqlalchemy_resume_repository import (
    SQLAlchemyResumeRepository,
)


@pytest.fixture
def db():
    """Provide a mocked SQLAlchemy session."""
    return MagicMock()


@pytest.fixture
def repository(db):
    """Provide a repository using the mocked session."""
    return SQLAlchemyResumeRepository(db)


@pytest.fixture
def user_id():
    """Provide a test user UUID."""
    return uuid4()


@pytest.fixture
def resume_id():
    """Provide a test resume UUID."""
    return uuid4()


def build_resume(user_id, resume_id=None):
    """Build a Resume entity for repository tests."""
    return Resume(
        id=resume_id or uuid4(),
        user_id=user_id,
        original_file_name="resume.pdf",
        stored_file_name="stored-resume.pdf",
        file_type="pdf",
        file_size=1024,
        storage_path="storage/resumes/stored-resume.pdf",
        version=1,
        is_active=True,
    )


class TestCreate:
    @pytest.mark.anyio
    async def test_create_adds_commits_and_refreshes_resume(
        self,
        repository,
        db,
        user_id,
    ):
        resume_data = {
            "user_id": user_id,
            "original_file_name": "resume.pdf",
            "stored_file_name": "stored-resume.pdf",
            "file_type": "pdf",
            "file_size": 1024,
            "storage_path": "storage/resumes/stored-resume.pdf",
            "version": 1,
        }

        result = await repository.create(resume_data)

        db.add.assert_called_once_with(result)
        db.commit.assert_called_once()
        db.refresh.assert_called_once_with(result)

        assert result.user_id == user_id
        assert result.original_file_name == "resume.pdf"


class TestGetById:
    @pytest.mark.anyio
    async def test_get_by_id_returns_resume(
        self,
        repository,
        db,
        user_id,
        resume_id,
    ):
        resume = build_resume(user_id, resume_id)
        db.get.return_value = resume

        result = await repository.get_by_id(resume_id)

        db.get.assert_called_once_with(Resume, resume_id)
        assert result is resume


class TestGetUserResumes:
    @pytest.mark.anyio
    async def test_get_user_resumes_returns_records_and_total(
        self,
        repository,
        db,
        user_id,
    ):
        resume = build_resume(user_id)

        db.scalar.return_value = 1
        db.scalars.return_value.all.return_value = [resume]

        resumes, total = await repository.get_user_resumes(
            user_id,
            skip=0,
            limit=20,
        )

        assert resumes == [resume]
        assert total == 1
        db.scalar.assert_called_once()


class TestGetActiveResume:
    @pytest.mark.anyio
    async def test_get_active_resume_returns_active_record(
        self,
        repository,
        db,
        user_id,
    ):
        resume = build_resume(user_id)

        db.scalars.return_value.first.return_value = resume

        result = await repository.get_active_resume(user_id)

        assert result is resume
        db.scalars.assert_called_once()


class TestUpdate:
    @pytest.mark.anyio
    async def test_update_changes_fields_and_persists(
        self,
        repository,
        db,
        user_id,
        resume_id,
    ):
        resume = build_resume(user_id, resume_id)
        db.get.return_value = resume

        result = await repository.update(
            resume_id,
            {"original_file_name": "updated.pdf"},
        )

        assert result is resume
        assert resume.original_file_name == "updated.pdf"

        db.get.assert_called_once_with(Resume, resume_id)
        db.commit.assert_called_once()
        db.refresh.assert_called_once_with(resume)

    @pytest.mark.anyio
    async def test_update_returns_none_when_resume_does_not_exist(
        self,
        repository,
        db,
        resume_id,
    ):
        db.get.return_value = None

        result = await repository.update(
            resume_id,
            {"original_file_name": "updated.pdf"},
        )

        assert result is None
        db.commit.assert_not_called()


class TestDelete:
    @pytest.mark.anyio
    async def test_delete_removes_existing_resume(
        self,
        repository,
        db,
        user_id,
        resume_id,
    ):
        resume = build_resume(user_id, resume_id)
        db.get.return_value = resume

        result = await repository.delete(resume_id)

        assert result is True
        db.get.assert_called_once_with(Resume, resume_id)
        db.delete.assert_called_once_with(resume)
        db.commit.assert_called_once()

    @pytest.mark.anyio
    async def test_delete_returns_false_when_resume_does_not_exist(
        self,
        repository,
        db,
        resume_id,
    ):
        db.get.return_value = None

        result = await repository.delete(resume_id)

        assert result is False
        db.delete.assert_not_called()
        db.commit.assert_not_called()


class TestGetHistory:
    @pytest.mark.anyio
    async def test_get_history_returns_history_records(
        self,
        repository,
        db,
        resume_id,
    ):
        history = MagicMock(spec=ResumeHistory)

        db.scalars.return_value.all.return_value = [history]

        result = await repository.get_history(resume_id)

        assert result == [history]
        db.scalars.assert_called_once()