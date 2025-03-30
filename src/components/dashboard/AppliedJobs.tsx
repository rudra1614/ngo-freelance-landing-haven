
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, X, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Define a flat application type to avoid deep nesting
interface Application {
  id: string;
  job_id: string;
  status: string;
  created_at: string;
  job_title: string;
  organization_name: string | null;
  job_location: string | null;
}

const fetchApplications = async (): Promise<Application[]> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session?.session?.user) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('applications')
    .select(`
      id,
      job_id,
      status,
      created_at,
      jobs (
        title,
        location,
        organizations (
          name
        )
      )
    `)
    .eq('applicant_id', session.session.user.id);
    
  if (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
  
  // Transform the nested data into a flat structure to avoid circular references
  return (data || []).map(item => ({
    id: item.id,
    job_id: item.job_id,
    status: item.status,
    created_at: item.created_at,
    job_title: item.jobs?.title || 'Unknown',
    organization_name: item.jobs?.organizations?.name || 'Unknown',
    job_location: item.jobs?.location || 'Remote'
  }));
};

const AppliedJobs: React.FC = () => {
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading your applications. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">No job applications yet</h3>
        <p className="text-muted-foreground mb-6">You haven't applied to any jobs yet.</p>
        <Button variant="outline" asChild>
          <a href="/jobs">Browse Jobs</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  {application.organization_name}
                </TableCell>
                <TableCell>{application.job_title}</TableCell>
                <TableCell>{application.job_location}</TableCell>
                <TableCell>
                  {new Date(application.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getStatusIcon(application.status)}
                    <Badge variant="outline" className={`ml-2 ${getStatusColor(application.status)}`}>
                      {application.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/jobs/${application.job_id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobs;
