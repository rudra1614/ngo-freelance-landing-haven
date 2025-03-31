
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { CircleCheck, FileClock, FileX, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Simplified non-circular type definitions
interface JobData {
  id: string;
  title: string;
  description: string;
  location: string | null;
  organization_id: string;
}

interface OrganizationData {
  id: string;
  name: string;
}

interface ApplicationData {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_resume: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  job: JobData;
  organization: OrganizationData;
}

const AppliedJobs = () => {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const { data: session } = await supabase.auth.getSession();
        
        if (!session?.session?.user) {
          setError('You must be logged in to view applications');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('applications')
          .select(`
            *,
            job:jobs(*),
            organization:jobs(organization_id(id, name))
          `)
          .eq('applicant_email', session.session.user.email);

        if (error) {
          throw error;
        }

        // Transform data to match our ApplicationData structure
        const formattedData = data.map((item: any) => ({
          ...item,
          job: item.job,
          organization: {
            id: item.job.organization_id,
            name: item.organization?.[0]?.name || 'Unknown Organization'
          }
        }));

        setApplications(formattedData);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching applications:', error);
        setError(error.message || 'Failed to load applications');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center p-8">
        <FileClock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No applications yet</h3>
        <p className="text-gray-500">
          You haven't applied to any jobs. Browse available opportunities and submit your first application.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Applications</CardTitle>
        <CardDescription>
          Track all your job applications and their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.job?.title || 'Unknown Job'}</TableCell>
                <TableCell>{application.organization?.name || 'Unknown Organization'}</TableCell>
                <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AppliedJobs;
