
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <Hero 
        title="About Us"
        subtitle="Learn more about our mission and values"
        backgroundImage="/lovable-uploads/NGO 1 (2).jpg"
      />
      
      <div className="container mx-auto px-6 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Our mission is to connect passionate social workers with non-governmental organizations (NGOs) that need their expertise. We believe that by connecting skilled freelancers with meaningful causes, we can make a significant positive impact on communities around the world.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We strive to create a platform where social workers can find fulfilling opportunities to apply their skills and knowledge, while NGOs can access a diverse pool of talent to help them achieve their goals and enhance their impact.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Together, we're building a community dedicated to social change, where expertise meets passion, and where meaningful connections lead to tangible improvements in people's lives.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Integrity</h3>
              <p className="text-gray-300">We are committed to transparency, honesty, and ethical practices in all our operations.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Community</h3>
              <p className="text-gray-300">We foster a supportive community where collaboration and mutual respect drive positive change.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Impact</h3>
              <p className="text-gray-300">We measure our success by the positive difference we make in communities and individual lives.</p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default About;
