import React, { useState, useRef, useEffect } from 'react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, ChatRole } from '../types';

export const AIConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "Malo e lelei! I'm your Tonga VIP concierge. Ask me about travel times, our services, or tips for your stay in Tonga." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: ChatRole.USER, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getConciergeResponse(input);
    
    setMessages(prev => [...prev, { role: ChatRole.MODEL, text: responseText }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${
          isOpen ? 'bg-gray-800 rotate-90' : 'bg-tonga-red'
        }`}
        aria-label="Toggle AI Concierge"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slide-up origin-bottom-left" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-tonga-red p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-xl">🌺</span>
            </div>
            <div>
              <h3 className="text-white font-bold">VIP Concierge</h3>
              <p className="text-red-200 text-xs">Powered by Gemini AI</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === ChatRole.USER
                      ? 'bg-tonga-red text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about travel time..."
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tonga-red text-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-tonga-red text-white rounded-md hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};