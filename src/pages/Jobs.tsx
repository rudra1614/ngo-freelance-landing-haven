
import React, { useState } from 'react';
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
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Jobs = () => {
  const { 
    filteredJobs, 
    loading, 
    error,
    searchQuery, 
    setSearchQuery, 
    getRemoteJobs,
    refreshJobs 
  } = useJobs();
  
  const [currentTab, setCurrentTab] = useState('latest');
  const navigate = useNavigate();

  // Handle saving a job (would be connected to user's profile)
  const handleSaveJob = (jobId: string) => {
    toast({
      title: 'Job saved',
      description: 'This job has been saved to your profile',
    });
  };

  // Handle applying to a job - redirects to job details or login
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
      
      // Navigate to the job details page
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

  // Handle refreshing jobs data
  const handleRefresh = () => {
    refreshJobs();
    toast({
      title: 'Jobs refreshed',
      description: 'The latest job listings have been loaded',
    });
  };

  return (
    <div className="min-h-screen bg-ngo-darkblue flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <JobsSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onRefresh={handleRefresh}
          />

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
