from fastapi import FastAPI

from app.api.routes.jobs import router as job_router
from app.api.routes.matching import router as matching_router
from app.api.routes.resumes import router as resume_router
from app.api.routes.saved_jobs import router as saved_job_router


app = FastAPI(title="INTERVIEW-AI")

app.include_router(resume_router)
app.include_router(job_router)
app.include_router(matching_router)
app.include_router(saved_job_router)

