"""
Tests for Job service business logic.
"""

from unittest.mock import AsyncMock
from uuid import uuid4

import pytest

from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate
from app.services.job_service import (
    JobNotFoundError,
    JobService,
)


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
    return job


def make_create_data() -> JobCreate:
    return JobCreate(
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
    )


@pytest.fixture
def repository():
    return AsyncMock()


@pytest.fixture
def service(repository):
    return JobService(repository)


@pytest.mark.anyio
async def test_create_job(service, repository):
    job = make_job()
    repository.create.return_value = job

    result = await service.create_job(make_create_data())

    assert result is job
    repository.create.assert_awaited_once()


@pytest.mark.anyio
async def test_get_job(service, repository):
    job = make_job()
    repository.get_by_id.return_value = job

    result = await service.get_job(job.id)

    assert result is job
    repository.get_by_id.assert_awaited_once_with(job.id)


@pytest.mark.anyio
async def test_get_job_raises_when_missing(service, repository):
    job_id = uuid4()
    repository.get_by_id.return_value = None

    with pytest.raises(JobNotFoundError, match="Job was not found"):
        await service.get_job(job_id)


@pytest.mark.anyio
async def test_list_jobs(service, repository):
    jobs = [make_job(), make_job()]
    repository.get_all.return_value = (jobs, 2)

    result, total = await service.list_jobs(skip=0, limit=20)

    assert result == jobs
    assert total == 2

    repository.get_all.assert_awaited_once_with(
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


@pytest.mark.anyio
async def test_list_jobs_with_search_filters_and_sorting(
    service,
    repository,
):
    jobs = [make_job()]
    repository.get_all.return_value = (jobs, 1)

    result, total = await service.list_jobs(
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

    assert result == jobs
    assert total == 1

    repository.get_all.assert_awaited_once_with(
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


@pytest.mark.anyio
async def test_list_jobs_normalizes_negative_skip(service, repository):
    repository.get_all.return_value = ([], 0)

    await service.list_jobs(skip=-5, limit=20)

    repository.get_all.assert_awaited_once_with(
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


@pytest.mark.anyio
async def test_list_jobs_normalizes_invalid_limit(service, repository):
    repository.get_all.return_value = ([], 0)

    await service.list_jobs(skip=0, limit=0)

    repository.get_all.assert_awaited_once_with(
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


@pytest.mark.anyio
async def test_update_job(service, repository):
    job = make_job()
    repository.get_by_id.return_value = job
    repository.update.return_value = job

    update_data = JobUpdate(title="Senior Backend Developer")

    result = await service.update_job(
        job.id,
        update_data,
    )

    assert result is job

    repository.get_by_id.assert_awaited_once_with(job.id)
    repository.update.assert_awaited_once_with(
        job.id,
        {"title": "Senior Backend Developer"},
    )


@pytest.mark.anyio
async def test_update_job_returns_existing_job_when_no_changes(
    service,
    repository,
):
    job = make_job()
    repository.get_by_id.return_value = job

    result = await service.update_job(
        job.id,
        JobUpdate(),
    )

    assert result is job
    repository.update.assert_not_awaited()


@pytest.mark.anyio
async def test_update_job_raises_when_missing(
    service,
    repository,
):
    job_id = uuid4()
    repository.get_by_id.return_value = None

    with pytest.raises(JobNotFoundError, match="Job was not found"):
        await service.update_job(
            job_id,
            JobUpdate(title="Senior Developer"),
        )

    repository.update.assert_not_awaited()


@pytest.mark.anyio
async def test_delete_job(service, repository):
    job = make_job()

    repository.get_by_id.return_value = job
    repository.delete.return_value = True

    result = await service.delete_job(job.id)

    assert result is True

    repository.get_by_id.assert_awaited_once_with(job.id)
    repository.delete.assert_awaited_once_with(job.id)


@pytest.mark.anyio
async def test_delete_job_raises_when_missing(
    service,
    repository,
):
    job_id = uuid4()
    repository.get_by_id.return_value = None

    with pytest.raises(JobNotFoundError, match="Job was not found"):
        await service.delete_job(job_id)

    repository.delete.assert_not_awaited()
@pytest.mark.anyio
async def test_get_categories(service, repository):
    categories = [
        "Data Science",
        "Software",
        "Testing",
    ]

    repository.get_categories.return_value = categories

    result = await service.get_categories()

    assert result == categories
    repository.get_categories.assert_awaited_once()


