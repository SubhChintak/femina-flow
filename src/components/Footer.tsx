
import { Link } from "react-router-dom";
import { Mail, Phone, Heart, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/period-tracker", label: "Period Tracker" },
    { to: "/symptoms", label: "Symptoms" },
    { to: "/pregnancy", label: "Pregnancy" },
    { to: "/insights", label: "Health Insights" },
  ];

  const supportLinks = [
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Service" },
    { to: "/help", label: "Help Center" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="bg-gradient-to-br from-femina-900 to-blush-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-bold font-playfair">
                Femina<span className="text-pink-300">Flow</span>
              </h3>
            </div>
            <p className="text-pink-100 leading-relaxed font-lora">
              Your intelligent companion for menstrual health, fertility tracking, and wellness insights. 
              Empowering women with personalized care.
            </p>
            <div className="flex items-center space-x-2 text-pink-200">
              <Heart size={16} className="text-pink-300" />
              <span className="text-sm font-opensans">Made with love for women's health</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-200 font-lora">Quick Links</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-pink-100 hover:text-white transition-colors duration-300 font-opensans hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-200 font-lora">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-pink-100 hover:text-white transition-colors duration-300 font-opensans hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-200 font-lora">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-pink-300 flex-shrink-0" />
                <a
                  href="mailto:support@feminaflow.com"
                  className="text-pink-100 hover:text-white transition-colors duration-300 font-opensans"
                >
                  support@feminaflow.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-pink-300 flex-shrink-0" />
                <a
                  href="tel:+1-800-FEMINA"
                  className="text-pink-100 hover:text-white transition-colors duration-300 font-opensans"
                >
                  +91 8131 123 456
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-pink-300 flex-shrink-0 mt-1" />
                <span className="text-pink-100 font-opensans">
                  {/* Women's Health Center<br /> */}
                  Agartala, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pink-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-pink-200 font-opensans">
                © {currentYear} FeminaFlow. All rights reserved.
              </p>
            </div>

            {/* Designed & Developed By */}
            <div className="text-center md:text-right">
              <p className="text-pink-200 font-opensans">
                Designed & Developed by <span className="font-semibold font-playfair text-xl">subhchintak.in</span>
                {/* with{" "}
                <Heart size={14} className="inline text-pink-300 mx-1" /> */}
               
              </p>
            </div>
          </div>
        </div>

        {/* Health Disclaimer */}
        <div className="mt-8 pt-6 border-t border-pink-800/30">
          <div className="bg-pink-800/20 rounded-xl p-4">
            <p className="text-xs text-pink-200 text-center leading-relaxed font-opensans">
              <strong>Health Disclaimer:</strong> FeminaFlow is designed for educational and informational purposes only. 
              This app is not intended to replace professional medical advice, diagnosis, or treatment. 
              Always consult with qualified healthcare providers regarding your health concerns.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;