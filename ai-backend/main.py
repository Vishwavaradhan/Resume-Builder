from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import google.generativeai as genai

# -------------------------
# Load environment variables
# -------------------------
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY not found in environment variables")

# -------------------------
# Configure Gemini
# -------------------------
genai.configure(api_key=GEMINI_API_KEY)

# ✅ KEEP THIS MODEL LINE FOREVER
model = genai.GenerativeModel("gemini-2.5-flash")

# -------------------------
# FastAPI app
# -------------------------
app = FastAPI(title="AI Resume Assistant")

# -------------------------
# CORS (REQUIRED for frontend)
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React/Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Request schema
# -------------------------
class ChatRequest(BaseModel):
    message: str

# -------------------------
# Health check
# -------------------------
@app.get("/")
def root():
    return {"status": "API is running"}

# -------------------------
# Chat endpoint
# -------------------------
@app.post("/chat")
def chat(req: ChatRequest):
    try:
        prompt = f"""
You are an AI resume and career guidance assistant.
Respond in a concise, professional tone.
Limit the response to 2–3 bullet points.

User question:
{req.message}
"""

        response = model.generate_content(prompt)

        return {
            "reply": response.text.strip()
        }

    except Exception as e:
        return {
            "reply": f"Gemini error: {str(e)}"
        }
