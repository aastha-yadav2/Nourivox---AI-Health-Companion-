import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Telescope } from "lucide-react";
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();
  
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background via-medical-blue-light/10 to-health-green-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contributors Card */}
          <Card className="border-medical-blue/20 shadow-medical hover:shadow-medical-strong transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-medical-blue-light/5">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-medical-blue to-health-green rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-medical-blue">{t('about.aiTechnology.title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-medical-blue-light/10 border border-medical-blue/10">
                  <p className="font-semibold text-foreground">{t('about.expertDoctors.title')}</p>
                  <p className="text-sm text-muted-foreground">{t('about.expertDoctors.description')}</p>
                </div>
                <div className="p-3 rounded-lg bg-health-green-light/10 border border-health-green/10">
                  <p className="font-semibold text-foreground">{t('about.patientFirst.title')}</p>
                  <p className="text-sm text-muted-foreground">{t('about.patientFirst.description')}</p>
                </div>
                <div className="p-3 rounded-lg bg-medical-blue-light/10 border border-medical-blue/10">
                  <p className="font-semibold text-foreground">{t('about.aiTechnology.title')}</p>
                  <p className="text-sm text-muted-foreground">{t('about.aiTechnology.description')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aim Card */}
          <Card className="border-health-green/20 shadow-medical hover:shadow-medical-strong transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-health-green-light/5">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-health-green to-medical-blue rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-health-green">Our Aim</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="p-6 rounded-lg bg-health-green-light/10 border border-health-green/10">
                <p className="text-foreground leading-relaxed">
                  To bridge the gap between people and healthcare knowledge, promoting awareness, 
                  healthy living, and informed decisions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Scope Card */}
          <Card className="border-medical-blue/20 shadow-medical hover:shadow-medical-strong transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-medical-blue-light/5">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-medical-blue to-health-green rounded-full flex items-center justify-center mb-4">
                <Telescope className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-medical-blue">Scope</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-medical-blue-light/10 border border-medical-blue/10">
                  <p className="font-semibold text-foreground">Current Focus</p>
                  <p className="text-sm text-muted-foreground">Authentic health resources and tips</p>
                  <p className="text-sm text-muted-foreground">Simple, user-friendly platform</p>
                </div>
                <div className="p-3 rounded-lg bg-health-green-light/10 border border-health-green/10">
                  <p className="font-semibold text-foreground">Future Scope</p>
                  <p className="text-sm text-muted-foreground">AI tools, teleconsultation, and personalized health guidance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-medical-blue/10 to-health-green/10 border border-medical-blue/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join Our Healthcare Revolution
            </h3>
            <p className="text-muted-foreground mb-6">
              Together, we're making healthcare knowledge accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;