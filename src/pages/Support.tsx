
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const Support = () => {
  return (
    <div className="min-h-screen bg-ngo-darkblue">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-ngo-darkblue py-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Support Center</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Need help? We're here to support you on your social work journey.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <Card className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg text-gray-800">How do I apply for a social work position?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                To apply for a position, create an account as a social worker, browse available opportunities in the Jobs section, and click the "Apply" button on any position that interests you. You'll need to complete your profile before applying.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg text-gray-800">How can I post a social work opportunity?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Organizations can post opportunities by creating an organization account, navigating to the dashboard, and clicking on "Post New Job". Complete the form with details about the position, including responsibilities, requirements, and compensation.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg text-gray-800">Is there a fee for using this platform?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our platform is completely free for social workers. Organizations have access to basic features for free, with premium features available through subscription plans that help support our mission.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg text-gray-800">How are social workers vetted?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We verify credentials and experience through our profile system. Social workers can upload certificates, degrees, and references. Organizations can see verification badges on profiles that have completed our verification process.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg text-gray-800">Can I volunteer through this platform?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes! Many organizations post volunteer opportunities. You can filter job listings to show only volunteer positions if you're specifically looking to donate your time and skills.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Support;
