
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-12 w-full">
      <div className="flex items-center space-x-10">
        <Link to="/" className="text-blue-500 font-bold text-2xl">NGO</Link>
        
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/jobs" className="text-white hover:text-blue-400 transition-colors">Jobs</Link>
          <Link to="/" className="text-white hover:text-blue-400 transition-colors">Support</Link>
          <Link to="/" className="text-white hover:text-blue-400 transition-colors">About</Link>
          <Link to="/" className="text-white hover:text-blue-400 transition-colors">Donate</Link>
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
        
        
        <Link to="/login">
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            I'M A SOCIALWORKER
          </Button>
        </Link>
        
        <Link to="/organization/login">
          <Button className="bg-ngo-blue text-white hover:bg-ngo-blue-dark">
            HIRE SOCIALWORKER
          </Button>
        </Link>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="text-white p-1 h-9 w-9">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-ngo-darkblue text-white pt-12">
            <div className="flex flex-col space-y-6">
              <Link to="/" className="text-white hover:text-blue-400 transition-colors text-lg">Home</Link>
              <Link to="/jobs" className="text-white hover:text-blue-400 transition-colors text-lg">Jobs</Link>
              <Link to="/faqs" className="text-white hover:text-blue-400 transition-colors text-lg">FAQs</Link>
              <Link to="/support" className="text-white hover:text-blue-400 transition-colors text-lg">Support</Link>
              <Link to="/about" className="text-white hover:text-blue-400 transition-colors text-lg">About</Link>
              <div className="pt-4 border-t border-gray-700">
                <Link to="/login">
                  <Button variant="outline" className="w-full mb-3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                    I'M A SOCIALWORKER
                  </Button>
                </Link>
                <Link to="/organization/login">
                  <Button className="w-full bg-ngo-blue text-white hover:bg-ngo-blue-dark">
                    HIRE SOCIALWORKER
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
