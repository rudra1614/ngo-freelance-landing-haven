
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-12 w-full">
      <div className="flex items-center space-x-10">
        <Link to="/" className="text-blue-500 font-bold text-2xl">NGO</Link>
        
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/jobs" className="text-white hover:text-blue-400 transition-colors">Jobs</Link>
          <Link to="/faqs" className="text-white hover:text-blue-400 transition-colors">FAQs</Link>
          <Link to="/support" className="text-white hover:text-blue-400 transition-colors">Support</Link>
          <Link to="/about" className="text-white hover:text-blue-400 transition-colors">About</Link>
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative w-[400px]">
          <Input 
            type="text" 
            placeholder="Search" 
            className="pl-3 pr-10 py-2 rounded-md bg-white text-black w-full"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        </div>
        
        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
          I'M A SOCIALWORKER
        </Button>
        
        <Button className="bg-ngo-blue text-white hover:bg-ngo-blue-dark">
          HIRE SOCIALWORKER
        </Button>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <Button variant="ghost" className="text-white">
          ☰
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
