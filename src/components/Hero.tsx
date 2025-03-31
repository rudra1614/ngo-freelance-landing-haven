
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title = "Help the ones who are needy",
  subtitle = "The website helps you land your dream social work, the ones done on site or remote.",
  backgroundImage = "/lovable-uploads/NGO 1 (2).jpg"
}) => {
  const navigate = useNavigate();
  
  const handleFindWorkClick = () => {
    navigate('/login');
  };
  
  return (
    <div className="relative w-full min-h-[90vh] flex items-center pt-20">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-ngo-darkblue/90 to-ngo-darkblue/70 z-0"></div>
      
      {/* Dotted pattern overlay */}
      <div className="absolute right-0 top-0 w-1/2 h-full z-10">
        <div className="grid grid-cols-16 gap-3 w-full h-full">
          {Array(256).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="w-1.5 h-1.5 rounded-full bg-white opacity-30 animate-pulse-slow"
              style={{ animationDelay: `${(i % 10) * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center z-20">
        <div className="w-full md:w-1/2 z-10 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="block relative">
              <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                {title}
              </span>
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-500 rounded-full"></span>
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-lg">
            {subtitle}
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 transition-all hover-lift flex items-center gap-2 group" 
            onClick={handleFindWorkClick}
          >
            Find me a SocialWork
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="w-full md:w-1/2 mt-10 md:mt-0 relative z-10">
          <div className="relative animate-float">
            <img 
              src={backgroundImage} 
              alt="Social worker helping in a community" 
              className="rounded-lg shadow-xl max-w-full md:ml-auto object-cover transition-all"
            />
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border-4 border-blue-500 rounded-lg"></div>
            
            {/* Floating badge */}
            <div className="absolute top-4 -left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
              <span className="text-sm font-semibold">Join 700+ Social Workers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
