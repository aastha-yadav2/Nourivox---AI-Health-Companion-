from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date, time

class Message(BaseModel):
    id: Optional[str] = None
    role: str
    content: str
    timestamp: datetime
    image: Optional[str] = None

class ChatRequest(BaseModel):
    user_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str
    chat_history: List[Message]

class VoiceRequest(BaseModel):
    user_id: str
    file: bytes # For file upload, handled by FastAPI File
    # Alternatively, for streamed audio, you might need a different approach or base64 encode

class VoiceResponse(BaseModel):
    text: str # Transcribed text
    reply: str # AI's text response
    audio_url: Optional[str] = None # TTS audio URL

class ImageUploadResponse(BaseModel):
    message: str
    image_url: Optional[str] = None # URL of the uploaded image if stored

class AppointmentBase(BaseModel):
    user_id: str
    doctor_id: Optional[str] = None
    specialization: Optional[str] = None
    date: date
    time: time
    reason: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class Appointment(AppointmentBase):
    id: str
    status: str = "pending"
    created_at: datetime

    class Config:
        orm_mode = True # For SQLAlchemy compatibility, good practice

class ReminderBase(BaseModel):
    user_id: str
    message: str
    time: time
    reminder_date: Optional[date] = None # Can be a daily reminder or specific date

class ReminderCreate(ReminderBase):
    pass

class Reminder(ReminderBase):
    id: str
    status: str = "active"
    created_at: datetime

    class Config:
        orm_mode = True

class Doctor(BaseModel):
    id: str
    name: str
    specialization: str
    contact: Optional[str] = None
    email: Optional[str] = None

    class Config:
        orm_mode = True