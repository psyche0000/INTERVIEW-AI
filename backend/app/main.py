from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.admin import router as admin_router
from app.core.logging import setup_logging

from app.core.exceptions import (
    AppException,
    app_exception_handler,
)
from app.routers.interviews import router as interviews_router
setup_logging()

app = FastAPI(
    title="InterviewAI Backend"
)

app.add_exception_handler(
    AppException,
    app_exception_handler,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(admin_router)
app.include_router(interviews_router)

@app.get("/health")
def health_check():
    return {"status": "ok"}