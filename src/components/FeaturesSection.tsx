import { MessageSquare, Video, Calendar, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';


const FeaturesSection = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: MessageSquare,
      title: t('features.aiChat.title'),
      description: t('features.aiChat.description'),
      color: "text-medical-blue",
      bgColor: "bg-medical-blue-light"
    },
    {
      icon: Video,
      title: t('features.doctorConnect.title'),
      description: t('features.doctorConnect.description'),
      color: "text-health-green",
      bgColor: "bg-health-green-light"
    },
    {
      icon: Calendar,
      title: t('features.personalizedCare.title'),
      description: t('features.personalizedCare.description'),
      color: "text-medical-blue",
      bgColor: "bg-medical-blue-light"
    },
    {
      icon: Shield,
      title: t('features.securePrivate.title'),
      description: t('features.securePrivate.description'),
      color: "text-health-green",
      bgColor: "bg-health-green-light"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-0 shadow-soft"
              >
                <CardContent className="p-8 text-center">
                  <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-medical-blue transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-medical-blue-light to-health-green-light rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Healthcare Experience?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of patients who trust HealthChat AI for their medical needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-medical-blue to-health-green text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Get Started Free
              </button>
              <button className="border-2 border-medical-blue text-medical-blue px-8 py-4 rounded-lg font-semibold hover:bg-medical-blue hover:text-white transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;