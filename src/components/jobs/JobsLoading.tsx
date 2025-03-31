
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface JobsLoadingProps {
  count?: number;
  variant?: 'detailed' | 'compact';
}

const JobsLoading: React.FC<JobsLoadingProps> = ({ 
  count = 4, 
  variant = 'detailed' 
}) => {
  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="h-40 animate-pulse">
            <CardContent className="p-4">
              <div className="flex gap-2 mb-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-3 w-3/4 rounded" />
                  <Skeleton className="h-2 w-1/2 rounded" />
                </div>
              </div>
              <Skeleton className="h-4 w-4/5 rounded mb-3" />
              <div className="flex gap-1">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="h-64 animate-pulse">
          <CardContent className="p-6">
            <div className="flex gap-3 mb-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            </div>
            <Skeleton className="h-6 w-3/4 mb-4 rounded" />
            <Skeleton className="h-4 w-full mb-2 rounded" />
            <Skeleton className="h-4 w-5/6 mb-4 rounded" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobsLoading;
