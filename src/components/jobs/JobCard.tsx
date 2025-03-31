
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, MapPinIcon, BriefcaseIcon, DollarSignIcon } from 'lucide-react';

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

interface JobCardProps {
  job: Job;
  onSave: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSave }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3 overflow-hidden">
              <BriefcaseIcon className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{job.organization?.name || 'Organization'}</h3>
              <p className="text-gray-500 text-sm">{job.location || 'Location not specified'}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
          >
            <BookmarkIcon className="h-5 w-5 text-blue-500" />
            <span className="sr-only">Save</span>
          </Button>
        </div>
        
        <h2 className="text-xl font-bold mb-2">{job.title}</h2>
        
        <div className="space-y-4 mb-4">
          <p className="text-gray-600">
            {job.description 
              ? truncateText(job.description, 150)
              : job.requirements 
                ? truncateText(job.requirements, 150)
                : "Job description not available."}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
            <MapPinIcon className="h-4 w-4 mr-1 text-gray-500" />
            <span>{job.location || 'Remote'}</span>
          </div>
          <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
            <BriefcaseIcon className="h-4 w-4 mr-1 text-gray-500" />
            <span>Full-time</span>
          </div>
          {job.salary_range && (
            <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
              <DollarSignIcon className="h-4 w-4 mr-1 text-gray-500" />
              <span>{job.salary_range}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
