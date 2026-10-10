from fastapi import FastAPI

from app.api.routes.admin_dashboard import router as admin_dashboard_router
from app.api.routes.admin_jobs import router as admin_job_router
from app.api.routes.jobs import router as job_router
from app.api.routes.matching import router as matching_router
from app.api.routes.resumes import router as resume_router
from app.api.routes.saved_jobs import router as saved_job_router
from app.api.routes.admin_feedback import router as admin_feedback_router
from app.api.routes.users import router as users_router
from app.api.routes.users import admin_router as admin_users_router


app = FastAPI(title="INTERVIEW-AI")

app.include_router(resume_router)
app.include_router(job_router)
app.include_router(matching_router)
app.include_router(saved_job_router)
app.include_router(admin_job_router)
app.include_router(admin_dashboard_router)
app.include_router(admin_feedback_router)
app.include_router(users_router)
app.include_router(admin_users_router)
