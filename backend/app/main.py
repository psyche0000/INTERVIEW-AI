from fastapi import FastAPI

app = FastAPI(title="InterviewAI Backend")

@app.get("/health")
def health_check():
    return {"status": "ok"}
