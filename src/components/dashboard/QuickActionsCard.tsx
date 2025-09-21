import React, { useState } from 'react';
import { MessageCircle, Calendar, Phone, Bot, Stethoscope, Clock, AlertTriangle, Heart, Baby, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

const QuickActionsCard = () => {
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false);

  const emergencyNumbers = [
    {
      number: '112',
      title: 'Life-threatening Emergency',
      description: 'For immediate life-threatening emergencies',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      number: '108',
      title: 'Ambulance',
      description: 'For ambulance services',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      number: '102',
      title: 'Pregnancy/Maternal Emergency',
      description: 'For pregnancy and maternal emergencies',
      icon: Baby,
      color: 'text-pink-600'
    },
    {
      number: '104',
      title: 'Health Advice',
      description: 'For non-urgent medical information',
      icon: HelpCircle,
      color: 'text-blue-600'
    }
  ];

  const handleEmergencyCall = (number) => {
    window.open(`tel:${number}`, '_self');
    setIsEmergencyDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Bot className="w-5 h-5 text-medical-blue" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link to="/chat" className="block">
          <Button 
            variant="medical" 
            className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-medium">Chat with AI</span>
          </Button>
        </Link>
        
        <Button 
          variant="health" 
          className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
        >
          <Calendar className="w-6 h-6" />
          <span className="text-sm font-medium">Book Appointment</span>
        </Button>
        
        <Dialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="destructive" 
              className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
            >
              <Phone className="w-6 h-6" />
              <span className="text-sm font-medium">Emergency</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Emergency Helplines
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              {emergencyNumbers.map((emergency) => {
                const IconComponent = emergency.icon;
                return (
                  <Button
                    key={emergency.number}
                    variant="outline"
                    onClick={() => handleEmergencyCall(emergency.number)}
                    className="h-auto p-4 flex items-start gap-3 text-left hover:bg-accent"
                  >
                    <IconComponent className={`w-5 h-5 mt-0.5 ${emergency.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground">{emergency.number}</div>
                      <div className="font-medium text-sm text-foreground">{emergency.title}</div>
                      <div className="text-xs text-muted-foreground">{emergency.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;