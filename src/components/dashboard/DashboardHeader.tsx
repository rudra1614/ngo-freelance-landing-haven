
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, FileCheck } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-6">
              <Home className="h-6 w-6 mr-2" />
              <span className="font-semibold text-lg">NGO Freelancing</span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link to="/dashboard" className="font-medium text-blue-600">Dashboard</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard?tab=applications">
                <FileCheck className="h-4 w-4 mr-2" />
                Applications
              </Link>
            </Button>
            <Button size="sm" variant="ghost">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
