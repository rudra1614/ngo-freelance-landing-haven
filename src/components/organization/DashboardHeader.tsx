
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHeader = () => {
  const [organizationName, setOrganizationName] = useState('Organization');

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

  return (
    <header className="bg-background border-b p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">{organizationName} Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
