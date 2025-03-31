
import React from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

interface JobsSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const JobsSearch: React.FC<JobsSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
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
  );
};

export default JobsSearch;
