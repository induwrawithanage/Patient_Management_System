import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Messaging = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your health assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(userMessage.content), // Pass userMessage.content to getBotResponse
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes('appointment') || message.includes('schedule')) {
      return "I can help you schedule an appointment. Would you like me to connect you with your healthcare provider Dr. Sarah Johnson?";
    }

    if (message.includes('medication') || message.includes('medicine')) {
      return "I can see you're currently taking Vitamin D3 1000 IU daily. Is this about your current medication or do you need information about a new prescription?";
    }

    if (message.includes('blood pressure') || message.includes('bp')) {
      return "Your last blood pressure reading was 120/80 mmHg on January 15, 2024, which is in the normal range. Would you like to see your blood pressure trends?";
    }

    if (message.includes('test') || message.includes('results') || message.includes('lab')) {
      return "Your latest lab results from January 10, 2024 show all values within normal range. Would you like me to explain any specific test results?";
    }

    if (message.includes('pain') || message.includes('hurt') || message.includes('sick')) {
      return "I'm sorry to hear you're not feeling well. For urgent medical concerns, please contact your healthcare provider immediately. For non-urgent questions, I can help you understand your medical history or connect you with your doctor.";
    }

    return "I understand you're asking about your health. I can help you with information about your medical records, appointments, medications, or test results. What specific information would you like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-4"> {/* Added bg-gray-50 and padding to main div */}
      <Card className="rounded-2xl shadow-xl h-[600px] flex flex-col bg-white/90 backdrop-blur-sm border border-gray-100"> {/* Apply card styles */}
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-2xl flex-shrink-0"> {/* Updated gradient and padding */}
          <CardTitle className="text-2xl font-bold flex items-center gap-3"> {/* Increased font size and gap, added font-bold */}
            <Bot className="h-7 w-7" /> {/* Increased icon size */}
            Health Assistant Chat
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <Avatar className="w-8 h-8 flex-shrink-0"> {/* Added flex-shrink-0 */}
                      <AvatarFallback className="bg-purple-600 text-white"> {/* Updated color */}
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[70%] rounded-lg p-3 shadow-md ${ /* Added shadow-md */
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none' /* Stronger color, no bottom right radius */
                        : 'bg-gray-100 text-gray-800 rounded-bl-none' /* Light background, no bottom left radius */
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p> {/* Added leading-relaxed */}
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-white/70'
                        : 'text-gray-500' /* Updated to a specific gray */
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <Avatar className="w-8 h-8 flex-shrink-0"> {/* Added flex-shrink-0 */}
                      <AvatarFallback className="bg-gray-200 text-gray-700"> {/* Updated color and text color */}
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-purple-600 text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 text-gray-800 rounded-lg p-3 rounded-bl-none"> {/* Updated color, added rounded-bl-none */}
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div> {/* Consistent color */}
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 flex-shrink-0 bg-white rounded-b-2xl"> {/* Added border color, bg-white, and bottom radius */}
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your health question here..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200" /* Enhanced input styles */
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isTyping}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200" /* Enhanced button styles */
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center"> {/* Centered and specific text color */}
              This is a demo chatbot. In production, this would connect to your healthcare system.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messaging;