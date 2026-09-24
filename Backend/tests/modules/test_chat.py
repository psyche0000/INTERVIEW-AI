# Import FastAPI test client support.
from fastapi.testclient import TestClient

# Import the FastAPI application.
from app.main import app


# Create a reusable test client.
client = TestClient(app)


# Test creating a conversation.
def test_create_conversation():
    # Send a new conversation request.
    response = client.post(
        "/api/chat/conversations",
        json={
            "title": "Test Conversation",
        },
    )

    # Verify successful creation.
    assert response.status_code == 201

    # Verify that an ID was generated.
    assert "id" in response.json()


# Test retrieving all conversations.
def test_get_conversations():
    # Request all conversations.
    response = client.get(
        "/api/chat/conversations",
    )

    # Verify successful response.
    assert response.status_code == 200

    # Verify that the response is a list.
    assert isinstance(response.json(), list)


# Test creating a message.
def test_create_message():
    # Create a conversation first.
    conversation_response = client.post(
        "/api/chat/conversations",
        json={
            "title": "Message Test",
        },
    )

    # Extract the conversation ID.
    conversation_id = conversation_response.json()["id"]

    # Create a message inside the conversation.
    response = client.post(
        f"/api/chat/conversations/{conversation_id}/messages",
        json={
            "content": "Hello AI",
            "role": "user",
        },
    )

    # Verify successful message creation.
    assert response.status_code == 201

    # Verify the message belongs to the conversation.
    assert response.json()["conversation_id"] == conversation_id


# Test retrieving conversation history.
def test_get_conversation_history():
    # Create a conversation.
    conversation_response = client.post(
        "/api/chat/conversations",
        json={
            "title": "History Test",
        },
    )

    # Extract the conversation ID.
    conversation_id = conversation_response.json()["id"]

    # Add a message to the conversation.
    client.post(
        f"/api/chat/conversations/{conversation_id}/messages",
        json={
            "content": "Test message",
            "role": "user",
        },
    )

    # Retrieve the conversation history.
    response = client.get(
        f"/api/chat/conversations/{conversation_id}",
    )

    # Verify successful response.
    assert response.status_code == 200

    # Verify that messages are included.
    assert "messages" in response.json()

    # Verify at least one message exists.
    assert len(response.json()["messages"]) >= 1


# Test deleting a conversation.
def test_delete_conversation():
    # Create a conversation.
    conversation_response = client.post(
        "/api/chat/conversations",
        json={
            "title": "Delete Test",
        },
    )

    # Extract the conversation ID.
    conversation_id = conversation_response.json()["id"]

    # Delete the conversation.
    response = client.delete(
        f"/api/chat/conversations/{conversation_id}",
    )

    # Verify successful deletion.
    assert response.status_code == 204

    # Verify that the conversation no longer exists.
    get_response = client.get(
        f"/api/chat/conversations/{conversation_id}",
    )

    # Verify that the API returns not found.
    assert get_response.status_code == 404
    