from datetime import datetime
from uuid import uuid4
from unittest.mock import AsyncMock

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.routes.admin_jobs import get_admin_job_service, router
from app.core.dependencies import get_current_user
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
    job.created_at = datetime.now()
    job.updated_at = job.created_at
    return job


@pytest.fixture
def service():
    return AsyncMock()


@pytest.fixture
def client(service):
    app = FastAPI()
    app.include_router(router)
    app.dependency_overrides[get_admin_job_service] = lambda: service

    yield app, TestClient(app)

    app.dependency_overrides.clear()


def test_admin_create_job_requires_authentication(client):
    _, test_client = client
    response = test_client.post(
        "/api/v1/admin/jobs",
        json={
            "title": "Backend Developer",
            "company_name": "Example Corp",
            "description": "Build APIs.",
            "location": "Remote",
            "employment_type": "Full-time",
            "experience_level": "Mid-level",
            "category": "Software",
            "skills": ["Python"],
        },
    )
    assert response.status_code == 401


@pytest.mark.parametrize(
    "method,path,payload",
    [
        (
            "post",
            "/api/v1/admin/jobs",
            {
                "title": "Backend Developer",
                "company_name": "Example Corp",
                "description": "Build APIs.",
                "location": "Remote",
                "employment_type": "Full-time",
                "experience_level": "Mid-level",
                "category": "Software",
                "skills": ["Python"],
            },
        ),
        ("put", f"/api/v1/admin/jobs/{uuid4()}", {"title": "Updated"}),
        ("delete", f"/api/v1/admin/jobs/{uuid4()}", None),
    ],
)
def test_admin_job_write_routes_reject_non_admin(client, method, path, payload):
    app, test_client = client
    app.dependency_overrides[get_current_user] = lambda: {
        "id": 2,
        "email": "user@example.com",
        "role": "user",
    }

    response = getattr(test_client, method)(
        path,
        json=payload,
    ) if payload is not None else getattr(test_client, method)(path)

    assert response.status_code == 403


def test_admin_create_job_succeeds_for_admin(client, service):
    app, test_client = client
    app.dependency_overrides[get_current_user] = lambda: {
        "id": 1,
        "email": "admin@example.com",
        "role": "admin",
    }

    job = make_job()
    service.create_job.return_value = job

    response = test_client.post(
        "/api/v1/admin/jobs",
        json={
            "title": job.title,
            "company_name": job.company_name,
            "description": job.description,
            "location": job.location,
            "employment_type": job.employment_type,
            "experience_level": job.experience_level,
            "salary_min": job.salary_min,
            "salary_max": job.salary_max,
            "currency": job.currency,
            "category": job.category,
            "skills": job.skills,
        },
    )

    assert response.status_code == 201
    assert response.json()["id"] == str(job.id)
    service.create_job.assert_awaited_once()
