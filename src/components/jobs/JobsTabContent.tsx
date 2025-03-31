
import React from 'react';
import JobsGrid from './JobsGrid';
import JobsLoading from './JobsLoading';
import { AlertCircle } from 'lucide-react';

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

interface JobsTabContentProps {
  jobs: Job[];
  loading: boolean;
  onSave: (jobId: string) => void;
  onApply: (jobId: string) => void;
  loadingSkeletonCount?: number;
}

const JobsTabContent: React.FC<JobsTabContentProps> = ({ 
  jobs, 
  loading, 
  onSave, 
  onApply,
  loadingSkeletonCount = 4 
}) => {
  return (
    <div className="space-y-6">
      {loading ? (
        <JobsLoading count={loadingSkeletonCount} />
      ) : jobs.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500">
            There are currently no jobs available in this category.
            Please check back later or try another category.
          </p>
        </div>
      ) : (
        <JobsGrid jobs={jobs} onSave={onSave} onApply={onApply} />
      )}
    </div>
  );
};

export default JobsTabContent;
