import React from 'react';
import { MapPin, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { useTranslation } from 'react-i18next';

const doctors = [
  {
    id: 1,
    name: "Dr. Gurjeet Khurana",
    specialty: "Anaesthesiology",
    location: "Dehradun, Uttarakhand"
  },
  {
    id: 2,
    name: "Dr. Anurag Rawat",
    specialty: "Cardiology",
    location: "Dehradun, Uttarakhand"
  },
  {
    id: 3,
    name: "Dr. Deepak Goel",
    specialty: "Neurology",
    location: "Dehradun, Uttarakhand"
  },
  {
    id: 4,
    name: "Dr. Malini Srivastava",
    specialty: "Clinical Psychology",
    location: "Dehradun, Uttarakhand"
  },
  {
    id: 5,
    name: "Dr. Atul Agrawal",
    specialty: "Orthopaedics",
    location: "Dehradun, Uttarakhand"
  },
  {
    id: 6,
    name: "Dr. Ranjeet Kumar",
    specialty: "Neurosurgery",
    location: "Dehradun, Uttarakhand"
  },
  {
    id: 7,
    name: "Dr. Reshma Kaushik",
    specialty: "Emergency Medicine",
    location: "Dehradun, Uttarakhand"
  },
  {
    id: 8,
    name: "Dr. Rashmi Jindal",
    specialty: "Dermatology, Venereology and Leprosy",
    location: "Dehradun, Uttarakhand"
  }
];

const Doctors = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('doctors.title')}</h1>
          <p className="text-muted-foreground">{t('doctors.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300 bg-card border border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-medical-blue to-health-green p-3 rounded-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground">{doctor.name}</CardTitle>
                    <p className="text-sm text-medical-blue font-medium">{doctor.specialty}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-medical-blue mt-1 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{doctor.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;