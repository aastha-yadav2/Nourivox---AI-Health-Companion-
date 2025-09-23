import os
from dotenv import load_dotenv
from supabase import create_client, Client
from typing import List, Dict, Any, Optional
from datetime import datetime, date, time

load_dotenv()

SUPABASE_URL: str = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY: str = os.environ.get("SUPABASE_KEY", "")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class SupabaseService:
    def __init__(self):
        self.supabase = supabase

    async def get_chat_history(self, user_id: str) -> List[Dict[str, Any]]:
        response = self.supabase.from_('chat_history').select('*').eq('user_id', user_id).order('timestamp', desc=False).execute()
        return response.data

    async def add_chat_message(self, user_id: str, role: str, content: str, timestamp: datetime, image: Optional[str] = None):
        data = {
            "user_id": user_id,
            "role": role,
            "content": content,
            "timestamp": timestamp.isoformat(),
            "image_url": image
        }
        response = self.supabase.from_('chat_history').insert(data).execute()
        return response.data

    async def get_appointments(self, user_id: str) -> List[Dict[str, Any]]:
        response = self.supabase.from_('appointments').select('*').eq('user_id', user_id).order('date', desc=True).execute()
        return response.data

    async def create_appointment(self, appointment_data: Dict[str, Any]) -> Dict[str, Any]:
        response = self.supabase.from_('appointments').insert(appointment_data).execute()
        return response.data[0] if response.data else None

    async def get_reminders(self, user_id: str) -> List[Dict[str, Any]]:
        # Fetch reminders for today and future
        today = date.today().isoformat()
        response = self.supabase.from_('reminders').select('*').eq('user_id', user_id).or_(f'date.gte.{today},date.is.null').order('time', desc=False).execute()
        return response.data

    async def create_reminder(self, reminder_data: Dict[str, Any]) -> Dict[str, Any]:
        response = self.supabase.from_('reminders').insert(reminder_data).execute()
        return response.data[0] if response.data else None

    async def get_doctors(self, specialization: Optional[str] = None) -> List[Dict[str, Any]]:
        query = self.supabase.from_('doctors').select('*')
        if specialization:
            query = query.eq('specialization', specialization)
        response = query.execute()
        return response.data

    async def upload_file(self, file_path: str, file_bytes: bytes, bucket_name: str = 'nourivox-uploads') -> str:
        """Uploads a file to Supabase Storage and returns its public URL."""
        try:
            # Upload to a specific path within the bucket
            response = self.supabase.storage.from_(bucket_name).upload(file_path, file_bytes)
            # Make the file public (if needed, or handle access policies)
            # Supabase doesn't have a direct "make public" API after upload
            # You usually set bucket policies or generate signed URLs.
            # For simplicity, assuming the bucket is public or you'll manage access on Supabase console.
            public_url = self.supabase.storage.from_(bucket_name).get_public_url(file_path)
            return public_url
        except Exception as e:
            print(f"Error uploading file to Supabase Storage: {e}")
            # If the file already exists, upload will fail, try to update
            if "Duplicate" in str(e):
                response = self.supabase.storage.from_(bucket_name).update(file_path, file_bytes)
                public_url = self.supabase.storage.from_(bucket_name).get_public_url(file_path)
                return public_url
            raise