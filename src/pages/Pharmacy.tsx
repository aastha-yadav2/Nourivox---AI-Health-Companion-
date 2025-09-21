import React from 'react';
import { MapPin, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { useTranslation } from 'react-i18next';

// 1. Direct reference to the image in the public folder.
// No 'import' statement is needed for files in the public directory.
const taskarImageUrl = '/Taskar.jpg'; 

const pharmacyCentres = [
  {
    id: 1,
    name: "Naitik Medical Store",
    location: "55P6+WJW, Joly Grant, Sangatiya Walakhur, Uttarakhand 248016"
  },
  {
    id: 2,
    name: "Sitaram Pharmacy",
    location: "Himalayan Hospital Rd, Joly Grant, Baruwala Grant, Baksar Wala, Uttarakhand 248016"
  },
  {
    id: 3,
    name: "Medacart Pharmacy",
    location: "Canal road Upper, Tunwala, Dehradun, Uttarakhand 248005"
  },
  {
    id: 4,
    name: "Shivay Pharmacy",
    location: "Joly Grant, Dehradun, Baksar Wala, Uttarakhand 248016"
  },
  {
    id: 5,
    name: "Panwar Medicare Pharmacy",
    location: "Jolly Grant, Aadarsh Nagar, Dehradun, Uttarakhand"
  },
  {
    id: 6,
    name: "Neeraj Medicose",
    location: "Adarsh Nagar Chowk, Joly Grant Dehradhun, 248001, Joly Grant, Bhania Wala, Uttarakhand 248016"
  },
  {
    id: 7,
    name: "Taskar",
    location: "India's 1st healthcare mall. 24 Hours. Home Delivery.",
    imageUrl: taskarImageUrl
  }
];

const Pharmacy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('pharmacy.title')}</h1>
          <p className="text-muted-foreground">{t('pharmacy.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacyCentres.map((centre) => (
            <Card key={centre.id} className="hover:shadow-lg transition-shadow duration-300 bg-card border border-border">
              {centre.imageUrl ? (
                <img
                  src={centre.imageUrl}
                  alt={centre.name}
                  className="w-full h-auto object-cover rounded-t-lg"
                />
              ) : (
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-medical-blue to-health-green p-3 rounded-lg">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground">{centre.name}</CardTitle>
                  </div>
                </CardHeader>
              )}
              <CardContent>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-medical-blue mt-1 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{centre.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;