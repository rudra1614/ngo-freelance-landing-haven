
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Bell, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [organizationName, setOrganizationName] = useState('Organization');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data, error } = await supabase
            .from('organizations')
            .select('name')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (data && !error) {
            setOrganizationName(data.name);
          } else if (error) {
            console.error('Error fetching organization details:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching organization details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationDetails();
  }, []);

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
      navigate('/organization/login');
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
    <header className="bg-background border-b p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <Home className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              `${organizationName} Dashboard`
            )}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
