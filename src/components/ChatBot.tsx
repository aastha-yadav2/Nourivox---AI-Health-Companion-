import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, User, Bot, Calendar, Clock, Stethoscope, ArrowLeft, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import nourivoxLogo from "@/assets/nourivox-logo.png";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  image?: string;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-2 p-4 rounded-2xl bg-health-green-light max-w-xs">
    <Bot className="w-5 h-5 text-health-green" />
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-health-green rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-health-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-health-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  </div>
);

const QuickActions = ({ onActionClick }: { onActionClick: (action: string) => void }) => (
  <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg">
    <Button variant="outline" size="sm" onClick={() => onActionClick("book_appointment")} className="flex items-center gap-2">
      <Calendar className="w-4 h-4" /> Book Appointment
    </Button>
    <Button variant="outline" size="sm" onClick={() => onActionClick("view_reminders")} className="flex items-center gap-2">
      <Clock className="w-4 h-4" /> View Reminders
    </Button>
    <Button variant="outline" size="sm" onClick={() => onActionClick("connect_doctor")} className="flex items-center gap-2">
      <Stethoscope className="w-4 h-4" /> Connect with Doctor
    </Button>
  </div>
);

const API_URL = "http://127.0.0.1:5000"; // Backend URL

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: "Hello! I'm your Nourivox AI assistant. How can I help you today?", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages, isTyping]);

  // ----- Backend Functions -----

  const sendMessageToBackend = async (message: string) => {
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: '123', message })
      });
      const data = await res.json();
      return data.reply;
    } catch (err) {
      console.error(err);
      return "Sorry, I couldn't connect to the server.";
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('user_id', '123');

    try {
      const res = await fetch(`${API_URL}/api/prescriptions/prescriptions/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      return data; // { message, image_url }
    } catch (err) {
      console.error(err);
      return { message: "Image analysis failed.", image_url: undefined };
    }
  };

  const bookAppointment = async (user_id: string, details: { doctor: string; date: string; time: string }) => {
    try {
      const res = await fetch(`${API_URL}/api/appointments/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, ...details })
      });
      const data = await res.json();
      return data.message || "Appointment booked successfully!";
    } catch (err) {
      console.error(err);
      return "Failed to book appointment.";
    }
  };

  const getReminders = async (user_id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/reminders/reminders/${user_id}`);
      const data = await res.json();
      return data || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const getDoctors = async () => {
    try {
      const res = await fetch(`${API_URL}/api/doctors/doctors`);
      const data = await res.json();
      return data || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // ----- Message Handlers -----

  const handleSendMessage = async (actionContent?: string) => {
    const content = actionContent || inputValue.trim();
    if (!content && !uploadedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      image: uploadedImage ? URL.createObjectURL(uploadedImage) : undefined
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setUploadedImage(null);
    setIsTyping(true);

    let aiReply = '';

    if (uploadedImage) {
      const { message, image_url } = await uploadImage(uploadedImage);
      aiReply = message;
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: aiReply, timestamp: new Date(), image: image_url }]);
    } else {
      // Quick action handling
      if (['book_appointment', 'view_reminders', 'connect_doctor'].includes(content)) {
        if (content === 'book_appointment') {
          aiReply = await bookAppointment('123', { doctor: 'General Physician', date: '2025-09-25', time: '10:00 AM' });
        }
        if (content === 'view_reminders') {
          const reminders = await getReminders('123');
          aiReply = reminders.length
            ? reminders.map((r: any) => `• ${r.title} at ${r.time}`).join('\n')
            : "You have no reminders.";
        }
        if (content === 'connect_doctor') {
          const doctors = await getDoctors();
          aiReply = doctors.length
            ? `Available doctors:\n${doctors.map((d: any) => `• ${d.name} - ${d.specialization}`).join('\n')}`
            : "No doctors are currently available.";
        }

        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: aiReply, timestamp: new Date() }]);
        setIsTyping(false);
        return;
      }

      // Regular AI chat
      aiReply = await sendMessageToBackend(content);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: aiReply, timestamp: new Date() }]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMicClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      let chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = e => chunks.push(e.data);

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('file', blob, 'voice.wav');
        formData.append('user_id', '123');

        const res = await fetch(`${API_URL}/api/voice`, { method: 'POST', body: formData });
        const data = await res.json();

        setMessages(prev => [
          ...prev,
          { id: Date.now().toString(), role: 'user', content: data.text, timestamp: new Date() },
          { id: (Date.now() + 1).toString(), role: 'ai', content: data.reply, timestamp: new Date() }
        ]);
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000); // 5-second recording
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      toast({ title: "Image Uploaded", description: `You uploaded: ${file.name}` });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={nourivoxLogo} alt="Nourivox Logo" className="h-10 w-auto" />
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-medical-blue text-white ml-auto' : 'bg-health-green-light text-foreground mr-auto border border-border'}`}>
              <div className="flex items-start gap-2">
                {msg.role === 'ai' && <Bot className="w-5 h-5 text-health-green flex-shrink-0 mt-0.5" />}
                <div className="flex-1">
                  {msg.image && <img src={msg.image} alt="Uploaded" className="mb-2 max-h-48 rounded-lg" />}
                  <p className="text-sm md:text-base whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {msg.role === 'user' && <User className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />}
              </div>
            </div>
          </div>
        ))}
        {isTyping && <div className="flex justify-start"><TypingIndicator /></div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-2">
        <QuickActions onActionClick={handleSendMessage} />
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message here..." className="pr-32 text-base" disabled={isTyping} />
            <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageChange} />
            <label htmlFor="imageUpload" className="absolute right-16 top-1/2 -translate-y-1/2 cursor-pointer">
              <img src="/icons/upload-icon.svg" alt="Upload" className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </label>
          </div>
          <Button variant="outline" size="icon" onClick={handleMicClick} className="flex-shrink-0"><Mic className="w-4 h-4" /></Button>
          <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() && !uploadedImage || isTyping} className="flex-shrink-0"><Send className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
