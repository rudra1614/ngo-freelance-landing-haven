
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface JobsLoadingProps {
  count?: number;
}

const JobsLoading: React.FC<JobsLoadingProps> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="h-64 animate-pulse">
          <CardContent className="p-6">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full mt-auto"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobsLoading;
