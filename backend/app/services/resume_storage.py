"""
Resume File Storage Service
============================

This module handles file-level operations for resumes.

Responsibilities:
- Validate uploaded resume file extensions.
- Validate uploaded resume file sizes.
- Generate safe unique storage filenames.
- Create the resume storage directory when needed.
- Save uploaded files to disk.
- Delete stored resume files.

"""

from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Directory where uploaded resume files will be stored.
# It is relative to the backend project directory.
RESUME_STORAGE_DIR = Path("storage/resumes")

# Maximum allowed resume file size.
# Current limit: 10 MB.
MAX_RESUME_FILE_SIZE = 10 * 1024 * 1024

# Resume formats currently supported by the project.
ALLOWED_RESUME_EXTENSIONS = {
    ".pdf",
    ".doc",
    ".docx",
}


# ---------------------------------------------------------------------------
# Custom Exceptions
# ---------------------------------------------------------------------------


class ResumeFileError(Exception):
    """
    Base exception for resume file validation/storage errors.
    """

    pass


class InvalidResumeFileTypeError(ResumeFileError):
    """
    Raised when an uploaded file has an unsupported extension.
    """

    pass


class ResumeFileTooLargeError(ResumeFileError):
    """
    Raised when an uploaded resume exceeds the maximum file size.
    """

    pass


class ResumeFileEmptyError(ResumeFileError):
    """
    Raised when an uploaded resume is empty.
    """

    pass


# ---------------------------------------------------------------------------
# File Validation
# ---------------------------------------------------------------------------


def get_file_extension(filename: str) -> str:
    """
    Return the lowercase file extension.

    Example:
        "My Resume.PDF" -> ".pdf"
    """

    return Path(filename).suffix.lower()


def validate_resume_file_type(filename: str) -> str:
    """
    Validate the resume file extension.

    Returns:
        The normalized lowercase extension.

    Raises:
        InvalidResumeFileTypeError:
            If the extension is not supported.
    """

    extension = get_file_extension(filename)

    if extension not in ALLOWED_RESUME_EXTENSIONS:
        allowed = ", ".join(sorted(ALLOWED_RESUME_EXTENSIONS))

        raise InvalidResumeFileTypeError(
            f"Unsupported resume file type '{extension}'. "
            f"Allowed types: {allowed}."
        )

    return extension


def validate_resume_file_size(file_size: int) -> None:
    """
    Validate the resume file size.

    Args:
        file_size:
            Size of the uploaded file in bytes.

    Raises:
        ResumeFileEmptyError:
            If the file is empty.

        ResumeFileTooLargeError:
            If the file exceeds the configured maximum size.
    """

    if file_size <= 0:
        raise ResumeFileEmptyError(
            "The uploaded resume file is empty."
        )

    if file_size > MAX_RESUME_FILE_SIZE:
        max_size_mb = MAX_RESUME_FILE_SIZE / (1024 * 1024)

        raise ResumeFileTooLargeError(
            f"Resume file is too large. "
            f"Maximum allowed size is {max_size_mb:.0f} MB."
        )


# ---------------------------------------------------------------------------
# Filename Generation
# ---------------------------------------------------------------------------


def generate_stored_filename(original_filename: str) -> str:
    """
    Generate a unique filename for storage.

    The original filename is NOT used directly as the storage filename.

    Example:
        resume.pdf
        ->
        550e8400-e29b-41d4-a716-446655440000.pdf

    This prevents filename collisions and avoids trusting user-provided
    filenames for filesystem storage.
    """

    extension = validate_resume_file_type(original_filename)

    return f"{uuid4()}{extension}"


# ---------------------------------------------------------------------------
# Storage Directory
# ---------------------------------------------------------------------------


def ensure_resume_storage_directory() -> Path:
    """
    Create the resume storage directory if it does not already exist.

    Returns:
        Path to the resume storage directory.
    """

    RESUME_STORAGE_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    return RESUME_STORAGE_DIR


# ---------------------------------------------------------------------------
# Save Resume
# ---------------------------------------------------------------------------


async def save_resume_file(
    upload_file: UploadFile,
) -> tuple[str, int, str]:
    """
    Validate and save an uploaded resume file.

    Args:
        upload_file:
            FastAPI UploadFile received from the API endpoint.

    Returns:
        A tuple containing:

        (
            stored_filename,
            file_size,
            storage_path,
        )

    Raises:
        InvalidResumeFileTypeError:
            If the file extension is unsupported.

        ResumeFileEmptyError:
            If the file contains no data.

        ResumeFileTooLargeError:
            If the file exceeds the maximum size.
    """

    # Validate extension before writing anything to disk.
    extension = validate_resume_file_type(
        upload_file.filename or ""
    )

    # Read the uploaded file.
    file_content = await upload_file.read()

    # Validate actual uploaded content size.
    file_size = len(file_content)

    validate_resume_file_size(file_size)

    # Ensure the storage directory exists.
    storage_directory = ensure_resume_storage_directory()

   # Generate a unique filename using the shared helper.
    stored_filename = generate_stored_filename(
        upload_file.filename or ""
    )

    # Construct the final filesystem path.
    storage_path = storage_directory / stored_filename

    # Write the uploaded file to disk.
    storage_path.write_bytes(file_content)

    return (
        stored_filename,
        file_size,
        str(storage_path),
    )


# ---------------------------------------------------------------------------
# Delete Resume
# ---------------------------------------------------------------------------


def delete_resume_file(storage_path: str) -> bool:
    """
    Delete a stored resume file.

    Args:
        storage_path:
            Filesystem path of the stored resume.

    Returns:
        True if a file was deleted.
        False if the file did not exist.

    Raises:
        ValueError:
            If the requested path is outside the configured resume
            storage directory.
    """

    file_path = Path(storage_path).resolve()
    storage_directory = RESUME_STORAGE_DIR.resolve()

    # Security check:
    # Only files inside the configured resume directory may be deleted.
    try:
        file_path.relative_to(storage_directory)
    except ValueError as exc:
        raise ValueError(
            "Invalid resume storage path."
        ) from exc

    if not file_path.exists():
        return False

    if not file_path.is_file():
        raise ValueError(
            "Resume storage path does not point to a file."
        )

    file_path.unlink()

    return True