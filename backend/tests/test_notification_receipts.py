from datetime import datetime

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.dependencies import get_current_user, get_db
from app.db.base import Base
from app.models.notification import Notification
from app.models.notification_read import NotificationRead
from app.models.user import User
from app.api.routes.notifications import router


TABLES = [
    Base.metadata.tables[name]
    for name in ("users", "notifications", "notification_reads")
]


def make_test_environment():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine, tables=TABLES)
    session_factory = sessionmaker(
        bind=engine,
        autoflush=False,
        expire_on_commit=False,
    )

    with session_factory() as db:
        db.add_all([
            User(
                id=1,
                name="User 1",
                email="user1@example.com",
                password_hash="test-hash",
                role="user",
                is_active=True,
                is_verified=True,
            ),
            User(
                id=2,
                name="User 2",
                email="user2@example.com",
                password_hash="test-hash",
                role="user",
                is_active=True,
                is_verified=True,
            ),
            Notification(
                id=10,
                user_id=None,
                title="Global announcement",
                message="Announcement for everyone",
                notification_type="general",
                is_read=False,
                created_at=datetime(2026, 1, 1),
            ),
            Notification(
                id=11,
                user_id=1,
                title="Personal notification",
                message="Private message",
                notification_type="general",
                is_read=False,
                created_at=datetime(2026, 1, 2),
            ),
        ])
        db.commit()

    return engine, session_factory


def make_client(session_factory, user_id):
    test_app = FastAPI()
    test_app.include_router(router)
    test_app.dependency_overrides[get_current_user] = lambda: {
        "id": user_id,
        "email": f"user{user_id}@example.com",
        "role": "user",
    }

    def override_db():
        with session_factory() as db:
            yield db

    test_app.dependency_overrides[get_db] = override_db
    return TestClient(test_app)


def test_global_read_receipt_is_per_user():
    engine, sessions = make_test_environment()
    client_one = make_client(sessions, 1)
    client_two = make_client(sessions, 2)

    try:
        response_one = client_one.patch("/api/v1/notifications/10/read")
        assert response_one.status_code == 200
        assert response_one.json()["is_read"] is True

        response_two = client_two.get("/api/v1/notifications")
        assert response_two.status_code == 200
        global_notification = next(
            item for item in response_two.json() if item["id"] == 10
        )
        assert global_notification["is_read"] is False

        with sessions() as db:
            receipts = db.query(NotificationRead).filter_by(
                notification_id=10
            ).all()
            assert len(receipts) == 1
            assert receipts[0].user_id == 1
    finally:
        client_one.close()
        client_two.close()
        Base.metadata.drop_all(engine, tables=TABLES)
        engine.dispose()


def test_mark_global_notification_read_creates_receipt():
    engine, sessions = make_test_environment()
    client = make_client(sessions, 1)

    try:
        response = client.patch("/api/v1/notifications/10/read")
        assert response.status_code == 200

        with sessions() as db:
            receipt = db.query(NotificationRead).filter_by(
                notification_id=10,
                user_id=1,
            ).first()
            assert receipt is not None
    finally:
        client.close()
        Base.metadata.drop_all(engine, tables=TABLES)
        engine.dispose()


def test_unread_count_includes_personal_and_unread_global():
    engine, sessions = make_test_environment()
    client = make_client(sessions, 1)

    try:
        response = client.get("/api/v1/notifications/unread-count")
        assert response.status_code == 200
        assert response.json()["unread_count"] == 2

        response = client.patch("/api/v1/notifications/10/read")
        assert response.status_code == 200

        response = client.get("/api/v1/notifications/unread-count")
        assert response.status_code == 200
        assert response.json()["unread_count"] == 1
    finally:
        client.close()
        Base.metadata.drop_all(engine, tables=TABLES)
        engine.dispose()


def test_read_all_creates_global_receipts_and_marks_personal_read():
    engine, sessions = make_test_environment()
    client = make_client(sessions, 1)

    try:
        response = client.patch("/api/v1/notifications/read-all")
        assert response.status_code == 204

        with sessions() as db:
            personal = db.get(Notification, 11)
            receipt = db.query(NotificationRead).filter_by(
                notification_id=10,
                user_id=1,
            ).first()
            assert personal is not None
            assert personal.is_read is True
            assert receipt is not None
    finally:
        client.close()
        Base.metadata.drop_all(engine, tables=TABLES)
        engine.dispose()
