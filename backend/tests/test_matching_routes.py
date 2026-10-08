from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_match_resume_to_job_endpoint():
    response = client.post(
        "/api/v1/matching",
        json={
            "resume_id": str(uuid4()),
            "job_id": str(uuid4()),
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "resume_id" in data
    assert "job_id" in data
    assert data["match_score"] is None
    assert data["skill_gap"]["matched_skills"] == []
    assert data["skill_gap"]["missing_skills"] == []
    assert data["recommendations"]["recommendations"] == []


def test_skill_gap_endpoint():
    resume_id = uuid4()
    job_id = uuid4()

    response = client.get(
        f"/api/v1/matching/skill-gap/{resume_id}/{job_id}"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["matched_skills"] == []
    assert data["missing_skills"] == []


def test_recommendations_endpoint():
    resume_id = uuid4()
    job_id = uuid4()

    response = client.get(
        f"/api/v1/matching/recommendations/{resume_id}/{job_id}"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["recommendations"] == []


def test_match_endpoint_rejects_invalid_uuid():
    response = client.post(
        "/api/v1/matching",
        json={
            "resume_id": "not-a-uuid",
            "job_id": str(uuid4()),
        },
    )

    assert response.status_code == 422
