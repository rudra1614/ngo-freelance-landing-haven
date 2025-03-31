
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
  const [error, setError] = useState<string | null>(null);

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
          .maybeSingle();  // Using maybeSingle instead of single

        if (orgError) {
          console.error('Error fetching organization:', orgError);
          setError('Failed to load organization details');
          return;
        }

        if (!orgData) {
          console.log("No organization found, creating one");
          // Create a default organization if none exists
          const { data: newOrg, error: createError } = await supabase
            .from('organizations')
            .insert([{ 
              user_id: session.user.id,
              name: 'Organization',
              email: session.user.email 
            }])
            .select('id')
            .single();
            
          if (createError) {
            console.error('Error creating organization:', createError);
            setError('Failed to create organization profile');
            toast({
              title: 'Error',
              description: 'Failed to create organization profile',
              variant: 'destructive',
            });
            return;
          }
          
          setOrganizationId(newOrg.id);
        } else {
          setOrganizationId(orgData.id);
        }
        
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

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md text-center">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
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
