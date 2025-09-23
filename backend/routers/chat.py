from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime
from models import ChatRequest, ChatResponse, Message
from services.supabase_service import SupabaseService
from services.ai_service import AIService

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(
    request: ChatRequest,
    supabase_service: SupabaseService = Depends(SupabaseService),
    ai_service: AIService = Depends(AIService)
):
    user_id = request.user_id
    user_message_content = request.message

    # 1. Add user message to history
    user_message_db = {
        "user_id": user_id,
        "role": "user",
        "content": user_message_content,
        "timestamp": datetime.now().isoformat()
    }
    await supabase_service.add_chat_message(user_id, "user", user_message_content, datetime.now())

    # 2. Get full chat history for context
    raw_history = await supabase_service.get_chat_history(user_id)
    chat_history = []
    for item in raw_history:
        chat_history.append({
            "role": item["role"],
            "content": item["content"],
            "timestamp": datetime.fromisoformat(item["timestamp"]),
            "image": item.get("image_url")
        })

    # 3. Get AI response
    ai_reply_content = await ai_service.get_ai_chat_response(user_id, user_message_content, chat_history)

    # 4. Add AI response to history
    ai_message_db = {
        "user_id": user_id,
        "role": "ai",
        "content": ai_reply_content,
        "timestamp": datetime.now().isoformat()
    }
    await supabase_service.add_chat_message(user_id, "ai", ai_reply_content, datetime.now())

    # 5. Return updated chat history and AI reply
    updated_history = await supabase_service.get_chat_history(user_id)
    formatted_updated_history = []
    for item in updated_history:
         formatted_updated_history.append(Message(
            id=str(item["id"]),
            role=item["role"],
            content=item["content"],
            timestamp=datetime.fromisoformat(item["timestamp"]),
            image=item.get("image_url")
        ))

    return ChatResponse(reply=ai_reply_content, chat_history=formatted_updated_history)