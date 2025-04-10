
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'model';
  content: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi there! I'm your NGO Freelancing assistant. How can I help you today?" }
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
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: userMessage }
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
      
      // Fallback response
      setMessages(prev => [
        ...prev, 
        { 
          role: 'model', 
          content: "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again later or contact our support team for immediate assistance." 
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
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          <Bot size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-[90vh] rounded-t-lg" side="bottom">
        <div className="bg-blue-600 p-4 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center">
            <Bot className="text-white mr-2" size={24} />
            <h3 className="font-bold text-white">NGO Support Chat</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white">
            <X size={20} />
          </Button>
        </div>
        
        <div className="flex-grow overflow-auto p-4 bg-gray-50">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div 
                className={`inline-block p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                } max-w-[80%]`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800 rounded-tl-none">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce mr-1"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce mr-1" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send size={18} />
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBot;
