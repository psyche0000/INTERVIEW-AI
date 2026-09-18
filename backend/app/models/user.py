from datetime import datetime


class User:
    def __init__(
        self,
        name: str,
        email: str,
        password_hash: str,
        role: str = "user",
        is_active: bool = True,
        is_verified: bool = False,
    ):
        self.name = name
        self.email = email
        self.password_hash = password_hash
        self.role = role
        self.is_active = is_active
        self.is_verified = is_verified
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()