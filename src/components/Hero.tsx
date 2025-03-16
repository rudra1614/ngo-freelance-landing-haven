
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative w-full min-h-[80vh] flex items-center">
      {/* Dotted pattern overlay */}
      <div className="absolute right-0 top-0 w-1/2 h-full">
        <div className="grid grid-cols-16 gap-3 w-full h-full">
          {Array(256).fill(0).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white opacity-30"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 z-10 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Help the ones who are needy
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-lg">
            The website helps you land your dream social work, the ones done on site or remote.
          </p>
          <Button className="bg-ngo-blue hover:bg-ngo-blue-dark text-white text-lg px-8 py-6" onClick="/login">
            Find me a SocialWork
          </Button>
        </div>
        
        <div className="w-full md:w-1/2 mt-10 md:mt-0 relative z-10">
          <div className="relative">
            <img 
              src="/C:\Users\Rudra Naik\Documents\GitHub\ngo-freelance-landing-haven\public\lovable-uploads\NGO 1 (2).jpg" 
              alt="Social worker helping in a community garden" 
              className="rounded-lg shadow-xl max-w-full md:ml-auto"
            />
            <div className="absolute -z-10 -bottom-2 -right-2 w-full h-full border-4 border-ngo-blue rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
