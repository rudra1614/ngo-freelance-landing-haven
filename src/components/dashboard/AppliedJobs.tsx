
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ApplicationStatus = 'pending' | 'interview' | 'accepted' | 'rejected';

type JobApplication = {
  id: string;
  job_title: string;
  organization_name: string;
  applied_date: string;
  status: ApplicationStatus;
};

const AppliedJobs = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setLoading(false);
          return;
        }

        // Fetch applications data from Supabase
        const { data, error } = await supabase
          .from('applications')
          .select(`
            id,
            jobs (
              title,
              organizations (
                name
              )
            ),
            created_at,
            status
          `)
          .eq('applicant_id', session.user.id);

        if (error) throw error;

        // Transform data to match the JobApplication type
        const formattedApplications = data.map((app) => ({
          id: app.id,
          job_title: app.jobs?.title || 'Unknown Job',
          organization_name: app.jobs?.organizations?.name || 'Unknown Organization',
          applied_date: new Date(app.created_at).toLocaleDateString(),
          status: (app.status || 'pending') as ApplicationStatus
        }));

        setApplications(formattedApplications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't applied to any jobs yet.</p>
        </div>
      ) : (
        applications.map((application) => (
          <Card key={application.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-2 md:mb-0">
              <h3 className="font-medium">{application.job_title}</h3>
              <p className="text-sm text-gray-500">{application.organization_name}</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <div className="text-sm text-gray-500">Applied: {application.applied_date}</div>
              <Badge 
                className={
                  application.status === 'accepted' ? 'bg-green-500' :
                  application.status === 'rejected' ? 'bg-red-500' :
                  application.status === 'interview' ? 'bg-blue-500' :
                  'bg-yellow-500'
                }
              >
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </Badge>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default AppliedJobs;
