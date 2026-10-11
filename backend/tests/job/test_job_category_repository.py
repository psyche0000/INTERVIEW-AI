from unittest.mock import MagicMock

import pytest
from sqlalchemy.exc import IntegrityError

from app.models.job_category import JobCategory
from app.repositories.job_category_repository import JobCategoryRepository


@pytest.fixture
def db():
    return MagicMock()


@pytest.fixture
def repository(db):
    return JobCategoryRepository(db)


@pytest.mark.anyio
async def test_get_all(repository, db):
    categories = [JobCategory(id=1, name="Software")]
    db.scalars.return_value.all.return_value = categories

    result = await repository.get_all()

    assert result == categories
    db.scalars.assert_called_once()


@pytest.mark.anyio
async def test_get_by_id(repository, db):
    category = JobCategory(id=1, name="Software")
    db.get.return_value = category

    result = await repository.get_by_id(1)

    assert result is category
    db.get.assert_called_once_with(JobCategory, 1)


@pytest.mark.anyio
async def test_get_by_name(repository, db):
    category = JobCategory(id=1, name="Software")
    db.scalars.return_value.first.return_value = category

    result = await repository.get_by_name("Software")

    assert result is category
    db.scalars.assert_called_once()


@pytest.mark.anyio
async def test_create(repository, db):
    db.refresh.side_effect = lambda category: setattr(category, "id", 1)

    result = await repository.create({"name": "Software"})

    assert result.name == "Software"
    db.add.assert_called_once()
    db.commit.assert_called_once()
    db.refresh.assert_called_once()


@pytest.mark.anyio
async def test_create_rolls_back_on_integrity_error(repository, db):
    db.commit.side_effect = IntegrityError("insert", {}, Exception("duplicate"))

    with pytest.raises(IntegrityError):
        await repository.create({"name": "Software"})

    db.rollback.assert_called_once()


@pytest.mark.anyio
async def test_update(repository, db):
    category = JobCategory(id=1, name="Software")
    db.get.return_value = category

    result = await repository.update(1, {"name": "Engineering"})

    assert result is category
    assert category.name == "Engineering"
    db.commit.assert_called_once()
    db.refresh.assert_called_once_with(category)


@pytest.mark.anyio
async def test_update_missing_category(repository, db):
    db.get.return_value = None

    result = await repository.update(999, {"name": "Engineering"})

    assert result is None
    db.commit.assert_not_called()


@pytest.mark.anyio
async def test_delete(repository, db):
    category = JobCategory(id=1, name="Software")
    db.get.return_value = category

    result = await repository.delete(1)

    assert result is True
    db.delete.assert_called_once_with(category)
    db.commit.assert_called_once()


@pytest.mark.anyio
async def test_delete_missing_category(repository, db):
    db.get.return_value = None

    result = await repository.delete(999)

    assert result is False
    db.delete.assert_not_called()
    db.commit.assert_not_called()
