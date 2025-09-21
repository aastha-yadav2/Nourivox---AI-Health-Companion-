import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import nourivoxLogo from "@/assets/nourivox-logo.png";
import robotGif from "@/assets/Futuristic_Robot_Welcomes_With_Namaste.gif";
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-white via-medical-blue-light to-health-green-light py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-8">
              <img 
                src={nourivoxLogo} 
                alt="Nourivox - A voice that nurtures your health" 
                className="h-20 w-auto animate-fade-in hover-scale"
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in">
              {t('hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/chat">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto group">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t('hero.startChat')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
                {t('hero.learnMore')}
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">{t('hero.trustedBy')}</p>
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span className="font-semibold text-medical-blue mr-1">24/7</span>
                  {t('hero.available247')}
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-health-green mr-1">HIPAA</span>
                  {t('hero.hipaaCompliant')}
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-medical-blue mr-1">AI+</span>
                  {t('hero.aiDoctors')}
                </div>
              </div>
            </div>
          </div>
{/* Hero GIF */}
<div className="relative flex justify-center lg:justify-end">
  <img 
    src={robotGif} 
    alt="Futuristic Robot Welcomes With Namaste" 
    className="rounded-2xl shadow-[0_20px_60px_rgba(0,123,255,0.35)] border border-blue-300/20"
    style={{ 
      height: "450px", 
      width: "auto", 
      boxShadow: "0 20px 60px rgba(0, 123, 255, 0.35), 0 0 30px rgba(0, 255, 200, 0.25)" 
    }}
  />
  
  {/* Background glow / highlight */}
  <div className="absolute inset-0 rounded-3xl -z-10 
                  bg-gradient-to-r from-blue-300/20 to-teal-300/20 
                  blur-3xl transform scale-110">
  </div>
</div>


        </div>
      </div>
    </section>
  );
};

export default HeroSection;
