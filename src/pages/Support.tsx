
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
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
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Support Center</h1>
        
        <section className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="bg-gray-800 rounded-lg p-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-700 py-2 last:border-0">
                <AccordionTrigger className="text-lg font-medium text-blue-400 hover:text-blue-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        
        <section className="mb-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-6">
            If you couldn't find what you're looking for, please contact our support team.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Email Support</h3>
              <p className="text-gray-300">contact@ngofreelancing.org</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Phone Support</h3>
              <p className="text-gray-300">+91 9599912493</p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
      
      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Support;
