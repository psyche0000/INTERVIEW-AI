"""User profile and administration API routes."""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db, require_admin
from app.schemas.user import (
    AdminUserUpdate,
    PasswordChangeRequest,
    UserProfileResponse,
    UserProfileUpdate,
)
from app.services.user_service import (
    DuplicateEmailError,
    InvalidPasswordError,
    InvalidUserUpdateError,
    UserNotFoundError,
    UserService,
)


router = APIRouter(prefix="/api/v1/users", tags=["Users"])
admin_router = APIRouter(
    prefix="/api/v1/admin/users",
    tags=["Admin Users"],
    dependencies=[Depends(require_admin)],
)


@router.get("/me", response_model=UserProfileResponse)
def get_my_profile(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        return UserService(db).get_user(current_user["id"])
    except UserNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch("/me", response_model=UserProfileResponse)
def update_my_profile(
    payload: UserProfileUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        return UserService(db).update_profile(
            current_user["id"],
            name=payload.name,
            email=str(payload.email) if payload.email is not None else None,
        )
    except UserNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except DuplicateEmailError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@router.patch("/me/password", status_code=status.HTTP_204_NO_CONTENT)
def change_my_password(
    payload: PasswordChangeRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        UserService(db).change_password(
            current_user["id"],
            payload.current_password,
            payload.new_password,
        )
    except UserNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except InvalidPasswordError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except InvalidUserUpdateError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@admin_router.get("", response_model=list[UserProfileResponse])
def list_users(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    search: str | None = Query(default=None, min_length=1, max_length=255),
    role: str | None = Query(default=None, pattern="^(user|admin)$"),
    is_active: bool | None = Query(default=None),
    is_verified: bool | None = Query(default=None),
    db: Session = Depends(get_db),
):
    return UserService(db).list_users(
        skip=skip,
        limit=limit,
        search=search,
        role=role,
        is_active=is_active,
        is_verified=is_verified,
    )


@admin_router.get("/{user_id}", response_model=UserProfileResponse)
def get_user_details(
    user_id: int,
    db: Session = Depends(get_db),
):
    try:
        return UserService(db).get_user(user_id)
    except UserNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@admin_router.patch("/{user_id}", response_model=UserProfileResponse)
def update_user(
    user_id: int,
    payload: AdminUserUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user_id == current_user["id"] and (
        payload.is_active is False or payload.role == "user"
    ):
        raise HTTPException(
            status_code=400,
            detail="Administrators cannot deactivate or demote themselves",
        )

    try:
        return UserService(db).update_user_as_admin(
            user_id,
            role=payload.role,
            is_active=payload.is_active,
            is_verified=payload.is_verified,
        )
    except UserNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except DuplicateEmailError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    except InvalidUserUpdateError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc



@admin_router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        UserService(db).delete_user_as_admin(
            user_id=user_id,
            current_admin_id=current_user["id"],
        )
    except UserNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except InvalidUserUpdateError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
