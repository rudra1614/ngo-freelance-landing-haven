
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import JobsSearch from '@/components/jobs/JobsSearch';
import JobsTabContent from '@/components/jobs/JobsTabContent';
import { useJobs } from '@/hooks/useJobs';

const Jobs = () => {
  const { 
    filteredJobs, 
    loading, 
    searchQuery, 
    setSearchQuery, 
    getRemoteJobs 
  } = useJobs();
  
  const [currentTab, setCurrentTab] = React.useState('latest');
  const navigate = useNavigate();

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
          <JobsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <Tabs defaultValue="latest" className="w-full" onValueChange={setCurrentTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="latest">Latest added</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="remote">Remote</TabsTrigger>
            </TabsList>
            
            <TabsContent value="latest" className="space-y-6">
              <JobsTabContent 
                jobs={filteredJobs} 
                loading={loading} 
                onSave={handleSaveJob} 
                onApply={handleApplyToJob} 
              />
              
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
              <JobsTabContent 
                jobs={getRemoteJobs()} 
                loading={loading} 
                onSave={handleSaveJob} 
                onApply={handleApplyToJob}
                loadingSkeletonCount={2}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
