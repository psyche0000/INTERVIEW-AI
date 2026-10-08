"""
Tests for Job Pydantic schemas.
"""

from datetime import datetime
from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.schemas.job import (
    JobCreate,
    JobListResponse,
    JobResponse,
    JobUpdate,
)


def valid_job_data() -> dict:
    return {
        "title": "Backend Developer",
        "company_name": "Example Corp",
        "description": "Build and maintain backend APIs.",
        "location": "Remote",
        "employment_type": "Full-time",
        "experience_level": "Mid-level",
        "salary_min": 50000,
        "salary_max": 80000,
        "currency": "USD",
        "category": "Software",
        "skills": ["Python", "FastAPI"],
    }


def test_job_create_accepts_valid_data():
    job = JobCreate(**valid_job_data())

    assert job.title == "Backend Developer"
    assert job.company_name == "Example Corp"
    assert job.skills == ["Python", "FastAPI"]


def test_job_create_uses_default_currency():
    data = valid_job_data()
    data.pop("currency")

    job = JobCreate(**data)

    assert job.currency == "USD"


def test_job_create_uses_empty_skills_by_default():
    data = valid_job_data()
    data.pop("skills")

    job = JobCreate(**data)

    assert job.skills == []


@pytest.mark.parametrize(
    "field",
    [
        "title",
        "company_name",
        "description",
        "location",
        "employment_type",
        "experience_level",
        "category",
    ],
)
def test_job_create_rejects_empty_required_strings(field):
    data = valid_job_data()
    data[field] = ""

    with pytest.raises(ValidationError):
        JobCreate(**data)


def test_job_create_rejects_negative_salary():
    data = valid_job_data()
    data["salary_min"] = -1

    with pytest.raises(ValidationError):
        JobCreate(**data)


def test_job_update_allows_partial_updates():
    job = JobUpdate(title="Senior Backend Developer")

    assert job.title == "Senior Backend Developer"
    assert job.company_name is None
    assert job.skills is None


def test_job_update_allows_active_status_update():
    job = JobUpdate(is_active=False)

    assert job.is_active is False


def test_job_response_from_attributes():
    job_id = uuid4()
    now = datetime.utcnow()

    class JobObject:
        id = job_id
        title = "Backend Developer"
        company_name = "Example Corp"
        description = "Build APIs."
        location = "Remote"
        employment_type = "Full-time"
        experience_level = "Mid-level"
        salary_min = 50000
        salary_max = 80000
        currency = "USD"
        category = "Software"
        skills = ["Python"]
        is_active = True
        created_at = now
        updated_at = now

    response = JobResponse.model_validate(JobObject())

    assert response.id == job_id
    assert response.title == "Backend Developer"
    assert response.is_active is True


def test_job_list_response():
    job_id = uuid4()
    now = datetime.utcnow()

    response = JobListResponse(
        items=[
            JobResponse(
                id=job_id,
                title="Backend Developer",
                company_name="Example Corp",
                description="Build APIs.",
                location="Remote",
                employment_type="Full-time",
                experience_level="Mid-level",
                salary_min=50000,
                salary_max=80000,
                currency="USD",
                category="Software",
                skills=["Python"],
                is_active=True,
                created_at=now,
                updated_at=now,
            )
        ],
        total=1,
    )

    assert len(response.items) == 1
    assert response.total == 1


def test_job_list_response_rejects_negative_total():
    with pytest.raises(ValidationError):
        JobListResponse(items=[], total=-1)