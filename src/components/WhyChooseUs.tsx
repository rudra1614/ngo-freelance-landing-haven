
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, HelpCircle, Share2, AwardIcon } from 'lucide-react';

const reasonsData = [
  {
    id: 1,
    icon: <AwardIcon className="h-10 w-10 text-ngo-blue" />,
    title: "NGO works",
    description: "NGO provides certificate"
  },
  {
    id: 2,
    icon: <HelpCircle className="h-10 w-10 text-ngo-blue" />,
    title: "We're here to help",
    description: "Would you say no to somebody who needs help? That's impossible."
  },
  {
    id: 3,
    icon: <Users className="h-10 w-10 text-ngo-blue" />,
    title: "We're a large community",
    description: "Do you know the first thing you need in your career? The people you do the same thing. Find them here"
  },
  {
    id: 4,
    icon: <Share2 className="h-10 w-10 text-ngo-blue" />,
    title: "We're a large community",
    description: "Do you know the first thing you need in your career? The people you do the same thing. Find them here"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-ngo-darkblue text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why choose us</h2>
          <p className="text-gray-300 text-lg">Why not choose us</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasonsData.map((reason) => (
            <div 
              key={reason.id} 
              className="border border-gray-800 p-8 rounded-lg hover:border-ngo-blue transition-colors"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="grid grid-cols-2 grid-rows-2 gap-1">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                  <div className="w-3 h-3 bg-ngo-blue rounded-sm"></div>
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
