from datetime import datetime, timezone
from unittest.mock import MagicMock, patch

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.routes.users import admin_router, router
from app.core.dependencies import get_current_user, get_db
from app.models.user import User
from app.services.user_service import (
    InvalidUserUpdateError,
    UserService,
)


def make_user(user_id=1, role="user"):
    return User(
        id=user_id,
        name="Test User",
        email=f"user{user_id}@example.com",
        password_hash="hashed-password",
        role=role,
        is_active=True,
        is_verified=False,
    )


@pytest.fixture
def fake_db():
    return MagicMock()


@pytest.fixture
def client(fake_db):
    test_app = FastAPI()
    test_app.include_router(router)
    test_app.include_router(admin_router)

    test_app.dependency_overrides[get_current_user] = lambda: {
        "id": 1,
        "email": "user1@example.com",
        "role": "user",
    }
    test_app.dependency_overrides[get_db] = lambda: fake_db

    yield TestClient(test_app)
    test_app.dependency_overrides.clear()


def test_profile_requires_authentication(fake_db):
    test_app = FastAPI()
    test_app.include_router(router)
    test_app.dependency_overrides[get_db] = lambda: fake_db

    response = TestClient(test_app).get("/api/v1/users/me")

    assert response.status_code == 401
    test_app.dependency_overrides.clear()


def test_get_profile(client, fake_db):
    fake_db.get.return_value = make_user()

    with patch("app.services.user_service.SQLAlchemyUserRepository") as repo:
        repo.return_value.get_by_id.return_value = make_user()
        response = client.get("/api/v1/users/me")

    assert response.status_code == 200
    assert response.json()["email"] == "user1@example.com"
    assert "password_hash" not in response.json()


def test_update_profile(client):
    with patch("app.services.user_service.SQLAlchemyUserRepository") as repo:
        repo.return_value.get_by_id.return_value = make_user()
        repo.return_value.get_by_email.return_value = None
        repo.return_value.save.side_effect = lambda user: user

        response = client.patch(
            "/api/v1/users/me",
            json={"name": "Updated User"},
        )

    assert response.status_code == 200
    assert response.json()["name"] == "Updated User"


def test_change_password_rejects_wrong_current_password(client):
    with patch("app.services.user_service.SQLAlchemyUserRepository") as repo, \
         patch("app.services.user_service.verify_password", return_value=False):
        repo.return_value.get_by_id.return_value = make_user()

        response = client.patch(
            "/api/v1/users/me/password",
            json={
                "current_password": "wrong-password",
                "new_password": "new-secure-password",
            },
        )

    assert response.status_code == 400
    assert response.json()["detail"] == "Current password is incorrect"


def test_admin_user_list_rejects_non_admin(client):
    response = client.get("/api/v1/admin/users")
    assert response.status_code == 403


def test_admin_can_list_users(client):
    client.app.dependency_overrides[get_current_user] = lambda: {
        "id": 99,
        "email": "admin@example.com",
        "role": "admin",
    }

    with patch("app.services.user_service.SQLAlchemyUserRepository") as repo:
        repo.return_value.list_users.return_value = [make_user()]
        response = client.get("/api/v1/admin/users")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert "password_hash" not in response.json()[0]


def test_admin_user_list_validates_limit(client):
    client.app.dependency_overrides[get_current_user] = lambda: {
        "id": 99,
        "email": "admin@example.com",
        "role": "admin",
    }

    response = client.get("/api/v1/admin/users?limit=101")
    assert response.status_code == 422



def test_cannot_demote_last_active_admin():
    admin = make_user(user_id=99, role="admin")
    repository = MagicMock()
    repository.get_by_id.return_value = admin
    repository.count_active_admins.return_value = 1

    service = UserService(MagicMock())
    service.repository = repository

    with pytest.raises(
        InvalidUserUpdateError,
        match="last active administrator",
    ):
        service.update_user_as_admin(99, role="user")

    repository.save.assert_not_called()


def test_can_demote_admin_when_another_active_admin_exists():
    admin = make_user(user_id=99, role="admin")
    repository = MagicMock()
    repository.get_by_id.return_value = admin
    repository.count_active_admins.return_value = 2
    repository.save.side_effect = lambda user: user

    service = UserService(MagicMock())
    service.repository = repository

    updated_user = service.update_user_as_admin(99, role="user")

    assert updated_user.role == "user"
    repository.save.assert_called_once_with(admin)
