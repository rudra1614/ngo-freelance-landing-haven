
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // API key from the props (this is the Gemini API key)
  const apiKey = "AIzaSyBZI2-CO4hnyBFotfxvyodUPYLDh3zB2RQ";

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          content: "Hi there! I'm your NGO Freelancing assistant. How can I help you today?",
          role: 'assistant',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Test the API connection on component mount
  useEffect(() => {
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-2.0:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Test" }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 5
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          setQuotaExceeded(true);
          setApiError("Gemini API quota exceeded. Please check your API key and usage limits.");
        } else {
          throw new Error(`API Error: ${response.status}`);
        }
      } else {
        setApiError(null);
        setQuotaExceeded(false);
      }
    } catch (error) {
      console.error("Error testing Gemini API connection:", error);
      setApiError("Failed to connect to Gemini. The assistant will use predefined responses.");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      content: inputMessage.trim(),
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      if (apiError) {
        // If API connection failed, use fallback responses
        await new Promise(resolve => setTimeout(resolve, 1000));
        const fallbackResponse = getFallbackResponse(inputMessage);
        setMessages(prev => [...prev, {
          content: fallbackResponse,
          role: 'assistant',
          timestamp: new Date()
        }]);
      } else {
        // If API is working, use Gemini
        const messageHistory = messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }));
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-2.0:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: "system",
                parts: [{ text: 'You are a helpful assistant for NGO Freelancing, a platform that connects social workers with NGOs. Provide concise, helpful responses about the platform, opportunities, application process, etc. Keep answers brief but informative.' }]
              },
              ...messageHistory,
              {
                role: "user", 
                parts: [{ text: inputMessage }]
              }
            ],
            generationConfig: {
              maxOutputTokens: 200
            }
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 429) {
            setQuotaExceeded(true);
            setApiError("Gemini API quota exceeded. Please check your API key and usage limits.");
            throw new Error("API quota exceeded");
          } else {
            throw new Error(`API Error: ${response.status}`);
          }
        }
        
        const data = await response.json();
        let assistantMessage = "I couldn't generate a response.";
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content && 
            data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
          assistantMessage = data.candidates[0].content.parts[0].text;
        }
        
        setMessages(prev => [...prev, {
          content: assistantMessage,
          role: 'assistant',
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      if (!apiError) {
        // Only show toast if this is a new error
        toast({
          title: "Connection Error",
          description: "Couldn't connect to our AI service. Using fallback responses instead.",
          variant: "destructive"
        });
      }
      
      if (!quotaExceeded) {
        setApiError("Failed to get response from Gemini");
      }
      
      // Add fallback response
      const fallbackResponse = getFallbackResponse(inputMessage);
      setMessages(prev => [...prev, {
        content: fallbackResponse,
        role: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (message: string) => {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes("create account") || lowercaseMessage.includes("sign up") || lowercaseMessage.includes("register")) {
      return "To create an account, click on 'I'M A SOCIALWORKER' or 'HIRE SOCIALWORKER' on the homepage, then select 'Register' on the login page.";
    } else if (lowercaseMessage.includes("opportunities") || lowercaseMessage.includes("jobs")) {
      return "Our platform connects social workers with various opportunities including community development, counseling, project management, and more. Browse available positions after logging in.";
    } else if (lowercaseMessage.includes("apply") || lowercaseMessage.includes("application")) {
      return "After creating an account as a social worker, browse available opportunities, view details, and submit your application directly through the platform.";
    } else if (lowercaseMessage.includes("post job") || lowercaseMessage.includes("hire")) {
      return "Organizations can post jobs by registering, logging in, and selecting 'Post a New Job' from their dashboard.";
    } else if (lowercaseMessage.includes("fee") || lowercaseMessage.includes("cost") || lowercaseMessage.includes("price")) {
      return "Our platform is currently free for social workers. Organizations may have subscription options that provide additional features.";
    } else if (lowercaseMessage.includes("contact") || lowercaseMessage.includes("support")) {
      return "For support, email us at contact@ngofreelancing.org or call +91 9599912493. Our team is available Monday to Friday, 9 AM to 6 PM IST.";
    } else if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
      return "Hello! How can I help you with NGO Freelancing today?";
    } else {
      return "I'm sorry, I don't have specific information about that. For more detailed assistance, please contact our support team at contact@ngofreelancing.org.";
    }
  };

  const tryReconnect = () => {
    testApiConnection();
    toast({
      title: "Reconnecting",
      description: "Attempting to reconnect to Gemini..."
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative z-50">
      {/* Chat toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-blue-600 hover:bg-blue-700"
        aria-label="Chat with us"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-gray-800 rounded-lg shadow-xl flex flex-col border border-gray-700 animate-fade-in">
          {/* Chat header */}
          <div className="bg-gray-900 p-4 rounded-t-lg flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center">
              <Bot className="text-blue-400 mr-2" size={20} />
              <h3 className="font-medium text-white">NGO Assistant</h3>
            </div>
            {apiError && (
              <Button
                variant="ghost" 
                size="sm" 
                onClick={tryReconnect}
                className="text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <RefreshCw size={16} className="mr-1" />
                Reconnect
              </Button>
            )}
          </div>
          
          {/* API error indicator */}
          {apiError && (
            <div className={`px-4 py-2 text-sm border-b ${
              quotaExceeded 
                ? "bg-amber-900/30 text-amber-200 border-amber-800" 
                : "bg-red-900/30 text-red-200 border-red-800"
            }`}>
              <div className="flex items-center">
                <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                <p>{apiError}</p>
              </div>
              {quotaExceeded && (
                <p className="mt-1 text-xs">Using offline mode with predefined responses.</p>
              )}
            </div>
          )}

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-700 text-gray-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white px-4 py-2 rounded-lg rounded-bl-none max-w-[80%]">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input container */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 mr-2 bg-gray-700 border-gray-600 text-white"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {quotaExceeded ? "Using offline mode" : "Powered by Gemini"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
