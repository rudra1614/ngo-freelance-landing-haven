
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 bg-ngo-darkblue/95 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
    }`}>
      <div className="flex items-center justify-between px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="flex items-center space-x-10">
          <Link to="/" className="text-blue-400 font-bold text-2xl hover-lift">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">NGO</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-white hover:text-blue-400 transition-colors relative ${isActive('/') ? 'text-blue-400' : ''}`}
            >
              <span>Home</span>
              {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 mt-0.5"></span>}
            </Link>
            <Link 
              to="/support" 
              className={`text-white hover:text-blue-400 transition-colors relative ${isActive('/support') ? 'text-blue-400' : ''}`}
            >
              <span>Support</span>
              {isActive('/support') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 mt-0.5"></span>}
            </Link>
            <Link 
              to="/about" 
              className={`text-white hover:text-blue-400 transition-colors relative ${isActive('/about') ? 'text-blue-400' : ''}`}
            >
              <span>About</span>
              {isActive('/about') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 mt-0.5"></span>}
            </Link>
            <Link 
              to="/" 
              className="text-white hover:text-blue-400 transition-colors relative"
            >
              <span>Donate</span>
            </Link>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all hover-lift">
              I'M A SOCIALWORKER
            </Button>
          </Link>
          
          <Link to="/organization/login">
            <Button className="bg-ngo-blue text-white hover:bg-ngo-blue-dark transition-all hover-lift">
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
      </div>
    </nav>
  );
};

export default Navbar;
