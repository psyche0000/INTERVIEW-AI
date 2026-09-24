# Import FastAPI application support.
from fastapi import FastAPI

# Import the Feedback API router.
from app.api.routes.feedback import router as feedback_router


# Create the FastAPI application.
app = FastAPI(
    title="Interview AI API",
)


# Register the Feedback API routes.
app.include_router(feedback_router, prefix="/api")


# Import the Chat API router.
from app.api.routes.chat import router as chat_router


# Register the Chat API routes.
app.include_router(
    chat_router,
    prefix="/api",
)

# Import the Notification API router.
from app.api.routes.notifications import router as notification_router


# Register the Notification API routes.
app.include_router(
    notification_router,
    prefix="/api",
)