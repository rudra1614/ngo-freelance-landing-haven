
import React from 'react';
import { Button } from '@/components/ui/button';

const statsData = [
  {
    id: 1,
    number: "120+",
    description: "Career opportunities"
  },
  {
    id: 2,
    number: "700+",
    description: "SocialWork seekers"
  },
  {
    id: 3,
    number: "100+",
    description: "Remote SocialWork"
  },
  {
    id: 4,
    number: "20+",
    description: "NGO Requirements"
  }
];

const StatsAndPortal = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {statsData.map((stat) => (
            <div key={stat.id} className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">{stat.number}</h3>
              <p className="text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>
        
        {/* Portal Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
            <img 
              src="/lovable-uploads/8fddebe1-92c0-454b-b961-14f0d61e901a.png" 
              alt="Laptop with analytics" 
              className="rounded-lg shadow-md"
            />
            <img 
              src="/lovable-uploads/269ac07b-e196-4298-87ef-3692b050c1bb.png" 
              alt="Person writing notes" 
              className="rounded-lg shadow-md"
            />
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=512" 
              alt="Documents with charts" 
              className="rounded-lg shadow-md"
            />
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=512" 
              alt="Person at a whiteboard" 
              className="rounded-lg shadow-md"
            />
          </div>
          
          <div className="w-full md:w-1/2 md:pl-6">
            <h2 className="text-4xl font-bold mb-6">All social gigs, one portal</h2>
            <p className="text-lg text-gray-700 mb-8">
              Whatever you are, a social worker, an NGO owner we got you. We have all types of social works ready for you.
            </p>
            <Button size="lg" className="bg-ngo-blue hover:bg-ngo-blue-dark text-white" >
              Show me all available SocialWork
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsAndPortal;
