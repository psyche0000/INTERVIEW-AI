# Import FastAPI routing and dependency utilities.
from fastapi import APIRouter, Depends, HTTPException, status

# Import SQLAlchemy session support.
from sqlalchemy.orm import Session

# Import the database session dependency.
from app.db.session import get_db

# Import notification schemas.
from app.schemas.notification import (
    NotificationCreate,
    NotificationResponse,
    NotificationUpdate,
)

# Import notification service operations.
from app.services.notification_service import (
    create_notification,
    delete_notification,
    get_notification_by_id,
    get_notifications,
    get_unread_notification_count,
    update_notification,
)


# Create the Notification API router.
router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


# Create a new notification.
@router.post(
    "/",
    response_model=NotificationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_notification_endpoint(
    notification_data: NotificationCreate,
    db: Session = Depends(get_db),
) -> NotificationResponse:
    # Store the submitted notification.
    return create_notification(
        db=db,
        notification_data=notification_data,
    )


# Get all notifications.
@router.get(
    "/",
    response_model=list[NotificationResponse],
)
def get_notifications_endpoint(
    db: Session = Depends(get_db),
) -> list[NotificationResponse]:
    # Retrieve all notifications.
    return get_notifications(db=db)


# Get unread notification count.
@router.get(
    "/count",
)
def get_notification_count_endpoint(
    db: Session = Depends(get_db),
) -> dict[str, int]:
    # Retrieve the number of unread notifications.
    count = get_unread_notification_count(db=db)

    # Return the unread notification count.
    return {"unread_count": count}


# Get notification by ID.
@router.get(
    "/{notification_id}",
    response_model=NotificationResponse,
)
def get_notification_endpoint(
    notification_id: int,
    db: Session = Depends(get_db),
) -> NotificationResponse:
    # Retrieve the requested notification.
    notification = get_notification_by_id(
        db=db,
        notification_id=notification_id,
    )

    # Return 404 when notification does not exist.
    if notification is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found.",
        )

    # Return the notification.
    return notification


# Update notification read status.
@router.patch(
    "/{notification_id}",
    response_model=NotificationResponse,
)
def update_notification_endpoint(
    notification_id: int,
    notification_data: NotificationUpdate,
    db: Session = Depends(get_db),
) -> NotificationResponse:
    # Update the notification status.
    notification = update_notification(
        db=db,
        notification_id=notification_id,
        notification_data=notification_data,
    )

    # Return 404 when notification does not exist.
    if notification is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found.",
        )

    # Return the updated notification.
    return notification


# Delete notification by ID.
@router.delete(
    "/{notification_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_notification_endpoint(
    notification_id: int,
    db: Session = Depends(get_db),
) -> None:
    # Delete the requested notification.
    deleted = delete_notification(
        db=db,
        notification_id=notification_id,
    )

    # Return 404 when notification does not exist.
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found.",
        )