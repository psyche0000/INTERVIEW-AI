"""Schemas for user profile and administration APIs."""

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator


class UserProfileResponse(BaseModel):
    """Public user information; never expose password hashes."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    role: str
    is_active: bool
    is_verified: bool


class UserProfileUpdate(BaseModel):
    """Fields a user may update on their own profile."""

    name: str | None = Field(default=None, min_length=2, max_length=100)
    email: EmailStr | None = None

    @model_validator(mode="after")
    def require_update_field(self):
        if not self.model_fields_set:
            raise ValueError("Provide at least one field to update")
        if self.name is None and self.email is None:
            raise ValueError("Fields cannot be null")
        return self


class PasswordChangeRequest(BaseModel):
    """Request to change the current user's password."""

    current_password: str = Field(min_length=1, max_length=72)
    new_password: str = Field(min_length=8, max_length=72)


class AdminUserUpdate(BaseModel):
    """Fields an administrator may change on a user account."""

    role: str | None = None
    is_active: bool | None = None
    is_verified: bool | None = None

    @model_validator(mode="after")
    def validate_update(self):
        if not self.model_fields_set:
            raise ValueError("Provide at least one field to update")
        if all(
            getattr(self, field) is None
            for field in self.model_fields_set
        ):
            raise ValueError("Fields cannot be null")
        if self.role is not None and self.role not in {"user", "admin"}:
            raise ValueError("Role must be 'user' or 'admin'")
        return self
