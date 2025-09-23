from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from typing import Optional
from models import VoiceResponse, Message
from services.ai_service import AIService
from services.supabase_service import SupabaseService
from datetime import datetime
from starlette.responses import StreamingResponse
import io

router = APIRouter()

@router.post("/voice", response_model=VoiceResponse)
async def voice_input_handler(
    file: UploadFile = File(...),
    user_id: str = Form(...),
    ai_service: AIService = Depends(AIService),
    supabase_service: SupabaseService = Depends(SupabaseService)
):
    audio_bytes = await file.read()

    # 1. Transcribe audio
    transcribed_text = await ai_service.transcribe_audio(audio_bytes)
    if not transcribed_text:
        raise HTTPException(status_code=500, detail="Failed to transcribe audio.")

    # 2. Add user's transcribed message to chat history
    await supabase_service.add_chat_message(user_id, "user", transcribed_text, datetime.now())

    # 3. Get chat history for context
    raw_history = await supabase_service.get_chat_history(user_id)
    chat_history = []
    for item in raw_history:
        chat_history.append({
            "role": item["role"],
            "content": item["content"],
            "timestamp": datetime.fromisoformat(item["timestamp"]),
            "image": item.get("image_url")
        })

    # 4. Get AI response based on transcribed text and history
    ai_reply_content = await ai_service.get_ai_chat_response(user_id, transcribed_text, chat_history)

    # 5. Add AI response to chat history
    await supabase_service.add_chat_message(user_id, "ai", ai_reply_content, datetime.now())

    # 6. Generate TTS audio for AI reply (optional)
    audio_response_bytes = await ai_service.text_to_speech(ai_reply_content)
    audio_url: Optional[str] = None
    # If you want to upload TTS audio to Supabase Storage and provide a URL
    # if audio_response_bytes:
    #     audio_file_name = f"tts_{user_id}_{datetime.now().isoformat().replace(':', '_')}.mp3"
    #     audio_url = await supabase_service.upload_file(audio_file_name, audio_response_bytes, 'tts-audio')

    return VoiceResponse(
        text=transcribed_text,
        reply=ai_reply_content,
        audio_url=audio_url
    )

@router.get("/voice/tts")
async def get_tts_audio(text: str, ai_service: AIService = Depends(AIService)):
    """Endpoint to get TTS audio directly for a given text."""
    audio_bytes = await ai_service.text_to_speech(text)
    if not audio_bytes:
        raise HTTPException(status_code=500, detail="Failed to generate TTS audio.")
    
    # Return as an audio stream
    return StreamingResponse(io.BytesIO(audio_bytes), media_type="audio/mpeg")