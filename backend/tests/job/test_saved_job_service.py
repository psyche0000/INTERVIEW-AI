"""
Tests for Saved Job service business logic.
"""

from unittest.mock import AsyncMock
from uuid import uuid4

import pytest

from app.models.saved_job import SavedJob
from app.schemas.saved_job import SavedJobCreate
from app.services.saved_job_service import (
    SavedJobAlreadyExistsError,
    SavedJobNotFoundError,
    SavedJobService,
)


def make_saved_job(
    user_id=None,
    job_id=None,
) -> SavedJob:
    saved_job = SavedJob(
        user_id=user_id or uuid4(),
        job_id=job_id or uuid4(),
    )
    saved_job.id = uuid4()

    return saved_job


@pytest.fixture
def repository():
    return AsyncMock()


@pytest.fixture
def service(repository):
    return SavedJobService(repository)


@pytest.mark.anyio
async def test_save_job(service, repository):
    user_id = uuid4()
    job_id = uuid4()
    saved_job = make_saved_job(
        user_id=user_id,
        job_id=job_id,
    )

    repository.get_by_user_and_job.return_value = None
    repository.create.return_value = saved_job

    result = await service.save_job(
        user_id,
        SavedJobCreate(job_id=job_id),
    )

    assert result is saved_job

    repository.get_by_user_and_job.assert_awaited_once_with(
        user_id,
        job_id,
    )

    repository.create.assert_awaited_once_with(
        {
            "user_id": user_id,
            "job_id": job_id,
        }
    )


@pytest.mark.anyio
async def test_save_job_raises_for_duplicate(
    service,
    repository,
):
    user_id = uuid4()
    job_id = uuid4()

    repository.get_by_user_and_job.return_value = make_saved_job(
        user_id=user_id,
        job_id=job_id,
    )

    with pytest.raises(
        SavedJobAlreadyExistsError,
        match="Job has already been saved",
    ):
        await service.save_job(
            user_id,
            SavedJobCreate(job_id=job_id),
        )

    repository.create.assert_not_awaited()


@pytest.mark.anyio
async def test_list_saved_jobs(service, repository):
    user_id = uuid4()
    saved_jobs = [
        make_saved_job(user_id=user_id),
        make_saved_job(user_id=user_id),
    ]

    repository.get_user_saved_jobs.return_value = (
        saved_jobs,
        2,
    )

    result, total = await service.list_saved_jobs(
        user_id,
        skip=0,
        limit=20,
    )

    assert result == saved_jobs
    assert total == 2

    repository.get_user_saved_jobs.assert_awaited_once_with(
        user_id,
        skip=0,
        limit=20,
    )


@pytest.mark.anyio
async def test_list_saved_jobs_normalizes_pagination(
    service,
    repository,
):
    user_id = uuid4()
    repository.get_user_saved_jobs.return_value = (
        [],
        0,
    )

    await service.list_saved_jobs(
        user_id,
        skip=-5,
        limit=0,
    )

    repository.get_user_saved_jobs.assert_awaited_once_with(
        user_id,
        skip=0,
        limit=20,
    )


@pytest.mark.anyio
async def test_delete_saved_job(service, repository):
    user_id = uuid4()
    saved_job = make_saved_job(
        user_id=user_id,
    )

    repository.get_by_id.return_value = saved_job
    repository.delete.return_value = True

    result = await service.delete_saved_job(
        user_id,
        saved_job.id,
    )

    assert result is True

    repository.get_by_id.assert_awaited_once_with(
        saved_job.id,
    )

    repository.delete.assert_awaited_once_with(
        saved_job.id,
    )


@pytest.mark.anyio
async def test_delete_saved_job_raises_when_missing(
    service,
    repository,
):
    user_id = uuid4()
    saved_job_id = uuid4()

    repository.get_by_id.return_value = None

    with pytest.raises(
        SavedJobNotFoundError,
        match="Saved Job was not found",
    ):
        await service.delete_saved_job(
            user_id,
            saved_job_id,
        )

    repository.delete.assert_not_awaited()


@pytest.mark.anyio
async def test_delete_saved_job_raises_for_wrong_user(
    service,
    repository,
):
    user_id = uuid4()
    other_user_id = uuid4()

    saved_job = make_saved_job(
        user_id=other_user_id,
    )

    repository.get_by_id.return_value = saved_job

    with pytest.raises(
        SavedJobNotFoundError,
        match="Saved Job was not found",
    ):
        await service.delete_saved_job(
            user_id,
            saved_job.id,
        )

    repository.delete.assert_not_awaited()


@pytest.mark.anyio
async def test_delete_saved_job_raises_when_delete_fails(
    service,
    repository,
):
    user_id = uuid4()
    saved_job = make_saved_job(
        user_id=user_id,
    )

    repository.get_by_id.return_value = saved_job
    repository.delete.return_value = False

    with pytest.raises(
        SavedJobNotFoundError,
        match="Saved Job was not found",
    ):
        await service.delete_saved_job(
            user_id,
            saved_job.id,
        )