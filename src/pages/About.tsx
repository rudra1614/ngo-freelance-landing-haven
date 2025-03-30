
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building, UsersRound, Heart, Globe, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-ngo-darkblue py-20 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Our Platform</h1>
            <p className="text-xl text-gray-300 mb-8">
              Connecting passionate social workers with meaningful opportunities to create positive change in communities.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-ngo-darkblue mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                Our mission is to bridge the gap between skilled social workers and organizations making a difference. We believe that by connecting the right talent with the right opportunities, we can accelerate positive social change and address pressing community needs.
              </p>
              <p className="text-gray-700 mb-6">
                We are committed to creating a platform that makes it easier for social workers to find meaningful work and for organizations to find qualified professionals who share their vision for a better world.
              </p>
              <div className="flex space-x-4">
                <Button asChild>
                  <Link to="/jobs" className="bg-ngo-blue hover:bg-ngo-blue-dark text-white">
                    Browse Opportunities
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/organization/signup" className="border-ngo-blue text-ngo-blue hover:bg-ngo-blue hover:text-white">
                    Join as Organization
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/mission.jpg" 
                alt="Social workers collaborating" 
                className="rounded-lg shadow-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute -bottom-6 -left-6 bg-ngo-blue p-6 rounded-lg shadow-lg">
                <p className="text-white font-bold text-xl">Making an impact since 2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-ngo-darkblue mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersRound className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-ngo-darkblue mb-2">500+</h3>
              <p className="text-gray-600">Social Workers</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-ngo-darkblue mb-2">200+</h3>
              <p className="text-gray-600">Partner Organizations</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-ngo-darkblue mb-2">1,000+</h3>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-ngo-darkblue mb-2">50+</h3>
              <p className="text-gray-600">Communities Served</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-ngo-darkblue mb-4">Our Team</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We're a dedicated team of professionals passionate about connecting social workers with organizations making a difference.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="/images/team1.jpg" 
                alt="Team Member"
                className="w-full h-64 object-cover rounded-lg mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://randomuser.me/api/portraits/women/44.jpg";
                }}
              />
              <h3 className="text-xl font-bold text-ngo-darkblue mb-1">Sarah Johnson</h3>
              <p className="text-ngo-blue mb-3">Chief Executive Officer</p>
              <p className="text-gray-600">
                With over 15 years of experience in the non-profit sector, Sarah leads our mission to connect talented individuals with meaningful work.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="/images/team2.jpg" 
                alt="Team Member"
                className="w-full h-64 object-cover rounded-lg mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://randomuser.me/api/portraits/men/32.jpg";
                }}
              />
              <h3 className="text-xl font-bold text-ngo-darkblue mb-1">David Martinez</h3>
              <p className="text-ngo-blue mb-3">Chief Technology Officer</p>
              <p className="text-gray-600">
                David brings his technical expertise to build and maintain our platform, ensuring a seamless experience for all users.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img 
                src="/images/team3.jpg" 
                alt="Team Member"
                className="w-full h-64 object-cover rounded-lg mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://randomuser.me/api/portraits/women/68.jpg";
                }}
              />
              <h3 className="text-xl font-bold text-ngo-darkblue mb-1">Priya Sharma</h3>
              <p className="text-ngo-blue mb-3">Community Relations Director</p>
              <p className="text-gray-600">
                Priya works closely with organizations and social workers to foster meaningful partnerships and ensure successful placements.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-ngo-darkblue mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-ngo-blue"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              <div className="relative md:flex items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                  <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                    <div className="flex items-center md:justify-end mb-2">
                      <Calendar className="h-5 w-5 text-ngo-blue mr-2" />
                      <span className="font-bold">2022</span>
                    </div>
                    <h3 className="text-xl font-bold text-ngo-darkblue mb-2">Platform Launch</h3>
                    <p className="text-gray-600">We launched our platform with the vision to connect social workers with organizations.</p>
                  </div>
                </div>
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-ngo-blue"></div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
              
              <div className="relative md:flex items-center">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-ngo-blue"></div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-ngo-blue mr-2" />
                      <span className="font-bold">2023</span>
                    </div>
                    <h3 className="text-xl font-bold text-ngo-darkblue mb-2">Expanded Partnerships</h3>
                    <p className="text-gray-600">We partnered with over 100 organizations across the country to provide more opportunities.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative md:flex items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                  <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                    <div className="flex items-center md:justify-end mb-2">
                      <Calendar className="h-5 w-5 text-ngo-blue mr-2" />
                      <span className="font-bold">2024</span>
                    </div>
                    <h3 className="text-xl font-bold text-ngo-darkblue mb-2">Platform Redesign</h3>
                    <p className="text-gray-600">We revamped our platform to improve user experience and add new features for both social workers and organizations.</p>
                  </div>
                </div>
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-ngo-blue"></div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-ngo-darkblue mb-4">Our Values</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            These core principles guide our work and shape our platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-ngo-darkblue mb-3">Excellence</h3>
              <p className="text-gray-600">
                We are committed to excellence in everything we do, from platform development to user support.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-ngo-darkblue mb-3">Compassion</h3>
              <p className="text-gray-600">
                We approach our work with empathy and understanding, recognizing the importance of human connection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-ngo-darkblue mb-3">Impact</h3>
              <p className="text-gray-600">
                We measure our success by the positive change we help create in communities around the world.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-6 md:px-12 bg-ngo-darkblue text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you're a social worker looking for meaningful opportunities or an organization seeking qualified professionals, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="bg-ngo-blue hover:bg-ngo-blue-dark">
              <Link to="/signup">Sign Up as Social Worker</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ngo-darkblue">
              <Link to="/organization/signup">Register Organization</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
