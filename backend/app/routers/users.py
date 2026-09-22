from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.user_service import get_user_by_id
from app.schemas.user import UserUpdate, UserPreferencesUpdate

from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.user import (
    UserUpdate,
    ChangePasswordRequest,
)

from app.services.user_service import (
    get_user_by_id,
    change_user_password,
)

router = APIRouter(
    prefix="/api/v1/users",
    tags=["Users"],
)


@router.get("/me")
def get_me(
    current_user=Depends(get_current_user),
):
    user = get_user_by_id(
        current_user["id"]
    )

    if not user:
        return {
            "success": False,
            "message": "User not found",
        }

    return {
        "success": True,
        "data": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
        },
    }


@router.put("/me")
def update_me(
    user_data: UserUpdate,
    current_user=Depends(get_current_user),
):
    user = get_user_by_id(
        current_user["id"]
    )

    if not user:
        return {
            "success": False,
            "message": "User not found",
        }

    if user_data.name is not None:
        user.name = user_data.name

    if user_data.email is not None:
        user.email = user_data.email

    return {
        "success": True,
        "message": "Profile updated successfully",
        "data": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
        },
    }


@router.put("/me/change-password")
def change_password(
    data: ChangePasswordRequest,
    current_user=Depends(get_current_user),
):
    try:
        result = change_user_password(
            current_user["id"],
            data.current_password,
            data.new_password,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if result is False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )

    return {
        "success": True,
        "message": "Password changed successfully",
    }

@router.put("/me/preferences")
def update_preferences(
    preferences: UserPreferencesUpdate,
    current_user=Depends(get_current_user),
):
    user = get_user_by_id(current_user["id"])

    if not user:
        return {
            "success": False,
            "message": "User not found",
        }

    # Temporary preferences storage
    if not hasattr(user, "preferences"):
        user.preferences = {}

    if preferences.theme is not None:
        user.preferences["theme"] = preferences.theme

    if preferences.language is not None:
        user.preferences["language"] = preferences.language

    if preferences.notifications_enabled is not None:
        user.preferences["notifications_enabled"] = (
            preferences.notifications_enabled
        )

    if preferences.email_notifications is not None:
        user.preferences["email_notifications"] = (
            preferences.email_notifications
        )

    return {
        "success": True,
        "message": "Preferences updated successfully",
        "data": user.preferences,
    }

@router.get("/me/account")
def get_account_status(
    current_user=Depends(get_current_user),
):
    user = get_user_by_id(current_user["id"])

    if not user:
        return {
            "success": False,
            "message": "User not found",
        }

    return {
        "success": True,
        "data": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "active": getattr(user, "is_active", True),
        },
    }

@router.delete("/me/account")
def deactivate_account(
    current_user=Depends(get_current_user),
):
    user = get_user_by_id(current_user["id"])

    if not user:
        return {
            "success": False,
            "message": "User not found",
        }

    user.is_active = False

    return {
        "success": True,
        "message": "Account deactivated successfully",
    }