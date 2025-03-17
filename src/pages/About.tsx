import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedOpportunities from '@/components/FeaturedOpportunities';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsAndPortal from '@/components/StatsAndPortal';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero 
        title="About Us"
        subtitle="Learn more about our mission and values"
        backgroundImage="/images/about-hero.jpg"
      />
      <section>
        <h2>Our Mission</h2>
        <p>
          Our mission is to connect freelancers with NGOs and non-profits to create meaningful opportunities that make a difference in the world.
        </p>
      </section>
      <FeaturedOpportunities />
      <HowItWorks />
      <WhyChooseUs />
      <StatsAndPortal />
      <Testimonials />
      <CallToAction 
        title="Join Us Today"
        description="Become a part of our community and start making a difference."
        buttonText="Get Started"
        buttonLink="/signup"
      />
      <Footer />
    </div>
  );
};

export default About;
