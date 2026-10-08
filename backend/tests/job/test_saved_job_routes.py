"""
Tests for Saved Job API routes.
"""

from datetime import datetime
from uuid import uuid4
from unittest.mock import AsyncMock

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.routes.saved_jobs import (
    get_current_user_id,
    get_saved_job_service,
    router,
)
from app.models.saved_job import SavedJob
from app.services.saved_job_service import (
    SavedJobAlreadyExistsError,
    SavedJobNotFoundError,
)


def make_saved_job(user_id=None, job_id=None) -> SavedJob:
    saved_job = SavedJob(
        user_id=user_id or uuid4(),
        job_id=job_id or uuid4(),
    )

    saved_job.id = uuid4()
    saved_job.created_at = datetime.utcnow()

    return saved_job


@pytest.fixture
def service():
    return AsyncMock()


@pytest.fixture
def user_id():
    return uuid4()


@pytest.fixture
def client(service, user_id):
    app = FastAPI()
    app.include_router(router)

    app.dependency_overrides[get_saved_job_service] = lambda: service
    app.dependency_overrides[get_current_user_id] = lambda: user_id

    yield TestClient(app)

    app.dependency_overrides.clear()


def test_save_job(client, service, user_id):
    job_id = uuid4()
    saved_job = make_saved_job(
        user_id=user_id,
        job_id=job_id,
    )

    service.save_job.return_value = saved_job

    response = client.post(
        "/api/v1/saved-jobs",
        json={"job_id": str(job_id)},
    )

    assert response.status_code == 201
    assert response.json()["id"] == str(saved_job.id)
    assert response.json()["user_id"] == str(user_id)
    assert response.json()["job_id"] == str(job_id)

    service.save_job.assert_awaited_once()


def test_save_job_returns_409_for_duplicate(
    client,
    service,
):
    service.save_job.side_effect = SavedJobAlreadyExistsError(
        "Job has already been saved."
    )

    response = client.post(
        "/api/v1/saved-jobs",
        json={"job_id": str(uuid4())},
    )

    assert response.status_code == 409
    assert response.json()["detail"] == "Job has already been saved."


def test_list_saved_jobs(client, service, user_id):
    saved_jobs = [
        make_saved_job(user_id=user_id),
        make_saved_job(user_id=user_id),
    ]

    service.list_saved_jobs.return_value = (
        saved_jobs,
        2,
    )

    response = client.get(
        "/api/v1/saved-jobs",
        params={"skip": 0, "limit": 20},
    )

    assert response.status_code == 200
    assert response.json()["total"] == 2
    assert len(response.json()["items"]) == 2

    service.list_saved_jobs.assert_awaited_once_with(
        user_id=user_id,
        skip=0,
        limit=20,
    )


def test_list_saved_jobs_with_pagination(
    client,
    service,
    user_id,
):
    service.list_saved_jobs.return_value = (
        [],
        0,
    )

    response = client.get(
        "/api/v1/saved-jobs",
        params={"skip": 10, "limit": 5},
    )

    assert response.status_code == 200

    service.list_saved_jobs.assert_awaited_once_with(
        user_id=user_id,
        skip=10,
        limit=5,
    )


def test_delete_saved_job(
    client,
    service,
):
    saved_job_id = uuid4()
    service.delete_saved_job.return_value = True

    response = client.delete(
        f"/api/v1/saved-jobs/{saved_job_id}",
    )

    assert response.status_code == 204
    assert response.content == b""

    service.delete_saved_job.assert_awaited_once()


def test_delete_saved_job_returns_404_when_missing(
    client,
    service,
):
    service.delete_saved_job.side_effect = SavedJobNotFoundError(
        "Saved Job was not found."
    )

    response = client.delete(
        f"/api/v1/saved-jobs/{uuid4()}",
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Saved Job was not found."


def test_list_saved_jobs_rejects_invalid_limit(client, service):
    response = client.get(
        "/api/v1/saved-jobs",
        params={"limit": 0},
    )

    assert response.status_code == 422
    service.list_saved_jobs.assert_not_awaited()


def test_list_saved_jobs_rejects_excessive_limit(client, service):
    response = client.get(
        "/api/v1/saved-jobs",
        params={"limit": 101},
    )

    assert response.status_code == 422
    service.list_saved_jobs.assert_not_awaited()
