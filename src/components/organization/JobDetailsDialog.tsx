
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Job {
  id: string;
  title: string;
  description: string;
  location: string | null;
  requirements: string | null;
  salary_range: string | null;
  status: string;
  created_at: string;
}

interface JobDetailsDialogProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

interface Application {
  id: string;
  applicant_name: string;
  applicant_email: string;
  status: string;
  created_at: string;
  applicant_resume: string | null;
  notes: string | null;
}

interface ApplicantDetails {
  address?: string;
  contact?: string;
  location?: string;
}

const JobDetailsDialog: React.FC<JobDetailsDialogProps> = ({ job, isOpen, onClose }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!isOpen || !job) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .eq('job_id', job.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setApplications(data || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [job, isOpen]);

  const parseApplicantDetails = (notes: string | null): ApplicantDetails => {
    if (!notes) return {};
    
    try {
      return JSON.parse(notes);
    } catch (e) {
      console.error('Error parsing applicant details:', e);
      return {};
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
          <DialogDescription>
            Posted on {new Date(job.created_at).toLocaleDateString()}
            <Badge className="ml-2" variant={job.status === 'active' ? 'default' : 'secondary'}>
              {job.status}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          <div>
            <h3 className="font-medium mb-1">Description</h3>
            <p className="text-sm text-gray-600">{job.description}</p>
          </div>

          {job.location && (
            <div>
              <h3 className="font-medium mb-1">Location</h3>
              <p className="text-sm text-gray-600">{job.location}</p>
            </div>
          )}

          {job.requirements && (
            <div>
              <h3 className="font-medium mb-1">Requirements</h3>
              <p className="text-sm text-gray-600">{job.requirements}</p>
            </div>
          )}

          {job.salary_range && (
            <div>
              <h3 className="font-medium mb-1">Salary Range</h3>
              <p className="text-sm text-gray-600">{job.salary_range}</p>
            </div>
          )}

          <Separator className="my-2" />

          <div>
            <h3 className="font-medium mb-3">Applications ({applications.length})</h3>
            
            {loading ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : applications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No applications yet</p>
            ) : (
              <div className="overflow-auto max-h-60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Contact</th>
                      <th className="text-left p-2">Location</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => {
                      const details = parseApplicantDetails(app.notes);
                      return (
                        <tr key={app.id} className="border-b">
                          <td className="p-2">{app.applicant_name}</td>
                          <td className="p-2">{app.applicant_email}</td>
                          <td className="p-2">{details.contact || '-'}</td>
                          <td className="p-2">{details.location || '-'}</td>
                          <td className="p-2">
                            <Badge variant={
                              app.status === 'pending' ? 'outline' :
                              app.status === 'approved' ? 'default' :
                              app.status === 'rejected' ? 'destructive' : 'secondary'
                            }>
                              {app.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <details className="text-xs">
                              <summary className="cursor-pointer text-blue-500 hover:text-blue-700">View More</summary>
                              <div className="bg-gray-50 p-2 rounded mt-1">
                                <p><strong>Date Applied:</strong> {new Date(app.created_at).toLocaleDateString()}</p>
                                {details.address && <p><strong>Address:</strong> {details.address}</p>}
                                {app.applicant_resume && (
                                  <p>
                                    <strong>Resume:</strong>{' '}
                                    <a 
                                      href={app.applicant_resume} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-500 hover:underline"
                                    >
                                      View Resume
                                    </a>
                                  </p>
                                )}
                              </div>
                            </details>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
