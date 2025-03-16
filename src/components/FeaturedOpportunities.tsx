
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Users } from 'lucide-react';

const opportunitiesData = [
  {
    id: 1,
    title: "Community Garden Coordinator",
    organization: "GreenSpace Initiative",
    location: "Mumbai, India",
    type: "On-site",
    duration: "3 months",
    volunteers: 5,
  },
  {
    id: 2,
    title: "Children's Education Specialist",
    organization: "Education For All",
    location: "Remote",
    type: "Remote",
    duration: "6 months",
    volunteers: 2,
  },
  {
    id: 3,
    title: "Disaster Relief Volunteer",
    organization: "Global Relief Network",
    location: "Mizoram",
    type: "On-site",
    duration: "1 month",
    volunteers: 12,
  }
];

/*
const FeaturedOpportunities = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Opportunities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {opportunitiesData.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{opportunity.title}</CardTitle>
                <CardDescription>{opportunity.organization}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{opportunity.location} ({opportunity.type})</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{opportunity.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{opportunity.volunteers} volunteers needed</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="px-8">Browse All Opportunities</Button>
        </div>
      </div>
    </section>
  );
};
*/

export default FeaturedOpportunities;
