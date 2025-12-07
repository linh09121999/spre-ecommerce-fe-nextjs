import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageType } from '@/interface/chat';
import { FaRegUser } from 'react-icons/fa';
import { RiRobot2Line } from 'react-icons/ri';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'ml-3 bg-green-100' : 'mr-3 bg-green-50'}`}>
          {isUser ? (
            <FaRegUser className="w-4 h-4 text-green-600" />
          ) : (
            <RiRobot2Line className="w-4 h-4 text-green-600" />
          )}
        </div>
        
        <div className={`rounded-2xl px-4 py-3 ${isUser ? 'bg-green-600 text-white rounded-tr-none' : 'bg-green-50 text-gray-800 rounded-tl-none'}`}>
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;