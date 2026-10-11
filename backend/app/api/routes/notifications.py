"""Notification API routes."""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_, select, update
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db, require_admin
from app.models.notification import Notification
from app.models.notification_read import NotificationRead
from app.models.user import User
from app.schemas.notification import NotificationCreate, NotificationResponse


router = APIRouter(
    prefix="/api/v1/notifications",
    tags=["Notifications"],
)

admin_router = APIRouter(
    prefix="/api/v1/admin/notifications",
    tags=["Admin Notifications"],
    dependencies=[Depends(require_admin)],
)


def _serialize_notification(
    notification: Notification,
    user_id: int,
    db: Session,
) -> dict:
    """Serialize a notification with the requesting user's read state."""

    if notification.user_id is not None:
        is_read = notification.is_read
    else:
        receipt = db.scalar(
            select(NotificationRead.id).where(
                NotificationRead.notification_id == notification.id,
                NotificationRead.user_id == user_id,
            )
        )
        is_read = receipt is not None

    return {
        "id": notification.id,
        "user_id": notification.user_id,
        "title": notification.title,
        "message": notification.message,
        "notification_type": notification.notification_type,
        "is_read": is_read,
        "created_at": notification.created_at,
    }


@router.get("", response_model=list[NotificationResponse])
def list_my_notifications(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List personal notifications and global announcements."""

    statement = (
        select(Notification)
        .where(
            or_(
                Notification.user_id == current_user["id"],
                Notification.user_id.is_(None),
            )
        )
        .order_by(Notification.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    notifications = db.scalars(statement).all()
    return [
        _serialize_notification(item, current_user["id"], db)
        for item in notifications
    ]


@router.get("/unread-count")
def get_unread_count(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Count unread personal notifications and global announcements."""

    user_id = current_user["id"]

    personal_count = db.scalar(
        select(func.count(Notification.id)).where(
            Notification.user_id == user_id,
            Notification.is_read.is_(False),
        )
    ) or 0

    global_count = db.scalar(
        select(func.count(Notification.id))
        .select_from(Notification)
        .outerjoin(
            NotificationRead,
            (NotificationRead.notification_id == Notification.id)
            & (NotificationRead.user_id == user_id),
        )
        .where(
            Notification.user_id.is_(None),
            NotificationRead.id.is_(None),
        )
    ) or 0

    return {"unread_count": personal_count + global_count}


@router.patch("/read-all", status_code=status.HTTP_204_NO_CONTENT)
def mark_all_notifications_read(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Mark personal notifications and global announcements as read."""

    user_id = current_user["id"]

    db.execute(
        update(Notification)
        .where(
            Notification.user_id == user_id,
            Notification.is_read.is_(False),
        )
        .values(is_read=True)
    )

    global_ids = db.scalars(
        select(Notification.id).where(Notification.user_id.is_(None))
    ).all()

    existing_ids = set(
        db.scalars(
            select(NotificationRead.notification_id).where(
                NotificationRead.user_id == user_id,
                NotificationRead.notification_id.in_(global_ids),
            )
        ).all()
    ) if global_ids else set()

    for notification_id in global_ids:
        if notification_id not in existing_ids:
            db.add(
                NotificationRead(
                    notification_id=notification_id,
                    user_id=user_id,
                )
            )

    db.commit()


@router.patch("/{notification_id}/read", response_model=NotificationResponse)
def mark_notification_read(
    notification_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Mark a personal notification or global announcement as read."""

    notification = db.scalar(
        select(Notification).where(
            Notification.id == notification_id,
            or_(
                Notification.user_id == current_user["id"],
                Notification.user_id.is_(None),
            ),
        )
    )

    if notification is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found",
        )

    if notification.user_id is None:
        receipt = db.scalar(
            select(NotificationRead).where(
                NotificationRead.notification_id == notification.id,
                NotificationRead.user_id == current_user["id"],
            )
        )
        if receipt is None:
            db.add(
                NotificationRead(
                    notification_id=notification.id,
                    user_id=current_user["id"],
                )
            )
    else:
        notification.is_read = True

    db.commit()
    db.refresh(notification)

    return _serialize_notification(notification, current_user["id"], db)


@router.delete("/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_my_notification(
    notification_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete a personal notification, never a global announcement."""

    notification = db.scalar(
        select(Notification).where(
            Notification.id == notification_id,
            Notification.user_id == current_user["id"],
        )
    )
    if notification is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Personal notification not found",
        )

    db.delete(notification)
    db.commit()


@admin_router.post(
    "",
    response_model=NotificationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_notification(
    payload: NotificationCreate,
    db: Session = Depends(get_db),
):
    """Create a personal notification or global announcement."""

    if payload.user_id is not None and db.get(User, payload.user_id) is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipient user not found",
        )

    notification = Notification(
        user_id=payload.user_id,
        title=payload.title,
        message=payload.message,
        notification_type=payload.notification_type,
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification


@admin_router.get("", response_model=list[NotificationResponse])
def list_all_notifications(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """List all notifications, newest first."""

    statement = (
        select(Notification)
        .order_by(Notification.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return db.scalars(statement).all()
