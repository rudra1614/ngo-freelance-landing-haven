import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsAndPortal from '@/components/StatsAndPortal';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-ngo-darkblue">
      <Navbar />
      <Hero />

      <HowItWorks />
      <WhyChooseUs />
      <StatsAndPortal />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
