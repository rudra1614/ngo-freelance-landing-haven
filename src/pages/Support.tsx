
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { MessageCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking on 'I'm a Socialworker' or 'Hire Socialworker' on the homepage, then selecting 'Register' on the login page. Fill in your details to create your account."
    },
    {
      question: "What kind of opportunities are available?",
      answer: "Our platform connects social workers with NGOs for various opportunities including community development, counseling, project management, research, fundraising, and more. The opportunities vary based on the needs of the organizations."
    },
    {
      question: "How do I apply for a position?",
      answer: "After creating an account as a social worker, you can browse available opportunities on the platform, view details of positions that interest you, and submit your application directly through the platform."
    },
    {
      question: "As an organization, how do I post a job?",
      answer: "After registering and logging in as an organization, navigate to your dashboard and select 'Post a New Job'. Fill in the job details including role, responsibilities, requirements, and other relevant information."
    },
    {
      question: "Is there a fee for using the platform?",
      answer: "Our platform is currently free for social workers. Organizations may have subscription options available that provide additional features and benefits."
    },
    {
      question: "How are social workers vetted?",
      answer: "Social workers on our platform provide their educational qualifications, work experience, certifications, and references. Organizations can review these details when considering applicants."
    },
    {
      question: "Can I work remotely through this platform?",
      answer: "Yes, many opportunities on our platform offer remote work options. You can filter jobs by location preference including remote-only positions."
    },
    {
      question: "How do I contact support?",
      answer: "For any issues or questions not covered in our FAQs, please email us at contact@ngofreelancing.org or call us at +91 9599912493. Our support team is available Monday to Friday, 9 AM to 6 PM IST."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Support Center</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto rounded-full"></div>
        </div>
        
        <section className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700/50">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-gray-700/50 py-2 last:border-0 hover:bg-gray-700/30 transition-colors duration-200 rounded-lg px-2"
              >
                <AccordionTrigger className="text-lg font-medium text-blue-300 hover:text-blue-200 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pt-2 pl-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        
        <section className="mb-16 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">Still Need Help?</h2>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto">
            If you couldn't find what you're looking for, please contact our support team. We're here to help you navigate our platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 shadow-xl hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 flex justify-center items-center mx-auto mb-4 group-hover:bg-blue-600/30 transition-colors">
                <MessageCircle size={28} className="text-blue-300 group-hover:text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300 group-hover:text-blue-200 transition-colors">Email Support</h3>
              <p className="text-gray-300 break-all">contact@ngofreelancing.org</p>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 shadow-xl hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 flex justify-center items-center mx-auto mb-4 group-hover:bg-blue-600/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-300 group-hover:text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300 group-hover:text-blue-200 transition-colors">Phone Support</h3>
              <p className="text-gray-300">+91 9599912493</p>
            </div>
          </div>
        </section>
      </div>
      
      <ChatBot />
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Support;
