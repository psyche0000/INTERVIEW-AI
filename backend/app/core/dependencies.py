
"""
Application dependencies.

Provides authentication, authorization, and database-backed services.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.security import ALGORITHM, SECRET_KEY, is_token_revoked
from app.db.session import get_db
from app.models.user import User
from app.repositories.sqlalchemy_resume_repository import (
    SQLAlchemyResumeRepository,
)
from app.services.resume_service import ResumeService


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> dict:
    """Validate an access token against the current database user."""

    token = credentials.credentials

    if is_token_revoked(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has been revoked",
        )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if not user_id or payload.get("type") != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
            )

        user = db.get(User, int(user_id))

        if user is None or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User account is unavailable",
            )

        return {
            "id": user.id,
            "email": user.email,
            "role": user.role,
        }

    except (JWTError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )


def require_admin(
    current_user: dict = Depends(get_current_user),
) -> dict:
    """Allow access only to authenticated administrators."""

    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    return current_user


def get_resume_service(
    db: Session = Depends(get_db),
) -> ResumeService:
    """Create a ResumeService backed by the current database session."""

    repository = SQLAlchemyResumeRepository(db)
    return ResumeService(repository)
