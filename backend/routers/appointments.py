from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from models import Appointment, AppointmentCreate
from services.supabase_service import SupabaseService
from services.ai_service import AIService
from datetime import datetime, date, time

router = APIRouter()

@router.post("/appointments", response_model=Appointment)
async def create_appointment(
    appointment: AppointmentCreate,
    supabase_service: SupabaseService = Depends(SupabaseService),
    ai_service: AIService = Depends(AIService) # Potentially for NLP parsing of requests
):
    # In a real app, you might want to check doctor availability, etc.
    # For now, we'll just store it.

    # Example: If 'specialization' is provided but not 'doctor_id', find a doctor
    if appointment.specialization and not appointment.doctor_id:
        doctors = await supabase_service.get_doctors(specialization=appointment.specialization)
        if doctors:
            # Pick the first available doctor, or implement a more complex logic
            appointment.doctor_id = doctors[0]['id']
        else:
            raise HTTPException(status_code=404, detail=f"No doctors found for specialization: {appointment.specialization}")

    appointment_data = appointment.dict()
    appointment_data['status'] = "pending"
    appointment_data['created_at'] = datetime.now().isoformat()
    # Supabase expects date/time as strings for simple types, or proper datetime objects for timestamp fields
    appointment_data['date'] = appointment_data['date'].isoformat()
    appointment_data['time'] = appointment_data['time'].isoformat()

    try:
        new_appointment = await supabase_service.create_appointment(appointment_data)
        if not new_appointment:
             raise HTTPException(status_code=500, detail="Failed to create appointment in Supabase.")
        return Appointment(**new_appointment)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating appointment: {e}")

@router.get("/appointments/{user_id}", response_model=List[Appointment])
async def get_user_appointments(
    user_id: str,
    supabase_service: SupabaseService = Depends(SupabaseService)
):
    appointments = await supabase_service.get_appointments(user_id)
    return [Appointment(**app) for app in appointments]

# Example: Could add a PUT/DELETE for updating/cancelling appointments