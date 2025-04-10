
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  content: string;
  isBot: boolean;
};

// Predefined responses based on keywords
const botResponses: Record<string, string> = {
  "account": "You can create an account by clicking on 'I'm a Socialworker' or 'Hire Socialworker' on the homepage, then selecting 'Register' on the login page.",
  "opportunities": "Our platform offers various opportunities including community development, counseling, project management, research, fundraising, and more based on NGO needs.",
  "apply": "After creating a social worker account, you can browse opportunities, view details, and submit applications directly through the platform.",
  "post job": "After registering as an organization, navigate to your dashboard and select 'Post a New Job'. Fill in all the required details.",
  "fee": "Our platform is currently free for social workers. Organizations may have subscription options for additional features.",
  "verification": "Social workers provide their educational qualifications, work experience, certifications, and references which organizations can review.",
  "remote": "Yes, many opportunities on our platform offer remote work options. You can filter jobs by location preference.",
  "contact": "For any issues or questions, please email us at contact@ngofreelancing.org or call us at +91 9599912493.",
  "help": "I'm here to help! You can ask me about creating an account, finding opportunities, job applications, posting jobs, fees, verification, remote work, or contacting support."
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your NGO Freelancing assistant. How can I help you today?",
      isBot: true
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      isBot: false
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input.toLowerCase()),
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (query: string): string => {
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (query.includes(keyword.toLowerCase())) {
        return response;
      }
    }

    // Default response if no keyword matches
    return "I'm not sure I understand. Could you rephrase your question? You can ask about account creation, job opportunities, application process, posting jobs, fees, verification, remote work, or contacting support.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <Button 
        className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Chat header */}
          <div className="bg-blue-600 text-white p-4 flex items-center">
            <Bot className="h-6 w-6 mr-2" />
            <h3 className="font-semibold">Support Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto text-white hover:bg-blue-700 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages container */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 max-w-[80%] ${message.isBot ? 'ml-0' : 'ml-auto'}`}
              >
                <div 
                  className={`p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-blue-100 text-gray-800 rounded-tl-none' 
                      : 'bg-blue-600 text-white rounded-tr-none ml-auto'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 max-w-[80%]">
                <div className="p-3 rounded-lg bg-blue-100 text-gray-800 rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2">
            <Textarea 
              placeholder="Type your message..."
              className="resize-none min-h-10 p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 h-10 w-10 p-0"
              disabled={input.trim() === ''}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
