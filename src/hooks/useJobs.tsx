
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface Job {
  id: string;
  title: string;
  organization_id: string;
  description: string;
  location: string | null;
  salary_range: string | null;
  requirements: string | null;
  organization: {
    name: string;
  } | null;
}

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.organization?.name && job.organization.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.description && job.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      // Fetch all active jobs with their organization information
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          organization:organizations (name)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      console.log('Fetched jobs from useJobs hook:', data);
      
      if (data && data.length > 0) {
        setJobs(data);
        setFilteredJobs(data);
      } else {
        console.log('No active jobs found, trying to fetch all jobs');
        // If no active jobs found, fetch all jobs (for development purposes)
        const { data: allJobs, error: allJobsError } = await supabase
          .from('jobs')
          .select(`
            *,
            organization:organizations (name)
          `)
          .order('created_at', { ascending: false });
        
        if (allJobsError) throw allJobsError;
        
        console.log('Fetched all jobs:', allJobs);
        setJobs(allJobs || []);
        setFilteredJobs(allJobs || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load jobs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getRemoteJobs = () => {
    return jobs.filter(job => 
      job.location?.toLowerCase().includes('remote') || 
      !job.location || 
      job.location.trim() === ''
    );
  };

  return {
    jobs,
    filteredJobs,
    loading,
    searchQuery,
    setSearchQuery,
    getRemoteJobs
  };
};
