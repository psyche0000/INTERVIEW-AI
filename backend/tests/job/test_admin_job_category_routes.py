from datetime import datetime, timezone
from unittest.mock import AsyncMock

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.routes.admin_job_categories import (
    get_job_category_service,
    router,
)
from app.core.dependencies import get_current_user
from app.models.job_category import JobCategory


@pytest.fixture
def service():
    return AsyncMock()


@pytest.fixture
def client(service):
    app = FastAPI()
    app.include_router(router)
    app.dependency_overrides[get_job_category_service] = lambda: service

    yield app, TestClient(app)

    app.dependency_overrides.clear()


def make_category(category_id=1, name="Software"):
    return JobCategory(
        id=category_id,
        name=name,
        description="Software-related roles",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )


def set_admin(app):
    app.dependency_overrides[get_current_user] = lambda: {
        "id": 1,
        "email": "admin@example.com",
        "role": "admin",
    }


def test_category_routes_require_authentication(client):
    _, test_client = client

    response = test_client.get("/api/v1/admin/job-categories")

    assert response.status_code == 401


@pytest.mark.parametrize(
    "method,path,payload",
    [
        ("get", "/api/v1/admin/job-categories", None),
        ("get", "/api/v1/admin/job-categories/1", None),
        ("post", "/api/v1/admin/job-categories", {"name": "Software"}),
        ("patch", "/api/v1/admin/job-categories/1", {"name": "Updated"}),
        ("delete", "/api/v1/admin/job-categories/1", None),
    ],
)
def test_category_routes_reject_non_admin(client, method, path, payload):
    app, test_client = client
    app.dependency_overrides[get_current_user] = lambda: {
        "id": 2,
        "email": "user@example.com",
        "role": "user",
    }

    if payload is None:
        response = getattr(test_client, method)(path)
    else:
        response = getattr(test_client, method)(path, json=payload)

    assert response.status_code == 403


def test_list_categories(client, service):
    app, test_client = client
    set_admin(app)
    service.get_all.return_value = [make_category()]

    response = test_client.get("/api/v1/admin/job-categories")

    assert response.status_code == 200
    assert response.json()[0]["name"] == "Software"
    service.get_all.assert_awaited_once()


def test_create_category(client, service):
    app, test_client = client
    set_admin(app)
    service.create.return_value = make_category()

    response = test_client.post(
        "/api/v1/admin/job-categories",
        json={"name": "Software", "description": "Software-related roles"},
    )

    assert response.status_code == 201
    assert response.json()["name"] == "Software"
    service.create.assert_awaited_once()


def test_create_category_rejects_blank_name(client, service):
    app, test_client = client
    set_admin(app)

    response = test_client.post(
        "/api/v1/admin/job-categories",
        json={"name": "   "},
    )

    assert response.status_code == 422
    service.create.assert_not_awaited()
