
import React from 'react';
import { CircleUser, FileSearch, Handshake, Award } from 'lucide-react';

const steps = [
  {
    icon: <CircleUser className="h-12 w-12 text-blue-600" />,
    title: "Create Profile",
    description: "Sign up and create your detailed profile highlighting your skills and experience."
  },
  {
    icon: <FileSearch className="h-12 w-12 text-blue-600" />,
    title: "Find Opportunities",
    description: "Browse through various NGO projects and opportunities that match your interests."
  },
  {
    icon: <Handshake className="h-12 w-12 text-blue-600" />,
    title: "Connect & Collaborate",
    description: "Apply for positions and connect directly with organizations in need."
  },
  {
    icon: <Award className="h-12 w-12 text-blue-600" />,
    title: "Make an Impact",
    description: "Contribute to meaningful projects and make a real difference in communities."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500 rounded-full opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white">
          <span className="relative inline-block">
            How It Works
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-blue-500 rounded-full"></span>
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center hover-lift transition-all p-6 rounded-xl hover:bg-white/5"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-full mb-6 shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">{step.title}</h3>
              <p className="text-blue-100">{step.description}</p>
              
              {/* Connection line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-1/4 w-3/4 h-0.5 bg-blue-800 transform -translate-y-1/2" 
                     style={{ left: `${(index + 1) * 25 - 12.5}%`, width: '25%' }}>
                </div>
              )}
              
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
