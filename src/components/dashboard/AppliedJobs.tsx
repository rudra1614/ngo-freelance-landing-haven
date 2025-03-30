
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, FileText, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface Application {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_resume: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  job: {
    title: string;
  } | null;
}

const AppliedJobs = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      // Get the current user's session
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        toast({
          title: 'Authentication Error',
          description: 'You must be logged in to view applications',
          variant: 'destructive',
        });
        return;
      }

      // Get the user's organization
      const { data: organizationData, error: organizationError } = await supabase
        .from('organizations')
        .select('id')
        .eq('user_id', sessionData.session.user.id)
        .single();

      if (organizationError || !organizationData) {
        console.error('Error fetching organization:', organizationError);
        return;
      }

      // Get jobs for this organization
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('id')
        .eq('organization_id', organizationData.id);

      if (jobsError || !jobsData) {
        console.error('Error fetching jobs:', jobsError);
        return;
      }

      // If there are no jobs, return an empty array
      if (jobsData.length === 0) {
        setApplications([]);
        setLoading(false);
        return;
      }

      // Get job IDs
      const jobIds = jobsData.map(job => job.id);

      // Get applications for these jobs
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select(`
          *,
          job:jobs (title)
        `)
        .in('job_id', jobIds)
        .order('created_at', { ascending: false });

      if (applicationsError) {
        console.error('Error fetching applications:', applicationsError);
        return;
      }

      setApplications(applicationsData || []);

    } catch (error) {
      console.error('Error in fetchApplications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load applications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
        <CardDescription>
          Review and manage job applications from candidates
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-20 h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                  <Avatar>
                    <AvatarFallback>{application.applicant_name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{application.applicant_name}</h4>
                    <p className="text-sm text-gray-500">{application.applicant_email}</p>
                    <p className="text-xs text-gray-400">
                      Applied for: {application.job?.title || 'Unknown job'} • {new Date(application.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center space-x-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <Badge variant={application.status === 'pending' ? 'outline' : 
                              application.status === 'reviewing' ? 'secondary' : 
                              application.status === 'approved' ? 'default' : 'destructive'}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {application.applicant_resume && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium">No applications yet</h3>
            <p className="text-muted-foreground mt-2">
              When candidates apply to your jobs, their applications will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppliedJobs;
