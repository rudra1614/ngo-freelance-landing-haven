
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  X, 
  Briefcase, 
  MessageSquare, 
  DownloadCloud,
  FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Application {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_resume: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  job_title?: string;
}

interface Job {
  id: string;
  title: string;
}

interface ApplicationsListProps {
  organizationId: string;
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({ organizationId }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      // First, get all jobs for this organization
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select('id, title')
        .eq('organization_id', organizationId);
      
      if (jobsError) throw jobsError;
      
      if (!jobs || jobs.length === 0) {
        setApplications([]);
        return;
      }
      
      const jobIds = jobs.map(job => job.id);
      
      // Then get applications for these jobs
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .in('job_id', jobIds)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Add job title to each application
      const enhancedApplications = data?.map(app => {
        const job = jobs.find(j => j.id === app.job_id);
        return {
          ...app,
          job_title: job?.title || 'Unknown Job'
        };
      }) || [];
      
      setApplications(enhancedApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load applications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: 'Status updated',
        description: `Application has been ${status}`,
      });

      // Refresh applications list
      fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update application status',
        variant: 'destructive',
      });
    }
  };

  const viewApplicationDetails = (application: Application) => {
    setSelectedApplication(application);
    setNotes(application.notes || '');
    setNewStatus(application.status);
    setIsDetailsOpen(true);
  };

  const saveApplicationChanges = async () => {
    if (!selectedApplication) return;

    try {
      const { error } = await supabase
        .from('applications')
        .update({
          status: newStatus,
          notes: notes
        })
        .eq('id', selectedApplication.id);

      if (error) throw error;

      toast({
        title: 'Changes saved',
        description: 'Application details have been updated',
      });

      setIsDetailsOpen(false);
      fetchApplications();
    } catch (error) {
      console.error('Error saving application changes:', error);
      toast({
        title: 'Error',
        description: 'Failed to save changes',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (organizationId) {
      fetchApplications();
    }
  }, [organizationId]);

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Applications</CardTitle>
              <CardDescription>
                Review and manage applications from social workers
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="filter" className="mr-2">Filter:</Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Applications</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center p-8">
              <h3 className="text-lg font-medium">No applications yet</h3>
              <p className="text-muted-foreground mt-2">
                Once you receive applications, they will appear here
              </p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center p-8">
              <h3 className="text-lg font-medium">No applications match the filter</h3>
              <p className="text-muted-foreground mt-2">
                Try changing the filter to see more applications
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.applicant_name}</div>
                        <div className="text-sm text-muted-foreground">{application.applicant_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{application.job_title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        application.status === 'pending' ? 'outline' :
                        application.status === 'approved' ? 'default' :
                        application.status === 'rejected' ? 'destructive' : 'secondary'
                      }>
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewApplicationDetails(application)}
                          title="View details"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        {application.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => updateApplicationStatus(application.id, 'approved')}
                              title="Approve"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => updateApplicationStatus(application.id, 'rejected')}
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedApplication && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                Review the applicant information and manage their application
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Applicant Name</Label>
                  <Input value={selectedApplication.applicant_name} readOnly />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={selectedApplication.applicant_email} readOnly />
                </div>
              </div>
              
              <div>
                <Label>Job</Label>
                <Input value={selectedApplication.job_title} readOnly />
              </div>
              
              <div>
                <Label>Application Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedApplication.applicant_resume && (
                <div>
                  <Label>Resume</Label>
                  <div className="mt-2">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <DownloadCloud className="h-4 w-4" />
                      <span>Download Resume</span>
                    </Button>
                  </div>
                </div>
              )}
              
              <div>
                <Label>Notes</Label>
                <Textarea
                  placeholder="Add notes about this application..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-24 mt-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveApplicationChanges}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ApplicationsList;
