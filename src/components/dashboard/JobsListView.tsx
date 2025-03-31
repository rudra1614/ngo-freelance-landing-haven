
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, DollarSign, ArrowRight, Loader2, SendIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import JobCard from '@/components/jobs/JobCard';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Organization {
  id: string;
  name: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  location: string | null;
  requirements: string | null;
  salary_range: string | null;
  status: string;
  created_at: string;
  organization: Organization | null;
  organization_id: string;
}

const JobsListView = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            *,
            organization:organizations(id, name)
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Transform the data to match our Job interface
        const formattedJobs = data.map((item: any) => ({
          ...item,
          organization: item.organization
        }));

        setJobs(formattedJobs);
      } catch (error: any) {
        console.error('Error fetching jobs:', error);
        setError(error.message || 'Failed to load jobs');
        toast({
          title: 'Error',
          description: 'Failed to load jobs',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId: string) => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error || !user) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to apply for jobs',
          variant: 'destructive',
        });
        navigate('/login');
        return;
      }
      
      // Set selected job and open the dialog
      setSelectedJobId(jobId);
      setResumeUrl('');
      setApplyDialogOpen(true);
    }).catch(error => {
      console.error('Error checking authentication:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify authentication status',
        variant: 'destructive',
      });
    });
  };

  const submitApplication = async () => {
    if (!selectedJobId) return;
    
    try {
      setIsSubmitting(true);
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to apply for jobs',
          variant: 'destructive',
        });
        navigate('/login');
        return;
      }
      
      // Check if user has already applied
      const { data: existingApplications, error: checkError } = await supabase
        .from('applications')
        .select('*')
        .eq('job_id', selectedJobId)
        .eq('applicant_email', user.email);
      
      if (checkError) throw checkError;
      
      if (existingApplications && existingApplications.length > 0) {
        toast({
          title: 'Already applied',
          description: 'You have already applied for this job',
        });
        setApplyDialogOpen(false);
        return;
      }
      
      // Submit application with resume URL
      const { error: applyError } = await supabase
        .from('applications')
        .insert({
          job_id: selectedJobId,
          applicant_email: user.email || '',
          applicant_name: user.user_metadata?.full_name || 'Anonymous',
          applicant_resume: resumeUrl,
          status: 'pending'
        });
      
      if (applyError) throw applyError;
      
      toast({
        title: 'Application submitted',
        description: 'Your job application has been submitted successfully',
      });
      setApplyDialogOpen(false);
    } catch (error: any) {
      console.error('Error applying for job:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to apply for this job',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveJob = (jobId: string) => {
    toast({
      title: 'Job saved',
      description: 'The job has been saved to your bookmarks',
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="ml-3">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24 mt-2" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex flex-wrap gap-2 mt-4">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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

  if (jobs.length === 0) {
    return (
      <div className="text-center p-8">
        <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Jobs Available</h3>
        <p className="text-gray-500 mb-4">
          There are currently no job listings available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Available Jobs</h2>
      </div>
      
      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                    <Briefcase className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{job.organization?.name || 'Organization'}</h3>
                    <p className="text-gray-500 text-sm">{job.location || 'Location not specified'}</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              
              <div className="space-y-4 mb-4">
                <p className="text-gray-600">
                  {truncateText(job.description, 150)}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {job.location && (
                  <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                )}
                <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                  <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
                  <span>Full-time</span>
                </div>
                {job.salary_range && (
                  <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                    <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{job.salary_range}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => handleSaveJob(job.id)}
                >
                  Save
                </Button>
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => handleApply(job.id)}
                >
                  Apply Now
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resume URL Dialog */}
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Submit your application</DialogTitle>
            <DialogDescription>
              Please provide a URL to your resume to complete your application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume-url" className="col-span-4">
                Resume URL
              </Label>
              <Input
                id="resume-url"
                placeholder="https://example.com/my-resume.pdf"
                className="col-span-4"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={submitApplication}
              disabled={!resumeUrl.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export default JobsListView;
