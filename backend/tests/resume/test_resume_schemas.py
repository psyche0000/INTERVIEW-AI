"""
Resume Schema Tests
===================

Tests validation rules for the Resume Pydantic schemas.
"""

from datetime import datetime, timezone
from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.schemas.resume import (
    ResumeBase,
    ResumeCreate,
    ResumeHistoryResponse,
    ResumeListResponse,
    ResumeResponse,
    ResumeUpdate,
)


def valid_resume_create_data():
    return {
        "original_file_name": "resume.pdf",
        "file_type": "pdf",
        "stored_file_name": "stored-resume.pdf",
        "file_size": 1024,
        "storage_path": "storage/resumes/stored-resume.pdf",
        "version": 1,
    }


def valid_resume_response_data():
    now = datetime.now(timezone.utc)

    return {
        "id": uuid4(),
        "user_id": uuid4(),
        "original_file_name": "resume.pdf",
        "file_type": "pdf",
        "stored_file_name": "stored-resume.pdf",
        "file_size": 1024,
        "storage_path": "storage/resumes/stored-resume.pdf",
        "version": 1,
        "is_active": True,
        "created_at": now,
        "updated_at": now,
    }


def test_resume_base_accepts_valid_data():
    schema = ResumeBase(
        original_file_name="resume.pdf",
        file_type="pdf",
    )

    assert schema.original_file_name == "resume.pdf"
    assert schema.file_type == "pdf"


def test_resume_base_rejects_empty_filename():
    with pytest.raises(ValidationError):
        ResumeBase(
            original_file_name="",
            file_type="pdf",
        )


def test_resume_base_rejects_filename_over_255_characters():
    with pytest.raises(ValidationError):
        ResumeBase(
            original_file_name="a" * 256,
            file_type="pdf",
        )


def test_resume_create_uses_default_version():
    data = valid_resume_create_data()
    data.pop("version")

    schema = ResumeCreate(**data)

    assert schema.version == 1


def test_resume_create_rejects_negative_file_size():
    data = valid_resume_create_data()
    data["file_size"] = -1

    with pytest.raises(ValidationError):
        ResumeCreate(**data)


def test_resume_create_rejects_invalid_version():
    data = valid_resume_create_data()
    data["version"] = 0

    with pytest.raises(ValidationError):
        ResumeCreate(**data)


def test_resume_create_rejects_storage_path_over_1000_characters():
    data = valid_resume_create_data()
    data["storage_path"] = "a" * 1001

    with pytest.raises(ValidationError):
        ResumeCreate(**data)


def test_resume_update_accepts_valid_filename():
    schema = ResumeUpdate(
        original_file_name="updated-resume.pdf",
    )

    assert schema.original_file_name == "updated-resume.pdf"


def test_resume_update_allows_omitted_filename():
    schema = ResumeUpdate()

    assert schema.original_file_name is None


def test_resume_update_rejects_empty_filename():
    with pytest.raises(ValidationError):
        ResumeUpdate(
            original_file_name="",
        )


def test_resume_update_rejects_filename_over_255_characters():
    with pytest.raises(ValidationError):
        ResumeUpdate(
            original_file_name="a" * 256,
        )


def test_resume_response_accepts_valid_data():
    data = valid_resume_response_data()

    schema = ResumeResponse(**data)

    assert schema.id == data["id"]
    assert schema.user_id == data["user_id"]
    assert schema.version == 1
    assert schema.is_active is True


def test_resume_response_rejects_invalid_version():
    data = valid_resume_response_data()
    data["version"] = 0

    with pytest.raises(ValidationError):
        ResumeResponse(**data)


def test_resume_response_rejects_negative_file_size():
    data = valid_resume_response_data()
    data["file_size"] = -1

    with pytest.raises(ValidationError):
        ResumeResponse(**data)


def test_resume_response_requires_timestamps():
    data = valid_resume_response_data()
    data.pop("created_at")

    with pytest.raises(ValidationError):
        ResumeResponse(**data)


def test_resume_history_response_accepts_valid_data():
    now = datetime.now(timezone.utc)

    schema = ResumeHistoryResponse(
        id=uuid4(),
        resume_id=uuid4(),
        version=1,
        original_file_name="resume.pdf",
        file_type="pdf",
        file_size=1024,
        storage_path="storage/resumes/resume.pdf",
        created_at=now,
    )

    assert schema.version == 1
    assert schema.file_type == "pdf"


def test_resume_history_rejects_invalid_version():
    with pytest.raises(ValidationError):
        ResumeHistoryResponse(
            id=uuid4(),
            resume_id=uuid4(),
            version=0,
            original_file_name="resume.pdf",
            file_type="pdf",
            file_size=1024,
            storage_path="storage/resumes/resume.pdf",
            created_at=datetime.now(timezone.utc),
        )


def test_resume_list_defaults_to_empty_items():
    schema = ResumeListResponse(total=0)

    assert schema.items == []
    assert schema.total == 0


def test_resume_list_rejects_negative_total():
    with pytest.raises(ValidationError):
        ResumeListResponse(total=-1)


def test_resume_list_accepts_resume_items():
    resume = ResumeResponse(**valid_resume_response_data())

    schema = ResumeListResponse(
        items=[resume],
        total=1,
    )

    assert len(schema.items) == 1
    assert schema.total == 1