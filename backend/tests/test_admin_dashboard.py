from fastapi.testclient import TestClient

from app.core.dependencies import get_current_user, get_db
from app.main import app


client = TestClient(app)


def override_user(role: str) -> dict:
    return {
        "id": 1,
        "email": f"{role}@example.com",
        "role": role,
    }


def test_dashboard_rejects_unauthenticated_request():
    response = client.get("/api/v1/admin/dashboard/stats")

    assert response.status_code == 401


def test_dashboard_rejects_non_admin_user():
    app.dependency_overrides[get_current_user] = (
        lambda: override_user("user")
    )

    try:
        response = client.get("/api/v1/admin/dashboard/stats")

        assert response.status_code == 403
        assert response.json()["detail"] == "Admin access required"
    finally:
        app.dependency_overrides.clear()


def test_dashboard_returns_statistics_for_admin():
    class FakeDB:
        def __init__(self):
            self.counts = iter([10, 7, 20, 15])

        def scalar(self, statement):
            return next(self.counts)

    fake_db = FakeDB()

    app.dependency_overrides[get_current_user] = (
        lambda: override_user("admin")
    )
    app.dependency_overrides[get_db] = lambda: fake_db

    try:
        response = client.get("/api/v1/admin/dashboard/stats")

        assert response.status_code == 200
        assert response.json() == {
            "total_jobs": 10,
            "active_jobs": 7,
            "total_resumes": 20,
            "active_resumes": 15,
        }
    finally:
        app.dependency_overrides.clear()