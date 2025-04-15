
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Heart, Shield, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      <Hero 
        title="About Us"
        subtitle="Learn more about our mission and values"
        backgroundImage="/images/about-hero.jpg"
      />
      
      <div className="container mx-auto px-6 py-16">
        {/* Mission section with refined styling */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge className="mb-3 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1">Our Purpose</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Our Mission</h2>
            <div className="w-16 h-1 bg-blue-500 rounded mb-10"></div>
          </div>
          
          <div className="max-w-3xl mx-auto glass p-8 rounded-2xl">
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
        
        {/* Values section with cards */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge className="mb-3 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1">What We Stand For</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Our Values</h2>
            <div className="w-16 h-1 bg-blue-500 rounded mb-10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden group hover-lift">
              <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-6 pt-8 relative">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 p-3 rounded-full border-4 border-gray-700 group-hover:border-blue-500 transition-all duration-300">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4 text-center text-blue-400">Integrity</h3>
                <p className="text-gray-300 text-center">We are committed to transparency, honesty, and ethical practices in all our operations.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden group hover-lift">
              <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-6 pt-8 relative">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 p-3 rounded-full border-4 border-gray-700 group-hover:border-blue-500 transition-all duration-300">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4 text-center text-blue-400">Community</h3>
                <p className="text-gray-300 text-center">We foster a supportive community where collaboration and mutual respect drive positive change.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden group hover-lift">
              <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-6 pt-8 relative">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 p-3 rounded-full border-4 border-gray-700 group-hover:border-blue-500 transition-all duration-300">
                  <Heart className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4 text-center text-blue-400">Impact</h3>
                <p className="text-gray-300 text-center">We measure our success by the positive difference we make in communities and individual lives.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="mb-16">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge className="mb-3 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1">Our Journey</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Our Story</h2>
            <div className="w-16 h-1 bg-blue-500 rounded mb-10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="relative rounded-xl overflow-hidden group hover-lift">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src="/placeholder.svg" 
                alt="Our journey" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">From Vision to Reality</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Our platform was born from a simple observation: NGOs often struggle to find qualified social workers, while many skilled professionals seek meaningful ways to apply their expertise.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We started with a small team of passionate individuals committed to bridging this gap. Through dedication and innovation, we've built a comprehensive platform that serves both social workers and organizations.
              </p>
              <div className="flex items-center mt-6">
                <CheckCircle className="text-blue-400 mr-3 h-5 w-5" />
                <p className="text-gray-200">Founded in 2023</p>
              </div>
              <div className="flex items-center mt-3">
                <CheckCircle className="text-blue-400 mr-3 h-5 w-5" />
                <p className="text-gray-200">Connected 500+ social workers with NGOs</p>
              </div>
              <div className="flex items-center mt-3">
                <CheckCircle className="text-blue-400 mr-3 h-5 w-5" />
                <p className="text-gray-200">Operating in 15+ countries</p>
              </div>
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
