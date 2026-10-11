from datetime import datetime

from fastapi.testclient import TestClient

from app.core.dependencies import get_current_user, get_db
from app.main import app
from app.models.notification import Notification
from app.models.notification_read import NotificationRead
from app.models.user import User


client = TestClient(app)


def override_user(role: str, user_id: int = 1) -> dict:
    return {
        "id": user_id,
        "email": f"{role}{user_id}@example.com",
        "role": role,
    }


class FakeDB:
    """Minimal database substitute for notification route tests."""

    def __init__(self, notifications=None, users=None, receipts=None):
        self.notifications = notifications or []
        self.users = users or {}
        self.receipts = receipts or []
        self.added = []
        self.deleted = []
        self.committed = False

    def get(self, model, item_id):
        if model is User:
            return self.users.get(item_id)
        if model is Notification:
            return next(
                (item for item in self.notifications if item.id == item_id),
                None,
            )
        return None

    def add(self, item):
        self.added.append(item)
        if isinstance(item, Notification):
            item.id = len(self.added)
            if item.is_read is None:
                item.is_read = False
            if item.created_at is None:
                item.created_at = datetime(2026, 1, 1)
        elif isinstance(item, NotificationRead):
            item.id = len(self.receipts) + 1
            self.receipts.append(item)

    def commit(self):
        self.committed = True

    def refresh(self, item):
        return None

    def delete(self, item):
        self.deleted.append(item)
        if item in self.notifications:
            self.notifications.remove(item)

def test_notification_list_rejects_unauthenticated_request():
    response = client.get("/api/v1/notifications")
    assert response.status_code == 401


def test_admin_notification_creation_rejects_non_admin():
    app.dependency_overrides[get_current_user] = (
        lambda: override_user("user")
    )

    try:
        response = client.post(
            "/api/v1/admin/notifications",
            json={
                "title": "Maintenance",
                "message": "Scheduled maintenance",
            },
        )
        assert response.status_code == 403
        assert response.json()["detail"] == "Admin access required"
    finally:
        app.dependency_overrides.clear()


def test_admin_can_create_global_notification():
    fake_db = FakeDB()
    app.dependency_overrides[get_current_user] = (
        lambda: override_user("admin")
    )
    app.dependency_overrides[get_db] = lambda: fake_db

    try:
        response = client.post(
            "/api/v1/admin/notifications",
            json={
                "title": "Maintenance",
                "message": "Scheduled maintenance",
            },
        )

        assert response.status_code == 201
        assert response.json()["title"] == "Maintenance"
        assert response.json()["user_id"] is None
        assert fake_db.committed is True
        assert len(fake_db.added) == 1
    finally:
        app.dependency_overrides.clear()


def test_admin_cannot_create_notification_for_missing_user():
    fake_db = FakeDB(users={})
    app.dependency_overrides[get_current_user] = (
        lambda: override_user("admin")
    )
    app.dependency_overrides[get_db] = lambda: fake_db

    try:
        response = client.post(
            "/api/v1/admin/notifications",
            json={
                "user_id": 999,
                "title": "Hello",
                "message": "Test notification",
            },
        )

        assert response.status_code == 404
        assert response.json()["detail"] == "Recipient user not found"
        assert fake_db.added == []
    finally:
        app.dependency_overrides.clear()
