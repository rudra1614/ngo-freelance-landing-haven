import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, X, Send, Bot, CloudOff, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  content: string;
  isBot: boolean;
};

// Fallback responses for when the API is not available
const fallbackResponses: Record<string, string> = {
  "account": "You can create an account by clicking on 'I'm a Socialworker' or 'Hire Socialworker' on the homepage, then selecting 'Register' on the login page.",
  "opportunities": "Our platform offers various opportunities including community development, counseling, project management, research, fundraising, and more based on NGO needs.",
  "help": "I'm here to help! You can ask me about creating an account, finding opportunities, job applications, posting jobs, fees, verification, remote work, or contacting support."
};

// Default Gemini API key provided by the user
const DEFAULT_API_KEY = "AIzaSyBZI2-CO4hnyBFotfxvyodUPYLDh3zB2RQ";

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
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('gemini_api_key') || DEFAULT_API_KEY;
  });
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiMode, setApiMode] = useState<'gemini' | 'fallback'>('gemini');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Test the API connection on component mount
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      // Update to use Gemini Flash 2.0 API endpoint
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-flash-2.0:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: "Hello" }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 10,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      setApiMode('gemini');
    } catch (error) {
      console.error("Error testing Gemini API connection:", error);
      setApiMode('fallback');
      toast({
        title: "Using Fallback Mode",
        description: "Unable to connect to Gemini AI. Using predefined responses.",
        variant: "destructive",
      });
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey);
      setShowApiKeyInput(false);
      testApiConnection();
      toast({
        title: "API Key Saved",
        description: "Your API key has been saved. Testing connection...",
      });
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      if (apiMode === 'fallback') {
        // Use fallback response system
        setTimeout(() => {
          const botMessage = {
            id: (Date.now() + 1).toString(),
            content: getFallbackResponse(input.toLowerCase()),
            isBot: true
          };
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
        }, 800);
        return;
      }

      // Prepare conversation history for context
      const conversationHistory = messages.slice(-5).map(msg => ({
        role: msg.isBot ? "model" : "user",
        parts: [{ text: msg.content }]
      }));

      // Add current user message
      conversationHistory.push({
        role: "user",
        parts: [{ text: input }]
      });

      // Call Gemini Flash 2.0 API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-flash-2.0:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ 
                text: `You are an assistant for NGO Freelancing, a platform connecting social workers with NGOs. 
                Answer questions about: creating accounts, available opportunities, applying for positions, 
                posting jobs as an organization, platform fees, social worker verification process, remote work options, 
                and contacting support. Keep responses concise and helpful. Current question: ${input}` 
              }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text || "I'm sorry, I couldn't generate a response.";
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setApiMode('fallback');
      
      // Fallback to predefined responses on error
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: `I'm having trouble connecting to my AI service. ${getFallbackResponse(input.toLowerCase())}`,
        isBot: true
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      toast({
        title: "Connection Error",
        description: "There was a problem connecting to the AI service. Using fallback responses.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const getFallbackResponse = (query: string): string => {
    // Check for keyword matches in fallback responses
    for (const [keyword, response] of Object.entries(fallbackResponses)) {
      if (query.includes(keyword.toLowerCase())) {
        return response;
      }
    }

    // Default response if no keyword matches
    return "I'm sorry, I couldn't process your request. Please try asking about account creation, job opportunities, application process, posting jobs, fees, verification, remote work, or contacting support.";
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
            <h3 className="font-semibold">AI Support Assistant</h3>
            {apiMode === 'fallback' && (
              <span className="ml-2 flex items-center text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                <CloudOff className="h-3 w-3 mr-1" />
                Offline
              </span>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto text-white hover:bg-blue-700 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {showApiKeyInput ? (
            <div className="p-4">
              <h4 className="font-medium mb-2">Enter your Gemini API Key</h4>
              <p className="text-sm text-gray-600 mb-3">
                This will be stored locally in your browser and used to connect to the Gemini AI service.
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="border border-gray-300 rounded p-2 text-sm"
                  placeholder="AI API Key"
                />
                <Button onClick={handleApiKeySubmit}>Save API Key</Button>
              </div>
            </div>
          ) : (
            <>
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
              
              {/* API key management */}
              <div className="p-2 border-t border-gray-200 flex justify-between items-center">
                <Button 
                  variant="link" 
                  className="text-xs text-gray-500" 
                  onClick={() => setShowApiKeyInput(true)}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Change API Key
                </Button>
                
                {apiMode === 'fallback' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={testApiConnection}
                  >
                    Try to reconnect
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
