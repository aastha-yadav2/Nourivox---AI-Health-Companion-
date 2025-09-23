from fastapi import APIRouter, Depends, Query, HTTPException, status
from typing import List, Optional
from models import Doctor
from services.supabase_service import SupabaseService

router = APIRouter()

@router.get("/doctors", response_model=List[Doctor])
async def get_doctors(
    specialization: Optional[str] = Query(None, description="Filter doctors by specialization"),
    supabase_service: SupabaseService = Depends(SupabaseService)
):
    doctors = await supabase_service.get_doctors(specialization=specialization)
    return [Doctor(**doc) for doc in doctors]

@router.get("/doctors/{doctor_id}", response_model=Doctor)
async def get_doctor_by_id(
    doctor_id: str,
    supabase_service: SupabaseService = Depends(SupabaseService)
):
    doctors = await supabase_service.supabase.from_('doctors').select('*').eq('id', doctor_id).execute()
    if not doctors.data:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return Doctor(**doctors.data[0])

# CRUD operations for doctors can be expanded here