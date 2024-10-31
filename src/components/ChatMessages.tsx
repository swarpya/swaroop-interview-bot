import React, { useEffect, useRef } from 'react';
import type { Message } from '../types';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Props = {
  messages: Message[];
};

export default function ChatMessages({ messages }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/50 backdrop-blur-sm">
      {messages.map((message, index) => (
        <div
          key={index}
          style={{ animationDelay: `${index * 100}ms` }}
          className={`flex items-start gap-3 message-appear ${
            message.role === 'assistant' ? 'justify-start' : 'justify-end'
          }`}
        >
          {message.role === 'assistant' && (
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center animate-pulse-purple">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
          )}
          <div
            className={`max-w-[80%] rounded-lg p-4 hover-scale ${
              message.role === 'assistant'
                ? 'bg-gray-800/80 text-purple-100 animate-glow'
                : 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/20'
            }`}
          >
            <ReactMarkdown
              className={`prose ${message.role === 'user' ? 'prose-invert' : ''} max-w-none prose-purple`}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <pre className="!bg-black/50 !text-purple-100 p-3 rounded-lg overflow-x-auto border border-purple-500/20 backdrop-blur-sm">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className={`${inline ? 'bg-black/50 text-purple-200 px-1 py-0.5 rounded backdrop-blur-sm' : ''} ${className}`} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          {message.role === 'user' && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center animate-pulse-purple">
              <User className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}