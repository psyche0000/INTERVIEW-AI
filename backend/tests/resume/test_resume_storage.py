"""
Tests for Resume File Storage
==============================

These tests cover the file-level validation and storage behavior.

Database and authentication are intentionally not involved here.
"""

from pathlib import Path

import pytest
from fastapi import UploadFile
from io import BytesIO

from app.services import resume_storage


# ---------------------------------------------------------------------------
# File Type Tests
# ---------------------------------------------------------------------------


def test_validate_resume_file_type_accepts_pdf():
    """PDF files should be accepted."""

    extension = resume_storage.validate_resume_file_type(
        "resume.pdf"
    )

    assert extension == ".pdf"


def test_validate_resume_file_type_accepts_doc():
    """DOC files should be accepted."""

    extension = resume_storage.validate_resume_file_type(
        "resume.doc"
    )

    assert extension == ".doc"


def test_validate_resume_file_type_accepts_docx():
    """DOCX files should be accepted."""

    extension = resume_storage.validate_resume_file_type(
        "resume.docx"
    )

    assert extension == ".docx"


def test_validate_resume_file_type_is_case_insensitive():
    """Uppercase extensions should be normalized."""

    extension = resume_storage.validate_resume_file_type(
        "RESUME.PDF"
    )

    assert extension == ".pdf"


def test_validate_resume_file_type_rejects_unsupported_file():
    """Unsupported file extensions should raise an exception."""

    with pytest.raises(
        resume_storage.InvalidResumeFileTypeError
    ):
        resume_storage.validate_resume_file_type(
            "resume.txt"
        )


# ---------------------------------------------------------------------------
# File Size Tests
# ---------------------------------------------------------------------------


def test_validate_resume_file_size_rejects_empty_file():
    """Zero-byte files should be rejected."""

    with pytest.raises(
        resume_storage.ResumeFileEmptyError
    ):
        resume_storage.validate_resume_file_size(0)


def test_validate_resume_file_size_accepts_valid_file():
    """A normal file size should be accepted."""

    resume_storage.validate_resume_file_size(
        1024
    )


def test_validate_resume_file_size_rejects_large_file():
    """Files larger than the configured limit should be rejected."""

    oversized_file = (
        resume_storage.MAX_RESUME_FILE_SIZE + 1
    )

    with pytest.raises(
        resume_storage.ResumeFileTooLargeError
    ):
        resume_storage.validate_resume_file_size(
            oversized_file
        )


# ---------------------------------------------------------------------------
# Filename Tests
# ---------------------------------------------------------------------------


def test_generate_stored_filename_preserves_extension():
    """Generated filenames should preserve the validated extension."""

    stored_filename = (
        resume_storage.generate_stored_filename(
            "My Resume.PDF"
        )
    )

    assert stored_filename.endswith(".pdf")


def test_generate_stored_filename_is_unique():
    """Two generated filenames should not be identical."""

    first_filename = (
        resume_storage.generate_stored_filename(
            "resume.pdf"
        )
    )

    second_filename = (
        resume_storage.generate_stored_filename(
            "resume.pdf"
        )
    )

    assert first_filename != second_filename


# ---------------------------------------------------------------------------
# Storage Directory Tests
# ---------------------------------------------------------------------------


def test_ensure_resume_storage_directory(tmp_path, monkeypatch):
    """The storage directory should be created when it does not exist."""

    storage_directory = tmp_path / "resumes"

    monkeypatch.setattr(
        resume_storage,
        "RESUME_STORAGE_DIR",
        storage_directory,
    )

    result = (
        resume_storage.ensure_resume_storage_directory()
    )

    assert result == storage_directory
    assert storage_directory.exists()
    assert storage_directory.is_dir()


# ---------------------------------------------------------------------------
# Delete File Tests
# ---------------------------------------------------------------------------


def test_delete_resume_file_deletes_existing_file(
    tmp_path,
    monkeypatch,
):
    """An existing resume file should be deleted."""

    storage_directory = tmp_path / "resumes"
    storage_directory.mkdir()

    resume_file = storage_directory / "resume.pdf"
    resume_file.write_bytes(b"test resume")

    monkeypatch.setattr(
        resume_storage,
        "RESUME_STORAGE_DIR",
        storage_directory,
    )

    result = resume_storage.delete_resume_file(
        str(resume_file)
    )

    assert result is True
    assert not resume_file.exists()


def test_delete_resume_file_returns_false_for_missing_file(
    tmp_path,
    monkeypatch,
):
    """Deleting a missing file should return False."""

    storage_directory = tmp_path / "resumes"
    storage_directory.mkdir()

    missing_file = storage_directory / "missing.pdf"

    monkeypatch.setattr(
        resume_storage,
        "RESUME_STORAGE_DIR",
        storage_directory,
    )

    result = resume_storage.delete_resume_file(
        str(missing_file)
    )

    assert result is False


def test_delete_resume_file_rejects_path_outside_storage(
    tmp_path,
    monkeypatch,
):
    """Files outside the resume storage directory must not be deleted."""

    storage_directory = tmp_path / "resumes"
    storage_directory.mkdir()

    outside_file = tmp_path / "outside.pdf"
    outside_file.write_bytes(b"do not delete")

    monkeypatch.setattr(
        resume_storage,
        "RESUME_STORAGE_DIR",
        storage_directory,
    )

    with pytest.raises(ValueError):
        resume_storage.delete_resume_file(
            str(outside_file)
        )

    assert outside_file.exists()