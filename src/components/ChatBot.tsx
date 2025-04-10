import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, X, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'model';
  content: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi there! I'm your NGO Freelancing assistant. I can help with questions about using our platform, finding opportunities, or creating an account. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_KEY = "AIzaSyBZI2-CO4hnyBFotfxvyodUPYLDh3zB2RQ";
  const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);
    
    try {
      const conversationHistory = messages.map(msg => 
        msg.role === 'user' ? `User: ${msg.content}` : `Assistant: ${msg.content}`
      ).join('\n');
      
      const systemInstruction = `
You are a helpful assistant for the NGO Freelancing website. Your purpose is to provide information specifically about:
- How to create and manage accounts on the platform
- Available opportunities for social workers
- How organizations can post jobs and find talent
- Platform features and navigation
- Subscription and payment options
- Support contact information

If asked about topics unrelated to the NGO Freelancing platform, politely explain that you can only assist with questions about the website and its services. Do not provide information about general topics, politics, news, or other unrelated subjects. Always be professional, helpful, and concise in your responses.

Current conversation history:
${conversationHistory}

User's new message: ${userMessage}
`;

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemInstruction }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 200
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "Sorry, I couldn't generate a response. Please try again.";
      
      setMessages(prev => [...prev, { role: 'model', content: botResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to connect to Gemini. The assistant will use predefined responses.",
        variant: "destructive",
      });
      
      const fallbackResponses = [
        "I can only answer questions related to the NGO Freelancing platform. Please ask about creating an account, finding opportunities, or how to use our services.",
        "I'm your NGO Freelancing assistant. I can help with platform-related questions like account creation, job postings, or finding talent. What would you like to know about our services?",
        "Sorry, I'm having trouble connecting to my knowledge base. For questions about the NGO Freelancing platform, please contact our support team directly or check the FAQ section."
      ];
      
      setMessages(prev => [
        ...prev, 
        { 
          role: 'model', 
          content: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)] 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 rounded-full h-16 w-16 p-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={28} className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-[90vh] rounded-t-lg border-0" side="bottom">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-full mr-3">
              <Bot className="text-white" size={22} />
            </div>
            <h3 className="font-bold text-white">NGO Support Chat</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full">
            <X size={20} />
          </Button>
        </div>
        
        <div className="flex-grow overflow-auto p-5 bg-gray-50/90 backdrop-blur-sm space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className={cn(
                  "px-4 py-3 rounded-2xl max-w-[85%] shadow-sm",
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white ml-12' 
                    : 'bg-white border border-gray-200 mr-12',
                  message.role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none max-w-[85%] mr-12 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white shadow-md">
          <div className="flex gap-2 items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow rounded-full border-gray-200 focus-visible:ring-blue-500 px-4 py-3 text-sm bg-gray-50"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              size="icon"
              className="rounded-full h-10 w-10 bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {isLoading ? <Spinner size="sm" className="border-white" /> : <Send size={18} className="text-white" />}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBot;
