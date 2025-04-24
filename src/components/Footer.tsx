
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & Mission */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold text-brand">QuickEat</h3>
            <p className="text-gray-300">
              Delivering the best food experience right to your doorstep, any time, anywhere.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" aria-label="Facebook" className="hover:text-brand transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-brand transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-brand transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-brand transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-gray-300 hover:text-brand transition-colors">Browse Restaurants</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brand transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-brand transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-300">support@quickeat.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="flex-shrink-0 mt-1" />
                <span className="text-gray-300">123 Delivery St, Food City, FC 12345</span>
              </li>
            </ul>
          </div>
          
          {/* Business Hours */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Hours</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Mon-Fri: 8:00 AM - 10:00 PM</li>
              <li className="text-gray-300">Saturday: 9:00 AM - 11:00 PM</li>
              <li className="text-gray-300">Sunday: 10:00 AM - 9:00 PM</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between space-y-4 md:space-y-0 md:flex-row">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} QuickEat. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-brand transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-brand transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
