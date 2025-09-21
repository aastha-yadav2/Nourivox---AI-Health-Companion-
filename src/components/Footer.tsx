import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-medical-blue to-health-green p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">HealthChat AI</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transforming healthcare through AI-powered assistance and seamless doctor consultations.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-medical-blue/20 rounded-lg flex items-center justify-center hover:bg-medical-blue/30 transition-colors cursor-pointer">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-medical-blue/20 rounded-lg flex items-center justify-center hover:bg-medical-blue/30 transition-colors cursor-pointer">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-medical-blue/20 rounded-lg flex items-center justify-center hover:bg-medical-blue/30 transition-colors cursor-pointer">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-medical-blue transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-blue transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-blue transition-colors">Our Doctors</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-blue transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-blue transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-health-green transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-health-green transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-health-green transition-colors">HIPAA Compliance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-health-green transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-health-green transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-medical-blue" />
                <span className="text-gray-300">1-800-HEALTH-AI</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-health-green" />
                <span className="text-gray-300">support@healthchat.ai</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-medical-blue" />
                <span className="text-gray-300">Available 24/7 Worldwide</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-medical-blue/20 to-health-green/20 rounded-lg p-4 mt-6">
              <p className="text-sm text-gray-300 mb-2">Emergency?</p>
              <p className="text-white font-semibold">Call 911 or your local emergency number</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 HealthChat AI. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Not a replacement for professional medical advice. Always consult your doctor.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;