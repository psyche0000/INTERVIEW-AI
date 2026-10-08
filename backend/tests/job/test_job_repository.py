"""
Tests for the SQLAlchemy Job repository.
"""

from uuid import uuid4
from unittest.mock import MagicMock

import pytest

from app.models.job import Job
from app.repositories.sqlalchemy_job_repository import SQLAlchemyJobRepository


def make_job(**overrides) -> Job:
    data = {
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
        "is_active": True,
    }
    data.update(overrides)

    job = Job(**data)
    job.id = uuid4()

    return job


@pytest.fixture
def db():
    return MagicMock()


@pytest.fixture
def repository(db):
    return SQLAlchemyJobRepository(db)


@pytest.mark.anyio
async def test_create(repository, db):
    job_data = {
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
        "is_active": True,
    }

    result = await repository.create(job_data)

    assert result is not None
    assert result.title == "Backend Developer"

    db.add.assert_called_once()
    db.commit.assert_called_once()
    db.refresh.assert_called_once()


@pytest.mark.anyio
async def test_get_by_id(repository, db):
    job_id = uuid4()
    job = make_job()
    job.id = job_id

    db.get.return_value = job

    result = await repository.get_by_id(job_id)

    assert result is job
    db.get.assert_called_once_with(Job, job_id)


@pytest.mark.anyio
async def test_get_by_id_returns_none(repository, db):
    job_id = uuid4()

    db.get.return_value = None

    result = await repository.get_by_id(job_id)

    assert result is None


@pytest.mark.anyio
async def test_get_all(repository, db):
    job1 = make_job()
    job2 = make_job(title="Frontend Developer")

    db.scalar.return_value = 2

    scalars_result = MagicMock()
    scalars_result.all.return_value = [job1, job2]
    db.scalars.return_value = scalars_result

    result, total = await repository.get_all(
        skip=0,
        limit=20,
    )

    assert result == [job1, job2]
    assert total == 2

    db.scalar.assert_called_once()
    db.scalars.assert_called_once()


@pytest.mark.anyio
async def test_get_all_with_search(repository, db):
    job = make_job(title="Python Backend Developer")

    db.scalar.return_value = 1

    scalars_result = MagicMock()
    scalars_result.all.return_value = [job]
    db.scalars.return_value = scalars_result

    result, total = await repository.get_all(
        search="Python",
    )

    assert result == [job]
    assert total == 1

    statement = db.scalars.call_args.args[0]
    compiled = str(statement)

    assert "lower(jobs.title) LIKE lower" in compiled
    assert "lower(jobs.company_name) LIKE lower" in compiled
    assert "lower(jobs.description) LIKE lower" in compiled
    assert "lower(jobs.category) LIKE lower" in compiled


@pytest.mark.anyio
async def test_get_all_with_filters(repository, db):
    job = make_job(
        location="Kolkata",
        category="Software",
        employment_type="Full-time",
        experience_level="Mid-level",
    )

    db.scalar.return_value = 1

    scalars_result = MagicMock()
    scalars_result.all.return_value = [job]
    db.scalars.return_value = scalars_result

    result, total = await repository.get_all(
        location="Kolkata",
        category="Software",
        employment_type="Full-time",
        experience_level="Mid-level",
    )

    assert result == [job]
    assert total == 1

    statement = db.scalars.call_args.args[0]
    compiled = str(statement)

    assert "jobs.location" in compiled
    assert "jobs.category" in compiled
    assert "jobs.employment_type" in compiled
    assert "jobs.experience_level" in compiled


@pytest.mark.anyio
async def test_get_all_with_sorting(repository, db):
    job1 = make_job(title="A Developer")
    job2 = make_job(title="Z Developer")

    db.scalar.return_value = 2

    scalars_result = MagicMock()
    scalars_result.all.return_value = [job1, job2]
    db.scalars.return_value = scalars_result

    result, total = await repository.get_all(
        sort_by="title",
        sort_order="asc",
    )

    assert result == [job1, job2]
    assert total == 2

    statement = db.scalars.call_args.args[0]
    compiled = str(statement)

    assert "ORDER BY jobs.title ASC" in compiled


@pytest.mark.anyio
async def test_get_all_with_pagination(repository, db):
    job = make_job()

    db.scalar.return_value = 10

    scalars_result = MagicMock()
    scalars_result.all.return_value = [job]
    db.scalars.return_value = scalars_result

    result, total = await repository.get_all(
        skip=20,
        limit=10,
    )

    assert result == [job]
    assert total == 10

    statement = db.scalars.call_args.args[0]

    assert statement._offset_clause is not None
    assert statement._limit_clause is not None

    # assert str(statement._offset_clause) == ":param_1"
    # assert str(statement._limit_clause) == ":param_2"
    assert statement._offset_clause.value == 20
    assert statement._limit_clause.value == 10


@pytest.mark.anyio
async def test_get_all_returns_empty_list(repository, db):
    db.scalar.return_value = 0

    scalars_result = MagicMock()
    scalars_result.all.return_value = []
    db.scalars.return_value = scalars_result

    result, total = await repository.get_all()

    assert result == []
    assert total == 0


@pytest.mark.anyio
async def test_update(repository, db):
    job_id = uuid4()
    job = make_job()
    job.id = job_id

    db.get.return_value = job

    result = await repository.update(
        job_id,
        {"title": "Senior Backend Developer"},
    )

    assert result is job
    assert job.title == "Senior Backend Developer"

    db.commit.assert_called_once()
    db.refresh.assert_called_once_with(job)


@pytest.mark.anyio
async def test_update_returns_none_for_missing_job(repository, db):
    job_id = uuid4()

    db.get.return_value = None

    result = await repository.update(
        job_id,
        {"title": "Senior Backend Developer"},
    )

    assert result is None
    db.commit.assert_not_called()


@pytest.mark.anyio
async def test_delete(repository, db):
    job_id = uuid4()
    job = make_job()
    job.id = job_id

    db.get.return_value = job

    result = await repository.delete(job_id)

    assert result is True

    db.delete.assert_called_once_with(job)
    db.commit.assert_called_once()


@pytest.mark.anyio
async def test_delete_returns_false_for_missing_job(repository, db):
    job_id = uuid4()

    db.get.return_value = None

    result = await repository.delete(job_id)

    assert result is False

    db.delete.assert_not_called()
    db.commit.assert_not_called()
@pytest.mark.anyio
async def test_get_categories(repository, db):
    db.scalars.return_value.all.return_value = [
        "Data Science",
        "Software",
        "Testing",
    ]

    result = await repository.get_categories()

    assert result == [
        "Data Science",
        "Software",
        "Testing",
    ]

    db.scalars.assert_called_once()

    statement = db.scalars.call_args.args[0]
    compiled = str(statement)

    assert "jobs.category" in compiled
    assert "DISTINCT" in compiled
    assert "ORDER BY jobs.category ASC" in compiled


