"""
Tests for Job API routes.
"""

from datetime import datetime
from uuid import uuid4
from unittest.mock import AsyncMock

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.routes.jobs import get_job_service, router
from app.models.job import Job


def make_job() -> Job:
    job = Job(
        title="Backend Developer",
        company_name="Example Corp",
        description="Build backend APIs.",
        location="Remote",
        employment_type="Full-time",
        experience_level="Mid-level",
        salary_min=50000,
        salary_max=80000,
        currency="USD",
        category="Software",
        skills=["Python", "FastAPI"],
        is_active=True,
    )

    job.id = uuid4()
    job.created_at = datetime.utcnow()
    job.updated_at = job.created_at

    return job


@pytest.fixture
def service():
    return AsyncMock()


@pytest.fixture
def client(service):
    app = FastAPI()
    app.include_router(router)

    app.dependency_overrides[get_job_service] = lambda: service

    yield TestClient(app)

    app.dependency_overrides.clear()


def job_payload():
    return {
        "title": "Backend Developer",
        "company_name": "Example Corp",
        "description": "Build backend APIs.",
        "location": "Remote",
        "employment_type": "Full-time",
        "experience_level": "Mid-level",
        "salary_min": 50000,
        "salary_max": 80000,
        "currency": "USD",
        "category": "Software",
        "skills": ["Python", "FastAPI"],
    }


def test_create_job(client, service):
    job = make_job()
    service.create_job.return_value = job

    response = client.post(
        "/api/v1/jobs",
        json=job_payload(),
    )

    assert response.status_code == 201
    assert response.json()["id"] == str(job.id)
    assert response.json()["title"] == "Backend Developer"

    service.create_job.assert_awaited_once()


def test_list_jobs(client, service):
    jobs = [make_job(), make_job()]
    service.list_jobs.return_value = (jobs, 2)

    response = client.get(
        "/api/v1/jobs",
        params={"skip": 0, "limit": 20},
    )

    assert response.status_code == 200
    assert response.json()["total"] == 2
    assert len(response.json()["items"]) == 2

    service.list_jobs.assert_awaited_once_with(
        search=None,
        location=None,
        category=None,
        employment_type=None,
        experience_level=None,
        sort_by="created_at",
        sort_order="desc",
        skip=0,
        limit=20,
    )
    

def test_list_jobs_with_search_filters_and_sorting(client, service):
    jobs = [make_job()]
    service.list_jobs.return_value = (jobs, 1)

    response = client.get(
        "/api/v1/jobs",
        params={
            "search": "Python",
            "location": "Kolkata",
            "category": "Software",
            "employment_type": "Full-time",
            "experience_level": "Mid-level",
            "sort_by": "title",
            "sort_order": "asc",
            "skip": 10,
            "limit": 5,
        },
    )

    assert response.status_code == 200
    assert response.json()["total"] == 1
    assert len(response.json()["items"]) == 1

    service.list_jobs.assert_awaited_once_with(
        search="Python",
        location="Kolkata",
        category="Software",
        employment_type="Full-time",
        experience_level="Mid-level",
        sort_by="title",
        sort_order="asc",
        skip=10,
        limit=5,
    )


def test_get_job(client, service):
    job = make_job()
    service.get_job.return_value = job

    response = client.get(
        f"/api/v1/jobs/{job.id}",
    )

    assert response.status_code == 200
    assert response.json()["id"] == str(job.id)


def test_get_job_returns_404_when_missing(client, service):
    from app.services.job_service import JobNotFoundError

    service.get_job.side_effect = JobNotFoundError(
        "Job was not found."
    )

    response = client.get(
        f"/api/v1/jobs/{uuid4()}",
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Job was not found."


def test_update_job(client, service):
    job = make_job()
    service.update_job.return_value = job

    response = client.put(
        f"/api/v1/jobs/{job.id}",
        json={"title": "Senior Backend Developer"},
    )

    assert response.status_code == 200
    assert response.json()["id"] == str(job.id)

    service.update_job.assert_awaited_once()


def test_update_job_returns_404_when_missing(client, service):
    from app.services.job_service import JobNotFoundError

    service.update_job.side_effect = JobNotFoundError(
        "Job was not found."
    )

    response = client.put(
        f"/api/v1/jobs/{uuid4()}",
        json={"title": "Senior Backend Developer"},
    )

    assert response.status_code == 404


def test_delete_job(client, service):
    job_id = uuid4()
    service.delete_job.return_value = True

    response = client.delete(
        f"/api/v1/jobs/{job_id}",
    )

    assert response.status_code == 204
    assert response.content == b""

    service.delete_job.assert_awaited_once_with(job_id)


def test_delete_job_returns_404_when_missing(client, service):
    from app.services.job_service import JobNotFoundError

    service.delete_job.side_effect = JobNotFoundError(
        "Job was not found."
    )

    response = client.delete(
        f"/api/v1/jobs/{uuid4()}",
    )

    assert response.status_code == 404
def test_get_job_categories(client, service):
    categories = [
        "Data Science",
        "Software",
        "Testing",
    ]

    service.get_categories.return_value = categories

    response = client.get(
        "/api/v1/jobs/categories",
    )

    assert response.status_code == 200
    assert response.json() == categories

    service.get_categories.assert_awaited_once()


