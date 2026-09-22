from fastapi import APIRouter, HTTPException, status

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.security import (
    create_access_token,
    create_reset_token,
    verify_refresh_token,
    verify_reset_token,
    hash_password,
    create_email_verification_token,
    verify_email_verification_token,
    revoke_token
)

from app.schemas.auth import (
    LoginRequest,
    RefreshTokenRequest,
    TokenResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    VerifyEmailRequest
)

from app.schemas.user import (
    UserCreate,
    UserResponse,
)

from app.services.user_service import (
    create_user,
    login_user,
)


router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"],
)


# ─────────────────────────────────────────────
# REGISTER
# ─────────────────────────────────────────────

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(user_data: UserCreate):

    user = create_user(user_data)

    # Temporary ID until database integration
    user.id = 1

    return user


# ─────────────────────────────────────────────
# LOGIN
# ─────────────────────────────────────────────

@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(login_data: LoginRequest):

    token_data = login_user(
        login_data.email,
        login_data.password,
    )

    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    return token_data


# ─────────────────────────────────────────────
# REFRESH TOKEN
# ─────────────────────────────────────────────

@router.post(
    "/refresh",
    response_model=TokenResponse,
)
def refresh_token(data: RefreshTokenRequest):

    payload = verify_refresh_token(
        data.refresh_token
    )

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )

    token_data = {
        "sub": payload.get("sub"),
        "email": payload.get("email"),
        "role": payload.get("role"),
    }

    access_token = create_access_token(
        token_data
    )

    return {
        "access_token": access_token,
        "refresh_token": data.refresh_token,
        "token_type": "bearer",
    }


# ─────────────────────────────────────────────
# FORGOT PASSWORD
# ─────────────────────────────────────────────

@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest):

    # Temporary implementation until database integration
    if data.email != "ankan@example.com":
        return {
            "message": (
                "If the email exists, a password reset "
                "link has been sent."
            )
        }

    # Generate proper JWT reset token
    reset_token = create_reset_token(
        {
            "email": data.email,
        }
    )

    return {
        "message": (
            "If the email exists, a password reset "
            "link has been sent."
        ),
        "reset_token": reset_token,
    }


# ─────────────────────────────────────────────
# RESET PASSWORD
# ─────────────────────────────────────────────

@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest):

    payload = verify_reset_token(
        data.reset_token
    )

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token",
        )

    if len(data.new_password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters",
        )

    email = payload.get("email")

    new_password_hash = hash_password(
        data.new_password
    )

    # Temporary response until database integration
    return {
        "message": "Password reset successfully",
        "email": email,
        "password_hash": new_password_hash,
    }

# ─────────────────────────────────────────────
# EMAIL VERIFICATION
# ─────────────────────────────────────────────

@router.post("/verify-email")
def verify_email(data: VerifyEmailRequest):

    payload = verify_email_verification_token(
        data.token
    )

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token",
        )

    return {
        "message": "Email verified successfully",
        "email": payload.get("email"),
    }

# ─────────────────────────────────────────────
# LOGOUT
# ─────────────────────────────────────────────

@router.post("/logout")
def logout(
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
):
    token = credentials.credentials

    revoke_token(token)

    return {
        "message": "Logged out successfully",
    }