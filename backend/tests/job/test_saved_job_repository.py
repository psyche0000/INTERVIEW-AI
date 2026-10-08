"""
Tests for the SQLAlchemy Saved Job repository.
"""

from unittest.mock import MagicMock
from uuid import uuid4

import pytest

from app.models.saved_job import SavedJob
from app.repositories.sqlalchemy_saved_job_repository import (
    SQLAlchemySavedJobRepository,
)


def make_saved_job(**overrides) -> SavedJob:
    data = {
        "user_id": uuid4(),
        "job_id": uuid4(),
    }
    data.update(overrides)

    saved_job = SavedJob(**data)
    saved_job.id = uuid4()

    return saved_job


@pytest.fixture
def db():
    return MagicMock()


@pytest.fixture
def repository(db):
    return SQLAlchemySavedJobRepository(db)


@pytest.mark.anyio
async def test_create(repository, db):
    saved_job_data = {
        "user_id": uuid4(),
        "job_id": uuid4(),
    }

    result = await repository.create(saved_job_data)

    assert result is not None
    assert result.user_id == saved_job_data["user_id"]
    assert result.job_id == saved_job_data["job_id"]

    db.add.assert_called_once()
    db.commit.assert_called_once()
    db.refresh.assert_called_once()


@pytest.mark.anyio
async def test_get_by_id(repository, db):
    saved_job_id = uuid4()
    saved_job = make_saved_job()
    saved_job.id = saved_job_id

    db.get.return_value = saved_job

    result = await repository.get_by_id(saved_job_id)

    assert result is saved_job
    db.get.assert_called_once_with(
        SavedJob,
        saved_job_id,
    )


@pytest.mark.anyio
async def test_get_by_id_returns_none(repository, db):
    saved_job_id = uuid4()

    db.get.return_value = None

    result = await repository.get_by_id(saved_job_id)

    assert result is None


@pytest.mark.anyio
async def test_get_by_user_and_job(repository, db):
    user_id = uuid4()
    job_id = uuid4()
    saved_job = make_saved_job(
        user_id=user_id,
        job_id=job_id,
    )

    scalars_result = MagicMock()
    scalars_result.first.return_value = saved_job
    db.scalars.return_value = scalars_result

    result = await repository.get_by_user_and_job(
        user_id,
        job_id,
    )

    assert result is saved_job
    db.scalars.assert_called_once()
    scalars_result.first.assert_called_once()


@pytest.mark.anyio
async def test_get_by_user_and_job_returns_none(repository, db):
    db.scalars.return_value.first.return_value = None

    result = await repository.get_by_user_and_job(
        uuid4(),
        uuid4(),
    )

    assert result is None


@pytest.mark.anyio
async def test_get_user_saved_jobs(repository, db):
    user_id = uuid4()

    saved_job1 = make_saved_job(user_id=user_id)
    saved_job2 = make_saved_job(user_id=user_id)

    db.scalar.return_value = 2

    scalars_result = MagicMock()
    scalars_result.all.return_value = [
        saved_job1,
        saved_job2,
    ]
    db.scalars.return_value = scalars_result

    result, total = await repository.get_user_saved_jobs(
        user_id,
        skip=0,
        limit=20,
    )

    assert result == [
        saved_job1,
        saved_job2,
    ]
    assert total == 2

    db.scalar.assert_called_once()
    db.scalars.assert_called_once()


@pytest.mark.anyio
async def test_get_user_saved_jobs_with_pagination(
    repository,
    db,
):
    user_id = uuid4()

    db.scalar.return_value = 5

    scalars_result = MagicMock()
    scalars_result.all.return_value = []
    db.scalars.return_value = scalars_result

    result, total = await repository.get_user_saved_jobs(
        user_id,
        skip=20,
        limit=10,
    )

    assert result == []
    assert total == 5

    statement = db.scalars.call_args.args[0]

    assert statement._offset_clause.value == 20
    assert statement._limit_clause.value == 10


@pytest.mark.anyio
async def test_delete(repository, db):
    saved_job_id = uuid4()
    saved_job = make_saved_job()
    saved_job.id = saved_job_id

    db.get.return_value = saved_job

    result = await repository.delete(saved_job_id)

    assert result is True

    db.delete.assert_called_once_with(saved_job)
    db.commit.assert_called_once()


@pytest.mark.anyio
async def test_delete_returns_false_for_missing_saved_job(
    repository,
    db,
):
    saved_job_id = uuid4()

    db.get.return_value = None

    result = await repository.delete(saved_job_id)

    assert result is False

    db.delete.assert_not_called()
    db.commit.assert_not_called()