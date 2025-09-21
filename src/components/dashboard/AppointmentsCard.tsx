import React from 'react';
import { Calendar, Clock, User, Stethoscope, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  type: 'video' | 'in-person';
  status: 'upcoming' | 'today' | 'completed';
}

const AppointmentsCard = () => {
  const appointments: Appointment[] = [
    {
      id: '1',
      date: 'Today',
      time: '2:30 PM',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      type: 'video',
      status: 'today'
    },
    {
      id: '2',
      date: 'Tomorrow',
      time: '10:00 AM',
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      type: 'in-person',
      status: 'upcoming'
    },
    {
      id: '3',
      date: 'Friday, Dec 1',
      time: '3:15 PM',
      doctor: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      type: 'video',
      status: 'upcoming'
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calendar className="w-5 h-5 text-medical-blue" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={appointment.status === 'today' ? 'default' : 'secondary'} className="text-xs">
                  {appointment.date}
                </Badge>
                <span className="text-sm text-muted-foreground">{appointment.time}</span>
              </div>
              <h4 className="font-medium text-foreground">{appointment.doctor}</h4>
              <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
            </div>
            <div className="flex flex-col gap-2">
              {appointment.status === 'today' ? (
                <Button size="sm" variant="medical" className="min-w-[100px]">
                  <Stethoscope className="w-4 h-4 mr-1" />
                  Join Call
                </Button>
              ) : (
                <Button size="sm" variant="outline" className="min-w-[100px]">
                  View Details
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AppointmentsCard;