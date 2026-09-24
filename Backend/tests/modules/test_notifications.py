# Import FastAPI test client support.
from fastapi.testclient import TestClient

# Import the FastAPI application.
from app.main import app


# Create a reusable test client.
client = TestClient(app)


# Test creating a notification.
def test_create_notification():
    # Send a new notification request.
    response = client.post(
        "/api/notifications/",
        json={
            "title": "Test Notification",
            "message": "This is a test notification.",
        },
    )

    # Verify successful creation.
    assert response.status_code == 201

    # Verify that an ID was generated.
    assert "id" in response.json()


# Test retrieving all notifications.
def test_get_notifications():
    # Request all notifications.
    response = client.get(
        "/api/notifications/",
    )

    # Verify successful response.
    assert response.status_code == 200

    # Verify that the response is a list.
    assert isinstance(response.json(), list)


# Test retrieving a notification by ID.
def test_get_notification_by_id():
    # Create a notification first.
    create_response = client.post(
        "/api/notifications/",
        json={
            "title": "ID Test",
            "message": "Notification ID test.",
        },
    )

    # Extract the notification ID.
    notification_id = create_response.json()["id"]

    # Retrieve the notification.
    response = client.get(
        f"/api/notifications/{notification_id}",
    )

    # Verify successful response.
    assert response.status_code == 200

    # Verify the correct notification ID.
    assert response.json()["id"] == notification_id


# Test unread notification count.
def test_notification_count():
    # Request the unread notification count.
    response = client.get(
        "/api/notifications/count",
    )

    # Verify successful response.
    assert response.status_code == 200

    # Verify the count field exists.
    assert "unread_count" in response.json()


# Test marking a notification as read.
def test_update_notification():
    # Create a notification.
    create_response = client.post(
        "/api/notifications/",
        json={
            "title": "Read Test",
            "message": "Notification read test.",
        },
    )

    # Extract the notification ID.
    notification_id = create_response.json()["id"]

    # Mark the notification as read.
    response = client.patch(
        f"/api/notifications/{notification_id}",
        json={
            "is_read": True,
        },
    )

    # Verify successful update.
    assert response.status_code == 200

    # Verify the notification is marked as read.
    assert response.json()["is_read"] is True


# Test deleting a notification.
def test_delete_notification():
    # Create a notification.
    create_response = client.post(
        "/api/notifications/",
        json={
            "title": "Delete Test",
            "message": "Notification delete test.",
        },
    )

    # Extract the notification ID.
    notification_id = create_response.json()["id"]

    # Delete the notification.
    response = client.delete(
        f"/api/notifications/{notification_id}",
    )

    # Verify successful deletion.
    assert response.status_code == 204

    # Verify that the notification no longer exists.
    get_response = client.get(
        f"/api/notifications/{notification_id}",
    )

    # Verify that the API returns not found.
    assert get_response.status_code == 404
    