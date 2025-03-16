import { Link } from 'react-router-dom';
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-ngo-blue text-white text-center">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Join our community of passionate social workers and NGOs committed to creating positive change around the world.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login">
             <Button size="lg" variant="secondary" className="px-8" >
            Find Opportunities
             </Button>
          </Link>
          <Link to="/organization/login">
             <Button size="lg" className="bg-white text-ngo-blue hover:bg-gray-100 px-8" onClick="/organization/login">
            Post a Project
             </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
