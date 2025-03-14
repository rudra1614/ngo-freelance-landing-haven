
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import DashboardSidebar from '@/components/organization/DashboardSidebar';
import DashboardHeader from '@/components/organization/DashboardHeader';
import JobsList from '@/components/organization/JobsList';
import ApplicationsList from '@/components/organization/ApplicationsList';
import CreateJobForm from '@/components/organization/CreateJobForm';

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'create-job'>('jobs');
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/organization/login');
          return;
        }

        // Fetch organization details
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('id')
          .eq('user_id', session.user.id)
          .single();

        if (orgError) {
          console.error('Error fetching organization:', orgError);
          toast({
            title: 'Error',
            description: 'Failed to load organization details',
            variant: 'destructive',
          });
          navigate('/organization/login');
          return;
        }

        setOrganizationId(orgData.id);
        setLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        navigate('/organization/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            {activeTab === 'jobs' && organizationId && (
              <JobsList organizationId={organizationId} />
            )}
            {activeTab === 'applications' && organizationId && (
              <ApplicationsList organizationId={organizationId} />
            )}
            {activeTab === 'create-job' && organizationId && (
              <CreateJobForm organizationId={organizationId} onSuccess={() => setActiveTab('jobs')} />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OrganizationDashboard;
