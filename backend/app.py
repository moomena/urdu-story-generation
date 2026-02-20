# updated app.py

from fastapi import FastAPI
from pydantic import BaseModel
from model import generate_story
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Urdu Story Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    prefix: str = ""
    max_sentences: int = 5  # Adjustable number of sentences

class GenerateResponse(BaseModel):
    story: str

@app.post("/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest):
    story = generate_story(prefix=req.prefix, max_sentences=req.max_sentences)
    return {"story": story}