from fastapi import APIRouter, Depends

from app.core.permissions import require_admin


router = APIRouter(
    prefix="/api/v1/admin",
    tags=["Admin"],
)


@router.get("/test")
def admin_test(current_user=Depends(require_admin)):
    return {
        "message": "Admin access granted",
        "user": current_user,
    }