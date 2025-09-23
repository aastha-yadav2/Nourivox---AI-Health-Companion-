from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from models import Reminder, ReminderCreate
from services.supabase_service import SupabaseService
from datetime import datetime, date, time

router = APIRouter()

@router.post("/reminders", response_model=Reminder)
async def create_reminder(
    reminder: ReminderCreate,
    supabase_service: SupabaseService = Depends(SupabaseService)
):
    reminder_data = reminder.dict()
    reminder_data['status'] = "active"
    reminder_data['created_at'] = datetime.now().isoformat()
    reminder_data['time'] = reminder_data['time'].isoformat()
    if reminder_data.get('date'):
        reminder_data['date'] = reminder_data['date'].isoformat()

    try:
        new_reminder = await supabase_service.create_reminder(reminder_data)
        if not new_reminder:
             raise HTTPException(status_code=500, detail="Failed to create reminder in Supabase.")
        return Reminder(**new_reminder)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating reminder: {e}")

@router.get("/reminders/{user_id}", response_model=List[Reminder])
async def get_user_reminders(
    user_id: str,
    supabase_service: SupabaseService = Depends(SupabaseService)
):
    reminders = await supabase_service.get_reminders(user_id)
    # Ensure date/time objects are correctly handled if they are not stored as ISO strings
    # Supabase client usually handles this if you pass datetime objects to insert,
    # but when retrieving, you might need to convert back from string if not directly read as object.
    formatted_reminders = []
    for r in reminders:
        r['time'] = time.fromisoformat(r['time'])
        if r.get('date'):
            r['date'] = date.fromisoformat(r['date'])
        formatted_reminders.append(Reminder(**r))
    return formatted_reminders

# CRUD operations for reminders can be expanded here (update, delete)