'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ProductRecommendation, ChatContext } from '@/interface/chat';
import ChatMessageComponent from './ChatMessage';
import ProductCard from './ProductCard';
import { getChatbotResponse } from '@/lib/openai';
import { FaTimes, FaPaperPlane, FaExpand, FaCompress } from 'react-icons/fa';
import { RiRobot2Line } from 'react-icons/ri';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! 👋 I'm **Spree Commerce**'s AI assistant. I can help you find fashion (men, women, accessories) and wellness (fitness, relaxation, mental stimulation, nutrition) products.\n\nWhat products are you looking for today? 😊`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext>({});
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await getChatbotResponse(inputMessage, messages, chatContext);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (response.context) {
        setChatContext(response.context);
      }

      if (response.recommendations && response.recommendations.length > 0) {
        setRecommendations(response.recommendations);
      } else {
        setRecommendations([]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, an error occurred. Please try again later! 😔',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    { text: 'Show me men fashion', emoji: '👔' },
    { text: 'Show me women fashion', emoji: '🧘‍♂️' },
    { text: 'Accessories under $50', emoji: '👒' }
  ];

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-[30px] w-14 h-14 rounded-full flex items-center justify-center z-50 bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold text-lg transition-all duration-300 transform shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 group"
          aria-label="Open chatbot"
        >
          <RiRobot2Line className="w-6 h-6" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed ${isExpanded ? 'inset-0 rounded-none border-none' : 'bottom-20 sm:right-[30px] right-[15px] rounded-2xl border border-green-200'
            } z-50 ${isExpanded ? 'w-full h-full' : 'sm:w-96 w-80 h-[600px]'
            } bg-white shadow-2xl flex flex-col overflow-hidden transition-all`}
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <RiRobot2Line className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Spree Assistant</h3>
                  <p className="text-xs text-green-100">AI Shopping Assistant</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isExpanded ? <FaCompress className="w-4 h-4" /> : <FaExpand className="w-4 h-4" />}
                </button>
                <button aria-label='time'
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-green-50/30">
            {messages.map((message) => (
              <ChatMessageComponent key={message.id} message={message} />
            ))}

            {recommendations.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <h4 className="font-semibold text-green-700">Recommended products</h4>
                </div>

                <div className="flex flex-col gap-3">
                  {recommendations.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {messages.length <= 2 && (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3">Quick question:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputMessage(q.text);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 text-sm rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                    >
                      <span className="mr-2">{q.emoji}</span>
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-green-50 rounded-2xl px-4 py-3 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="border-t border-green-200 p-4 bg-white">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your question..."
                className="flex-1 w-full p-3 bg-green-50 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
                disabled={isLoading}
              />

              <button
                aria-label="paper plane"
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className={`px-5 rounded-xl relative flex items-center justify-center ${isLoading || !inputMessage.trim()
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 group'
                  }`}
              >
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              💡 You can ask about products, prices, or ask me for suggestions!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;