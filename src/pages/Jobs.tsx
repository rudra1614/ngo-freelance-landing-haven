
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/jobs/JobCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Card, CardContent } from '@/components/ui/card';
import { SearchIcon, MapPinIcon, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Job {
  id: string;
  title: string;
  organization_id: string;
  location: string | null;
  salary_range: string | null;
  requirements: string | null;
  description: string;
  organization: {
    name: string;
  } | null;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('latest');
  const [jobCount, setJobCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [currentTab]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.organization?.name && job.organization.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('jobs')
        .select(`
          *,
          organization:organizations (name)
        `)
        .eq('status', 'active');
      
      // Apply different sorting/filtering based on tab
      if (currentTab === 'latest') {
        query = query.order('created_at', { ascending: false });
      } else if (currentTab === 'remote') {
        query = query.ilike('location', '%remote%').order('created_at', { ascending: false });
      }
      
      const { data, error } = await query;

      if (error) {
        throw error;
      }

      console.log('Fetched jobs:', data);
      setJobs(data || []);
      setFilteredJobs(data || []);
      setJobCount(data?.length || 0);
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

  const handleSaveJob = (jobId: string) => {
    // Would normally save to user's saved jobs
    toast({
      title: 'Job saved',
      description: 'This job has been saved to your profile',
    });
  };

  const handleApplyToJob = async (jobId: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to apply for jobs',
          variant: 'destructive',
        });
        navigate('/login');
        return;
      }
      
      // Navigate to the job details page or directly apply
      navigate(`/jobs/${jobId}`);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-ngo-darkblue flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Find Your Opportunity</h1>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search jobs by title, organization or location..."
                className="pl-10 py-6 pr-4 rounded-md w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-gray-200 text-gray-800 font-normal flex items-center">
              <span className="font-bold mr-1">{jobCount}</span> jobs available
            </Badge>
          </div>

          <Tabs defaultValue="latest" className="w-full" onValueChange={setCurrentTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="latest">Latest added</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="remote">Remote</TabsTrigger>
            </TabsList>
            
            <TabsContent value="latest" className="space-y-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((_, index) => (
                    <Card key={index} className="h-64">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <div className="ml-3">
                              <Skeleton className="h-5 w-40 mb-1" />
                              <Skeleton className="h-4 w-20" />
                            </div>
                          </div>
                        </div>
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-4 w-5/6 mb-6" />
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-8 w-20 rounded-full" />
                          <Skeleton className="h-8 w-24 rounded-full" />
                          <Skeleton className="h-8 w-32 rounded-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <div key={job.id} onClick={() => handleApplyToJob(job.id)} className="cursor-pointer">
                      <JobCard 
                        job={job} 
                        onSave={() => handleSaveJob(job.id)} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium">No jobs found</h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search criteria or check back later
                  </p>
                </div>
              )}
              
              {filteredJobs.length > 0 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </TabsContent>
            
            <TabsContent value="popular">
              <div className="text-center py-12">
                <h3 className="text-xl font-medium">Popular jobs coming soon</h3>
                <p className="text-gray-500 mt-2">
                  Check back later for popular job listings
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="remote">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                  {[1, 2].map((_, index) => (
                    <Card key={index} className="h-64">
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-1/2 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-10 w-full mt-auto" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <div key={job.id} onClick={() => handleApplyToJob(job.id)} className="cursor-pointer">
                      <JobCard 
                        job={job} 
                        onSave={() => handleSaveJob(job.id)} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium">No remote jobs found</h3>
                  <p className="text-gray-500 mt-2">
                    Check back later for remote job opportunities
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
