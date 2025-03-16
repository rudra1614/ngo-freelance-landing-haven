
import React from 'react';
import { CircleUser, FileSearch, Handshake, Award } from 'lucide-react';

const steps = [
  {
    icon: <CircleUser className="h-12 w-12 text-ngo-white" />,
    title: "Create Profile",
    description: "Sign up and create your detailed profile highlighting your skills and experience."
  },
  {
    icon: <FileSearch className="h-12 w-12 text-ngo-white" />,
    title: "Find Opportunities",
    description: "Browse through various NGO projects and opportunities that match your interests."
  },
  {
    icon: <Handshake className="h-12 w-12 text-ngo-white" />,
    title: "Connect & Collaborate",
    description: "Apply for positions and connect directly with organizations in need."
  },
  {
    icon: <Award className="h-12 w-12 text-ngo-white" />,
    title: "Make an Impact",
    description: "Contribute to meaningful projects and make a real difference in communities."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-16 text-white">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-6 rounded-full mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-white-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
