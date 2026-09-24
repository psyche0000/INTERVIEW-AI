# Import FastAPI test client support.
from fastapi.testclient import TestClient

# Import the FastAPI application.
from app.main import app


# Create a reusable test client.
client = TestClient(app)


# Test creating feedback.
def test_create_feedback():
    # Send a new feedback request.
    response = client.post(
        "/api/feedback/",
        json={
            "content": "Test feedback",
        },
    )

    # Verify that feedback was created successfully.
    assert response.status_code == 201

    # Verify that the response contains an ID.
    assert "id" in response.json()


# Test retrieving feedback history.
def test_get_feedback_history():
    # Request all feedback records.
    response = client.get("/api/feedback/")

    # Verify successful response.
    assert response.status_code == 200

    # Verify that the response is a list.
    assert isinstance(response.json(), list)


# Test retrieving feedback by ID.
def test_get_feedback_by_id():
    # Create feedback for this test.
    create_response = client.post(
        "/api/feedback/",
        json={
            "content": "Feedback for ID test",
        },
    )

    # Extract the generated feedback ID.
    feedback_id = create_response.json()["id"]

    # Retrieve the feedback by ID.
    response = client.get(
        f"/api/feedback/{feedback_id}",
    )

    # Verify successful response.
    assert response.status_code == 200

    # Verify the correct feedback ID.
    assert response.json()["id"] == feedback_id


# Test updating feedback.
def test_update_feedback():
    # Create feedback for this test.
    create_response = client.post(
        "/api/feedback/",
        json={
            "content": "Original feedback",
        },
    )

    # Extract the generated feedback ID.
    feedback_id = create_response.json()["id"]

    # Update the feedback content.
    response = client.put(
        f"/api/feedback/{feedback_id}",
        json={
            "content": "Updated feedback",
        },
    )

    # Verify successful update.
    assert response.status_code == 200

    # Verify the updated content.
    assert response.json()["content"] == "Updated feedback"


# Test deleting feedback.
def test_delete_feedback():
    # Create feedback for this test.
    create_response = client.post(
        "/api/feedback/",
        json={
            "content": "Feedback to delete",
        },
    )

    # Extract the generated feedback ID.
    feedback_id = create_response.json()["id"]

    # Delete the feedback.
    response = client.delete(
        f"/api/feedback/{feedback_id}",
    )

    # Verify successful deletion.
    assert response.status_code == 204

    # Verify that the feedback no longer exists.
    get_response = client.get(
        f"/api/feedback/{feedback_id}",
    )

    # Verify that the API returns not found.
    assert get_response.status_code == 404
    