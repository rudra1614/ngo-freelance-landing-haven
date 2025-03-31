
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, FileCheck, Briefcase, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out',
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to log out',
        variant: 'destructive',
      });
    }
  };

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
              <Link to="/dashboard?tab=jobs">
                <Briefcase className="h-4 w-4 mr-2" />
                Jobs
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard?tab=applications">
                <FileCheck className="h-4 w-4 mr-2" />
                Applications
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
