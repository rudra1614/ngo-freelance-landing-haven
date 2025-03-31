
import React from 'react';
import JobsGrid from './JobsGrid';
import JobsLoading from './JobsLoading';

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
      ) : (
        <JobsGrid jobs={jobs} onSave={onSave} onApply={onApply} />
      )}
    </div>
  );
};

export default JobsTabContent;
