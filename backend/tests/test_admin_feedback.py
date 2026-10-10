from datetime import datetime

from fastapi.testclient import TestClient

from app.core.dependencies import get_current_user, get_db
from app.main import app
from app.models.feedback import Feedback


client = TestClient(app)


def override_user(role: str) -> dict:
    return {
        "id": 1,
        "email": f"{role}@example.com",
        "role": role,
    }


class FakeDB:
    """A small database substitute for feedback route tests."""

    def __init__(self, feedback=None):
        self.feedback = feedback or []
        self.deleted = []
        self.committed = False

    def scalars(self, statement):
        class Result:
            def __init__(self, items):
                self.items = items

            def all(self):
                return self.items

        return Result(self.feedback)

    def get(self, model, feedback_id):
        return next(
            (
                item
                for item in self.feedback
                if item.id == feedback_id
            ),
            None,
        )

    def delete(self, feedback):
        self.deleted.append(feedback)

    def commit(self):
        self.committed = True


def test_feedback_rejects_unauthenticated_request():
    response = client.get("/api/v1/admin/feedback")
    assert response.status_code == 401


def test_feedback_rejects_non_admin_user():
    app.dependency_overrides[get_current_user] = (
        lambda: override_user("user")
    )

    try:
        response = client.get("/api/v1/admin/feedback")
        assert response.status_code == 403
        assert response.json()["detail"] == "Admin access required"
    finally:
        app.dependency_overrides.clear()


def test_admin_can_list_feedback():
    feedback = Feedback(
        id=1,
        content="Improve interview feedback",
        created_at=datetime(2026, 1, 1),
    )
    fake_db = FakeDB([feedback])

    app.dependency_overrides[get_current_user] = (
        lambda: override_user("admin")
    )
    app.dependency_overrides[get_db] = lambda: fake_db

    try:
        response = client.get("/api/v1/admin/feedback")

        assert response.status_code == 200
        assert response.json()[0]["id"] == 1
        assert response.json()[0]["content"] == (
            "Improve interview feedback"
        )
    finally:
        app.dependency_overrides.clear()


def test_admin_can_view_feedback_history():
    fake_db = FakeDB([])

    app.dependency_overrides[get_current_user] = (
        lambda: override_user("admin")
    )
    app.dependency_overrides[get_db] = lambda: fake_db

    try:
        response = client.get("/api/v1/admin/feedback/history")
        assert response.status_code == 200
        assert response.json() == []
    finally:
        app.dependency_overrides.clear()


def test_admin_can_delete_feedback():
    feedback = Feedback(
        id=1,
        content="Example feedback",
        created_at=datetime(2026, 1, 1),
    )
    fake_db = FakeDB([feedback])

    app.dependency_overrides[get_current_user] = (
        lambda: override_user("admin")
    )
    app.dependency_overrides[get_db] = lambda: fake_db

    try:
        response = client.delete("/api/v1/admin/feedback/1")

        assert response.status_code == 204
        assert fake_db.deleted == [feedback]
        assert fake_db.committed is True
    finally:
        app.dependency_overrides.clear()


def test_deleting_missing_feedback_returns_404():
    fake_db = FakeDB([])

    app.dependency_overrides[get_current_user] = (
        lambda: override_user("admin")
    )
    app.dependency_overrides[get_db] = lambda: fake_db

    try:
        response = client.delete("/api/v1/admin/feedback/999")

        assert response.status_code == 404
        assert response.json()["detail"] == "Feedback not found"
    finally:
        app.dependency_overrides.clear()
