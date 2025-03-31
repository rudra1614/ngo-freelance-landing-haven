
import React from 'react';
import JobCard from '@/components/jobs/JobCard';

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

interface JobsGridProps {
  jobs: Job[];
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
}

const JobsGrid: React.FC<JobsGridProps> = ({ jobs, onApply, onSave }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No jobs found</h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your search criteria or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <div key={job.id} onClick={() => onApply(job.id)} className="cursor-pointer">
          <JobCard 
            job={job} 
            onSave={() => onSave(job.id)} 
          />
        </div>
      ))}
    </div>
  );
};

export default JobsGrid;
