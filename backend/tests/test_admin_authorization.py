from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient

from app.core.dependencies import get_current_user, require_admin


app = FastAPI()


@app.get("/admin-test")
def admin_test(current_user: dict = Depends(require_admin)):
    return {"message": "Admin access granted"}


client = TestClient(app)


def test_admin_endpoint_rejects_unauthenticated_request():
    response = client.get("/admin-test")

    assert response.status_code == 401


def test_admin_endpoint_rejects_non_admin_user():
    app.dependency_overrides[get_current_user] = lambda: {
        "id": 2,
        "email": "user@example.com",
        "role": "user",
    }

    try:
        response = client.get("/admin-test")
        assert response.status_code == 403
        assert response.json()["detail"] == "Admin access required"
    finally:
        app.dependency_overrides.clear()


def test_admin_endpoint_accepts_admin_user():
    app.dependency_overrides[get_current_user] = lambda: {
        "id": 1,
        "email": "admin@example.com",
        "role": "admin",
    }

    try:
        response = client.get("/admin-test")
        assert response.status_code == 200
        assert response.json()["message"] == "Admin access granted"
    finally:
        app.dependency_overrides.clear()
