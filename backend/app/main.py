from fastapi import FastAPI

from app.api.routes.resumes import router as resume_router


app = FastAPI(
    title="INTERVIEW-AI",
)

app.include_router(resume_router)