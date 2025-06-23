
import React from 'react';
import { Phone, Mail, Copyright } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Section 1: Contact Details */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">N</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Naveen</h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">9876543210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">algotacademy@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 2: Copyright */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Copyright className="h-5 w-5" />
              <span className="text-lg font-semibold">
                {new Date().getFullYear()} Algot Academy
              </span>
            </div>
            <p className="text-sm text-gray-400">
              All rights reserved.
            </p>
          </div>

          {/* Section 3: Education Excellence 2025 */}
          <div className="text-center md:text-right">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              <h3 className="text-xl font-bold">Education Excellence</h3>
              <p className="text-2xl font-bold">2025</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Shaping Future Leaders
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
