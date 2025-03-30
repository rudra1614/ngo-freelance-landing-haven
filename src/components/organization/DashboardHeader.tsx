
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const DashboardHeader = () => {
  const [organizationName, setOrganizationName] = useState('Organization');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data, error } = await supabase
            .from('organizations')
            .select('name')
            .eq('user_id', session.user.id)
            .single();

          if (data && !error) {
            setOrganizationName(data.name);
          }
        }
      } catch (error) {
        console.error('Error fetching organization details:', error);
      }
    };

    fetchOrganizationDetails();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      navigate('/organization/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="bg-background border-b p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">{organizationName} Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
