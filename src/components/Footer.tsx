
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Dumbbell } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-fdgym-dark-gray/50 border-t border-fdgym-dark-gray">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Dumbbell className="h-8 w-8 text-fdgym-red" />
              <span className="font-orbitron text-xl font-bold text-white">FD <span className="text-fdgym-red">GYM</span></span>
            </Link>
            <p className="text-fdgym-light-gray text-sm">
              Premium fitness experience with cutting-edge equipment, expert trainers, and personalized programs to help you achieve your fitness goals.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-fdgym-light-gray hover:text-fdgym-neon-red">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-fdgym-light-gray hover:text-fdgym-neon-red">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-fdgym-light-gray hover:text-fdgym-neon-red">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-fdgym-light-gray hover:text-fdgym-neon-red">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-fdgym-light-gray hover:text-fdgym-neon-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-fdgym-light-gray hover:text-fdgym-neon-red transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/workouts" className="text-fdgym-light-gray hover:text-fdgym-neon-red transition-colors">
                  Workouts
                </Link>
              </li>
              <li>
                <Link to="/bmi" className="text-fdgym-light-gray hover:text-fdgym-neon-red transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/partner-gyms" className="text-fdgym-light-gray hover:text-fdgym-neon-red transition-colors">
                  Partner Gyms
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Subscription Plans */}
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4">Subscription Plans</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-fdgym-light-gray hover:text-fdgym-neon-red transition-colors">
                  1 Month Plan
                </a>
              </li>
              <li>
                <a href="#" className="text-fdgym-light-gray hover:text-fdgym-neon-red transition-colors">
                  3 Months Plan
                </a>
              </li>
              <li>
                <a href="#" className="text-fdgym-light-gray hover:text-fdgym-neon-red transition-colors">
                  6 Months Plan
                </a>
              </li>
              <li>
                <a href="#" className="text-fdgym-light-gray hover:text-fdgym-neon-red transition-colors">
                  12 Months Plan
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-fdgym-light-gray">
              <p>123 Fitness Street</p>
              <p>New Delhi, India 110001</p>
              <p className="mt-2">Phone: +91 98765 43210</p>
              <p>Email: info@fdgym.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-fdgym-dark-gray mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-fdgym-light-gray text-sm">
            &copy; {currentYear} FD GYM. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-fdgym-light-gray hover:text-fdgym-neon-red text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-fdgym-light-gray hover:text-fdgym-neon-red text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
