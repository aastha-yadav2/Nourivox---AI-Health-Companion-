from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from models import ImageUploadResponse, Message
from services.ai_service import AIService
from services.supabase_service import SupabaseService
from datetime import datetime
import os

router = APIRouter()

@router.post("/prescriptions/upload", response_model=ImageUploadResponse)
async def upload_prescription_image(
    image: UploadFile = File(...),
    user_id: str = Form(...),
    ai_service: AIService = Depends(AIService),
    supabase_service: SupabaseService = Depends(SupabaseService)
):
    if not image.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Only image files are allowed.")

    image_bytes = await image.read()
    file_extension = image.filename.split('.')[-1] if '.' in image.filename else 'jpg'
    file_path_in_storage = f"user_uploads/{user_id}/{datetime.now().isoformat().replace(':', '_')}.{file_extension}"

    # 1. Upload image to Supabase Storage
    try:
        image_public_url = await supabase_service.upload_file(file_path_in_storage, image_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {e}")

    # 2. Add user's image message to chat history
    # The 'content' here can be a placeholder or a description of the upload
    await supabase_service.add_chat_message(user_id, "user", f"Uploaded an image: {image.filename}", datetime.now(), image_public_url)

    # 3. Analyze image with AI Vision
    ai_analysis_message = await ai_service.analyze_image(image_bytes)

    # 4. Add AI's analysis to chat history
    await supabase_service.add_chat_message(user_id, "ai", ai_analysis_message, datetime.now())

    return ImageUploadResponse(message=ai_analysis_message, image_url=image_public_url)