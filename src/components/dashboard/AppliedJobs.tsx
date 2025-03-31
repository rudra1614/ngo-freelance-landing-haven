
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

// Separate type definitions to avoid circular references
interface JobDetails {
  id: string;
  title: string;
  organization_id: string;
  description: string;
  requirements: string | null;
  location: string | null;
  salary_range: string | null;
  status: string;
  created_at: string;
}

interface OrganizationDetails {
  id: string;
  name: string;
}

interface ApplicationData {
  id: string;
  user_id: string;
  job_id: string;
  status: string;
  created_at: string;
  job: JobDetails | null;
  organization: OrganizationDetails | null;
}

const AppliedJobs = () => {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data, error } = await supabase
            .from('applications')
            .select(`
              *,
              job:jobs (*),
              organization:organizations (id, name)
            `)
            .eq('user_id', session.user.id);
            
          if (error) {
            throw error;
          }
          
          setApplications(data || []);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your applications',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, []);

  const withdrawApplication = async (applicationId: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId);
        
      if (error) {
        throw error;
      }
      
      setApplications(applications.filter(app => app.id !== applicationId));
      
      toast({
        title: 'Application withdrawn',
        description: 'Your application has been successfully withdrawn.',
      });
    } catch (error) {
      console.error('Error withdrawing application:', error);
      toast({
        title: 'Error',
        description: 'Failed to withdraw your application',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="border rounded-md">
          <div className="p-4 border-b bg-muted/30">
            <Skeleton className="h-6 w-full" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 flex justify-between items-center border-b">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-9 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Your Applications</h3>
      {applications.length === 0 ? (
        <div className="bg-muted/30 p-6 text-center rounded-md border">
          <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    {application.job?.title || 'Deleted Job'}
                  </TableCell>
                  <TableCell>
                    {application.organization?.name || 'Unknown'}
                  </TableCell>
                  <TableCell>
                    {new Date(application.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        application.status === 'pending' ? 'outline' : 
                        application.status === 'accepted' ? 'success' : 
                        application.status === 'rejected' ? 'destructive' : 
                        'default'
                      }
                    >
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          // View application details
                          toast({
                            title: 'View Application',
                            description: 'Application details view is not implemented yet.',
                          });
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {application.status === 'pending' && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => withdrawApplication(application.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
