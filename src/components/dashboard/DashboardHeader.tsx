
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, Briefcase } from 'lucide-react';

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
              <Link to="/jobs" className="font-medium text-gray-500 hover:text-gray-900">Jobs</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/jobs">
                <Briefcase className="h-4 w-4 mr-2" />
                Browse Jobs
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
