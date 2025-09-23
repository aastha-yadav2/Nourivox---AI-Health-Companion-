import os
from dotenv import load_dotenv
import openai
import google.generativeai as genai
from typing import List, Dict, Any, Optional
import io
import base64

load_dotenv()

# OpenAI Setup
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY
    openai_client = openai.OpenAI(api_key=OPENAI_API_KEY)

# Gemini Setup
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    gemini_model = genai.GenerativeModel('gemini-pro')
    gemini_vision_model = genai.GenerativeModel('gemini-pro-vision') # For multimodal image analysis

class AIService:
    def __init__(self):
        self.openai_client = openai_client if OPENAI_API_KEY else None
        self.gemini_model = gemini_model if GEMINI_API_KEY else None
        self.gemini_vision_model = gemini_vision_model if GEMINI_API_KEY else None

    async def get_ai_chat_response(self, user_id: str, message: str, chat_history: List[Dict[str, Any]]) -> str:
        # Prioritize Gemini if available, otherwise fallback to OpenAI
        if self.gemini_model:
            # Format chat history for Gemini
            formatted_history = []
            for msg in chat_history:
                if msg['role'] == 'user':
                    formatted_history.append({'role': 'user', 'parts': [msg['content']]})
                elif msg['role'] == 'ai':
                    formatted_history.append({'role': 'model', 'parts': [msg['content']]})
            
            # Add the new message
            formatted_history.append({'role': 'user', 'parts': [message]})

            try:
                response = self.gemini_model.generate_content(
                    formatted_history,
                    safety_settings=[
                        {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
                        {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
                        {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
                        {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
                    ]
                )
                return response.text
            except Exception as e:
                print(f"Gemini chat error: {e}")
                # Fallback to OpenAI if Gemini fails
                if self.openai_client:
                    return await self._get_openai_chat_response(user_id, message, chat_history)
                return "Sorry, I couldn't process your request with any AI service."
        elif self.openai_client:
            return await self._get_openai_chat_response(user_id, message, chat_history)
        else:
            return "AI service not configured."

    async def _get_openai_chat_response(self, user_id: str, message: str, chat_history: List[Dict[str, Any]]) -> str:
        messages = [{"role": "system", "content": "You are a helpful healthcare assistant. Always include a disclaimer: 'This is not a substitute for a doctor.'"}]
        for msg in chat_history:
            messages.append({"role": msg['role'], "content": msg['content']})
        messages.append({"role": "user", "content": message})

        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo", # or gpt-4
                messages=messages
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"OpenAI chat error: {e}")
            return "Sorry, I couldn't process your request with OpenAI."

    async def transcribe_audio(self, audio_file_bytes: bytes) -> str:
        if self.openai_client:
            try:
                # OpenAI Whisper expects a file-like object
                audio_file = io.BytesIO(audio_file_bytes)
                audio_file.name = "voice.wav" # Whisper needs a filename
                
                response = self.openai_client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    response_format="json" # Specify JSON to get the text directly
                )
                return response.text
            except Exception as e:
                print(f"OpenAI Whisper error: {e}")
                return "Could not transcribe audio."
        else:
            # Fallback to Google Speech-to-Text if OpenAI not available
            # This would require Google Cloud setup and client library
            # For now, we'll just return an error if Whisper isn't available.
            return "Audio transcription service not configured."

    async def text_to_speech(self, text: str) -> Optional[bytes]:
        if self.openai_client:
            try:
                response = self.openai_client.audio.speech.create(
                    model="tts-1",
                    voice="alloy", # or 'nova', 'shimmer', etc.
                    input=text
                )
                # response.stream_to_file("speech.mp3") # If saving to file directly
                return response.content # Returns raw audio bytes
            except Exception as e:
                print(f"OpenAI TTS error: {e}")
                return None
        elif self.gemini_model: # Gemini has no direct TTS, but you could integrate a separate service
            print("Gemini does not have native TTS for direct audio output.")
            return None
        return None

    async def analyze_image(self, image_bytes: bytes, prompt: str = "Analyze this image for any health-related information, symptoms, or medications. Describe what you see and provide a concise summary. Always include a disclaimer: 'This is not a substitute for a doctor.'") -> str:
        if self.gemini_vision_model:
            try:
                # Prepare image for Gemini Vision
                image_parts = [
                    {
                        "mime_type": "image/jpeg", # or "image/png" depending on your input
                        "data": image_bytes
                    }
                ]
                response = self.gemini_vision_model.generate_content([prompt, *image_parts])
                response.resolve() # Ensure content is resolved
                return response.text
            except Exception as e:
                print(f"Gemini Vision error: {e}")
                # Fallback to OpenAI Vision if Gemini fails
                if self.openai_client:
                    return await self._analyze_image_openai(image_bytes, prompt)
                return "Image analysis failed with all available services."
        elif self.openai_client:
            return await self._analyze_image_openai(image_bytes, prompt)
        else:
            return "Image analysis service not configured."

    async def _analyze_image_openai(self, image_bytes: bytes, prompt: str) -> str:
        if self.openai_client:
            try:
                base64_image = base64.b64encode(image_bytes).decode('utf-8')
                response = self.openai_client.chat.completions.create(
                    model="gpt-4o", # or "gpt-4-vision-preview"
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {"type": "text", "text": prompt},
                                {
                                    "type": "image_url",
                                    "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                                },
                            ],
                        }
                    ],
                    max_tokens=1000,
                )
                return response.choices[0].message.content
            except Exception as e:
                print(f"OpenAI Vision error: {e}")
                return "Image analysis failed with OpenAI."
        return "OpenAI Vision not configured."