import React, { useState } from 'react';
import { Clock, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface Reminder {
  id: string;
  medication: string;
  dosage: string;
  time: string;
  taken: boolean;
  important: boolean;
}

const RemindersCard = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      medication: 'Lisinopril',
      dosage: '10mg',
      time: '8:00 AM',
      taken: true,
      important: false
    },
    {
      id: '2',
      medication: 'Metformin',
      dosage: '500mg',
      time: '12:00 PM',
      taken: false,
      important: false
    },
    {
      id: '3',
      medication: 'Atorvastatin',
      dosage: '20mg',
      time: '8:00 PM',
      taken: false,
      important: true
    }
  ]);

  const handleToggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, taken: !reminder.taken }
          : reminder
      )
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Clock className="w-5 h-5 text-health-green" />
          Today's Medicine Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reminders.map((reminder) => (
          <div 
            key={reminder.id} 
            className={`flex items-center gap-3 p-4 rounded-lg border ${
              reminder.taken 
                ? 'bg-health-green-light border-health-green/20' 
                : 'bg-muted border-border'
            }`}
          >
            <Checkbox
              checked={reminder.taken}
              onCheckedChange={() => handleToggleReminder(reminder.id)}
              className="data-[state=checked]:bg-health-green data-[state=checked]:border-health-green"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-medium ${reminder.taken ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {reminder.medication}
                </h4>
                {reminder.important && !reminder.taken && (
                  <AlertCircle className="w-4 h-4 text-destructive" />
                )}
                {reminder.taken && (
                  <Check className="w-4 h-4 text-health-green" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${reminder.taken ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  {reminder.dosage}
                </span>
                <Badge variant="outline" className="text-xs">
                  {reminder.time}
                </Badge>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            {reminders.filter(r => r.taken).length} of {reminders.length} medications taken today
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RemindersCard;