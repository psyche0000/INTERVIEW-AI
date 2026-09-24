# Import SQLAlchemy session support.
from sqlalchemy.orm import Session

# Import the Notification database model.
from app.models.notification import Notification

# Import notification schemas.
from app.schemas.notification import (
    NotificationCreate,
    NotificationUpdate,
)


# Create and store a new notification.
def create_notification(
    db: Session,
    notification_data: NotificationCreate,
) -> Notification:
    # Create a notification database object.
    notification = Notification(
        title=notification_data.title,
        message=notification_data.message,
    )

    # Add the notification to the database session.
    db.add(notification)

    # Save the notification to PostgreSQL.
    db.commit()

    # Refresh the object with database-generated values.
    db.refresh(notification)

    # Return the created notification.
    return notification


# Retrieve all notifications.
def get_notifications(
    db: Session,
) -> list[Notification]:
    # Return newest notifications first.
    return (
        db.query(Notification)
        .order_by(Notification.created_at.desc())
        .all()
    )


# Retrieve one notification by ID.
def get_notification_by_id(
    db: Session,
    notification_id: int,
) -> Notification | None:
    # Find the requested notification.
    return (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )


# Mark a notification as read or unread.
def update_notification(
    db: Session,
    notification_id: int,
    notification_data: NotificationUpdate,
) -> Notification | None:
    # Find the requested notification.
    notification = get_notification_by_id(
        db=db,
        notification_id=notification_id,
    )

    # Return None when the notification does not exist.
    if notification is None:
        return None

    # Update the notification read status.
    notification.is_read = notification_data.is_read

    # Save the updated notification.
    db.commit()

    # Refresh the object with the latest database values.
    db.refresh(notification)

    # Return the updated notification.
    return notification


# Delete a notification by ID.
def delete_notification(
    db: Session,
    notification_id: int,
) -> bool:
    # Find the requested notification.
    notification = get_notification_by_id(
        db=db,
        notification_id=notification_id,
    )

    # Return False when the notification does not exist.
    if notification is None:
        return False

    # Delete the notification.
    db.delete(notification)

    # Save the deletion.
    db.commit()

    # Confirm successful deletion.
    return True


# Count unread notifications.
def get_unread_notification_count(
    db: Session,
) -> int:
    # Count notifications that have not been read.
    return (
        db.query(Notification)
        .filter(Notification.is_read.is_(False))
        .count()
    )