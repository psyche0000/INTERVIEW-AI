"""
Resume API Route Tests
======================

Tests the HTTP contract of the Resume API routes using dependency
overrides and a mocked ResumeService.

These tests intentionally avoid the database and authentication
implementations owned by other backend members.
"""


from types import SimpleNamespace
from uuid import UUID, uuid4
from datetime import datetime, timezone

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.routes.resumes import (
    get_current_user_id,
    get_resume_service,
    router,
)
from app.services.resume_service import ResumeNotFoundError


USER_ID = uuid4()
# OTHER_USER_ID = uuid4()
RESUME_ID = uuid4()


def make_resume(
    *,
    resume_id: UUID = RESUME_ID,
    user_id: UUID = USER_ID,
):
    """Create a lightweight object compatible with ResumeResponse."""

    return SimpleNamespace(
        id=resume_id,
        user_id=user_id,
        original_file_name="resume.pdf",
        stored_file_name="stored-resume.pdf",
        file_type="pdf",
        file_size=1024,
        storage_path="storage/resumes/stored-resume.pdf",
        version=1,
        is_active=True,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )


class MockResumeService:
    """Mock service used to isolate route behavior."""

    def __init__(self):
        self.upload_called = False
        self.list_called = False
        self.get_called = False
        self.update_called = False
        self.delete_called = False
        self.history_called = False

    async def upload_resume(self, user_id, upload_file):
        self.upload_called = True
        return make_resume(user_id=user_id)

    async def list_user_resumes(self, user_id, skip, limit):
        self.list_called = True
        return [make_resume(user_id=user_id)], 1

    async def get_resume(self, user_id, resume_id):
        self.get_called = True

        if resume_id == RESUME_ID:
            return make_resume(user_id=user_id)

        raise ResumeNotFoundError(
            f"Resume '{resume_id}' was not found."
        )

    async def update_resume(self, user_id, resume_id, update_data):
        self.update_called = True

        if resume_id == RESUME_ID:
            return make_resume(user_id=user_id)

        raise ResumeNotFoundError(
            f"Resume '{resume_id}' was not found."
        )

    async def delete_resume(self, user_id, resume_id):
        self.delete_called = True

        if resume_id == RESUME_ID:
            return None

        raise ResumeNotFoundError(
            f"Resume '{resume_id}' was not found."
        )

    async def get_resume_history(self, user_id, resume_id):
        self.history_called = True

        if resume_id == RESUME_ID:
            return []

        raise ResumeNotFoundError(
            f"Resume '{resume_id}' was not found."
        )


@pytest.fixture
def test_context():
    """Create an isolated FastAPI application and mock dependencies."""

    app = FastAPI()
    app.include_router(router)

    service = MockResumeService()

    app.dependency_overrides[get_resume_service] = lambda: service
    app.dependency_overrides[get_current_user_id] = lambda: USER_ID

    client = TestClient(app)

    yield client, service

    app.dependency_overrides.clear()


def test_list_resumes(test_context):
    client, service = test_context

    response = client.get(
        "/api/v1/resumes",
        params={"skip": 0, "limit": 20},
    )

    assert response.status_code == 200

    data = response.json()

    assert data["total"] == 1
    assert len(data["items"]) == 1
    assert data["items"][0]["user_id"] == str(USER_ID)
    assert service.list_called is True


def test_list_resumes_validates_pagination(test_context):
    client, _ = test_context

    response = client.get(
        "/api/v1/resumes",
        params={"skip": -1},
    )

    assert response.status_code == 422

    response = client.get(
        "/api/v1/resumes",
        params={"limit": 101},
    )

    assert response.status_code == 422


def test_get_resume(test_context):
    client, service = test_context

    response = client.get(
        f"/api/v1/resumes/{RESUME_ID}",
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == str(RESUME_ID)
    assert data["user_id"] == str(USER_ID)
    assert data["original_file_name"] == "resume.pdf"
    assert service.get_called is True


def test_get_resume_not_found(test_context):
    client, _ = test_context

    missing_id = uuid4()

    response = client.get(
        f"/api/v1/resumes/{missing_id}",
    )

    assert response.status_code == 404


def test_get_resume_rejects_invalid_uuid(test_context):
    client, _ = test_context

    response = client.get(
        "/api/v1/resumes/not-a-uuid",
    )

    assert response.status_code == 422


def test_update_resume(test_context):
    client, service = test_context

    response = client.put(
        f"/api/v1/resumes/{RESUME_ID}",
        json={"original_file_name": "updated-resume.pdf"},
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == str(RESUME_ID)
    assert service.update_called is True


def test_update_resume_not_found(test_context):
    client, _ = test_context

    missing_id = uuid4()

    response = client.put(
        f"/api/v1/resumes/{missing_id}",
        json={"original_file_name": "updated.pdf"},
    )

    assert response.status_code == 404


def test_delete_resume(test_context):
    client, service = test_context

    response = client.delete(
        f"/api/v1/resumes/{RESUME_ID}",
    )

    assert response.status_code == 204
    assert response.content == b""
    assert service.delete_called is True


def test_delete_resume_not_found(test_context):
    client, _ = test_context

    missing_id = uuid4()

    response = client.delete(
        f"/api/v1/resumes/{missing_id}",
    )

    assert response.status_code == 404


def test_get_resume_history(test_context):
    client, service = test_context

    response = client.get(
        f"/api/v1/resumes/{RESUME_ID}/history",
    )

    assert response.status_code == 200
    assert response.json() == []
    assert service.history_called is True


def test_get_resume_history_not_found(test_context):
    client, _ = test_context

    missing_id = uuid4()

    response = client.get(
        f"/api/v1/resumes/{missing_id}/history",
    )

    assert response.status_code == 404


def test_upload_resume(test_context):
    client, service = test_context

    response = client.post(
        "/api/v1/resumes/upload",
        files={
            "file": (
                "resume.pdf",
                b"%PDF-test-resume",
                "application/pdf",
            )
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["user_id"] == str(USER_ID)
    assert data["original_file_name"] == "resume.pdf"
    assert service.upload_called is True


def test_upload_resume_requires_file(test_context):
    client, _ = test_context

    response = client.post(
        "/api/v1/resumes/upload",
    )

    assert response.status_code == 422