
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Mail, MessageSquare, Phone } from 'lucide-react';

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
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="faq" className="text-lg">FAQs</TabsTrigger>
            <TabsTrigger value="contact" className="text-lg">Contact Us</TabsTrigger>
            <TabsTrigger value="resources" className="text-lg">Resources</TabsTrigger>
          </TabsList>
          
          {/* FAQs Tab */}
          <TabsContent value="faq" className="bg-white p-6 rounded-lg shadow-lg">
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
          </TabsContent>
          
          {/* Contact Tab */}
          <TabsContent value="contact" className="bg-white p-6 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have a question or need assistance? Our support team is ready to help you. 
                  Fill out the form and we'll get back to you as soon as possible.
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input id="name" placeholder="Your name" className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input id="email" type="email" placeholder="Your email" className="w-full" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Input id="subject" placeholder="How can we help you?" className="w-full" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Textarea id="message" placeholder="Your message" className="w-full min-h-[150px]" />
                  </div>
                  
                  <Button type="submit" className="bg-ngo-blue hover:bg-ngo-blue-dark text-white">
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-ngo-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Email Us</h3>
                      <p className="text-gray-600 mt-1">contact@ngofreelancing.org</p>
                      <p className="text-gray-600">support@ngofreelancing.org</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-ngo-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Call Us</h3>
                      <p className="text-gray-600 mt-1">+91 9599912493</p>
                      <p className="text-gray-600">Monday to Friday, 9am to 6pm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                      <MessageSquare className="h-6 w-6 text-ngo-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Live Chat</h3>
                      <p className="text-gray-600 mt-1">Available on weekdays</p>
                      <p className="text-gray-600">9am to 5pm</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 p-6 bg-blue-50 rounded-lg">
                  <h3 className="flex items-center text-lg font-medium text-gray-800 mb-3">
                    <HelpCircle className="h-5 w-5 mr-2 text-ngo-blue" />
                    Support Hours
                  </h3>
                  <p className="text-gray-600">Monday to Friday: 9am - 6pm</p>
                  <p className="text-gray-600">Saturday: 10am - 4pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Helpful Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started Guide</CardTitle>
                  <CardDescription>Complete guide for new users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Learn how to set up your profile, browse opportunities, and start your social work journey.</p>
                  <Button variant="outline" className="w-full">Download PDF</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>For Organizations</CardTitle>
                  <CardDescription>Resources for NGOs and nonprofits</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Tools and guides to help you find the right social workers for your organization's needs.</p>
                  <Button variant="outline" className="w-full">View Resources</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tutorial Videos</CardTitle>
                  <CardDescription>Visual guides to our platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Watch step-by-step tutorials on how to use various features of our platform.</p>
                  <Button variant="outline" className="w-full">Watch Videos</Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Additional Learning Materials</h3>
              <ul className="space-y-4">
                <li className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800">Social Work Ethics Guide</h4>
                  <p className="text-gray-600 mt-1">A comprehensive resource on ethical practices in social work.</p>
                </li>
                <li className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800">Volunteer Handbook</h4>
                  <p className="text-gray-600 mt-1">Everything you need to know about volunteering through our platform.</p>
                </li>
                <li className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800">Remote Social Work Best Practices</h4>
                  <p className="text-gray-600 mt-1">Tips and guidelines for effective remote social work.</p>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Support;
