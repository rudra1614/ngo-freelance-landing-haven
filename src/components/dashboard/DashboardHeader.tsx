
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, FileCheck, Briefcase, LogOut, Bell } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out',
      });
      navigate('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to log out',
        variant: 'destructive',
      });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-6 transition-transform hover:scale-105">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white mr-2">
                <Home className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                NGO Freelancing
              </span>
            </Link>
            <nav className="hidden md:flex space-x-1">
              <Button variant="ghost" size="sm" className="text-blue-600 font-medium hover:bg-blue-50" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 font-medium hover:bg-blue-50" asChild>
                <Link to="/profile">Profile</Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-gray-50">
                  <Avatar className="h-8 w-8 border border-gray-200">
                    <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=John" />
                    <AvatarFallback className="bg-blue-100 text-blue-800">JS</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700 hidden md:inline-block">John Smith</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2">
                <DropdownMenuItem className="cursor-pointer rounded-md" asChild>
                  <Link to="/profile">
                    <User className="h-4 w-4 mr-2" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-md" asChild>
                  <Link to="/dashboard?tab=applications">
                    <FileCheck className="h-4 w-4 mr-2" />
                    <span>Applications</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-md" asChild>
                  <Link to="/dashboard?tab=jobs">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>Browse Jobs</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
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
