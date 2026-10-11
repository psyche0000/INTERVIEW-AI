from unittest.mock import AsyncMock

import pytest

from app.models.job_category import JobCategory
from app.schemas.job_category import JobCategoryCreate, JobCategoryUpdate
from app.services.job_category_service import (
    DuplicateJobCategoryError,
    JobCategoryNotFoundError,
    JobCategoryService,
)


@pytest.fixture
def repository():
    return AsyncMock()


@pytest.fixture
def service(repository):
    return JobCategoryService(repository)


def make_category(category_id=1, name="Software"):
    return JobCategory(
        id=category_id,
        name=name,
        description="Software roles",
    )


@pytest.mark.anyio
async def test_get_all(service, repository):
    categories = [make_category()]
    repository.get_all.return_value = categories

    result = await service.get_all()

    assert result == categories
    repository.get_all.assert_awaited_once()


@pytest.mark.anyio
async def test_get_by_id_not_found(service, repository):
    repository.get_by_id.return_value = None

    with pytest.raises(JobCategoryNotFoundError):
        await service.get_by_id(999)


@pytest.mark.anyio
async def test_create_category(service, repository):
    category = make_category()
    repository.get_by_name.return_value = None
    repository.create.return_value = category

    result = await service.create(
        JobCategoryCreate(name="Software", description="Software roles")
    )

    assert result is category
    repository.create.assert_awaited_once()


@pytest.mark.anyio
async def test_create_duplicate_category(service, repository):
    repository.get_by_name.return_value = make_category()

    with pytest.raises(DuplicateJobCategoryError):
        await service.create(JobCategoryCreate(name="Software"))

    repository.create.assert_not_awaited()


@pytest.mark.anyio
async def test_update_category(service, repository):
    category = make_category()
    repository.get_by_id.return_value = category
    repository.get_by_name.return_value = None
    repository.update.return_value = category

    result = await service.update(
        1,
        JobCategoryUpdate(name="Engineering"),
    )

    assert result is category
    repository.update.assert_awaited_once_with(
        1,
        {"name": "Engineering"},
    )


@pytest.mark.anyio
async def test_update_duplicate_category(service, repository):
    repository.get_by_id.return_value = make_category()
    repository.get_by_name.return_value = make_category(
        category_id=2,
        name="Engineering",
    )

    with pytest.raises(DuplicateJobCategoryError):
        await service.update(1, JobCategoryUpdate(name="Engineering"))

    repository.update.assert_not_awaited()


@pytest.mark.anyio
async def test_delete_category_not_found(service, repository):
    repository.delete.return_value = False

    with pytest.raises(JobCategoryNotFoundError):
        await service.delete(999)
