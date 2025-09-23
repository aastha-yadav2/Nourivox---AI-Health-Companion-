from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from supabase import create_client, Client

# 1️⃣ Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

print("DEBUG SUPABASE_URL:", SUPABASE_URL)  # should print your URL

# 2️⃣ Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# 3️⃣ Import routers after env is loaded
from routers import chat, voice, image, appointments, reminders, doctors

# 4️⃣ Initialize FastAPI
app = FastAPI(
    title="Nourivox AI Health Assistant Backend",
    description="Backend for the Nourivox AI chatbot, providing health advice, appointment booking, and more.",
    version="0.1.0"
)

# 5️⃣ Configure CORS
origins = [
    "http://localhost",
    "http://localhost:8080",  # React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 6️⃣ Include routers
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(voice.router, prefix="/api", tags=["Voice"])
app.include_router(image.router, prefix="/api/prescriptions", tags=["Image Analysis"])
app.include_router(appointments.router, prefix="/api/appointments", tags=["Appointments"])
app.include_router(reminders.router, prefix="/api/reminders", tags=["Reminders"])
app.include_router(doctors.router, prefix="/api/doctors", tags=["Doctors"])

# 7️⃣ Root endpoint
@app.get("/")
async def root():
    return {"message": "Nourivox AI Health Assistant API is running!"}

# 8️⃣ Optional test Supabase endpoint
@app.get("/test-supabase")
async def test_supabase():
    try:
        res = supabase.table("doctors").select("*").limit(1).execute()
        return {"status": "ok", "data": res.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# 9️⃣ Run with python main.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
