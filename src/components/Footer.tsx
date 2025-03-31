
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">NGO Freelancing</h3>
            <p className="text-gray-400 mb-6">
              Connecting passionate social workers with meaningful opportunities to make a difference.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors duration-300">Find Jobs</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link></li>
              <li><Link to="/organization/login" className="text-gray-400 hover:text-white transition-colors duration-300">Organizations</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">VIT Bhopal University, Kothri Kalan, Sehore, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+91 9599912493</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">contact@ngofreelancing.org</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest opportunities.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white border-gray-700 rounded-l-md focus:ring-blue-500 focus:border-blue-500 w-full"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-l-none px-4">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} NGO Freelancing. All rights reserved. Maintained by M.K. Jayanti</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
