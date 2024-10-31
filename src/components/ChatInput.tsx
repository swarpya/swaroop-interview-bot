import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

type Props = {
  onSend: (message: string) => void;
  disabled: boolean;
  isLoading: boolean;
};

export default function ChatInput({ onSend, disabled, isLoading }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-purple-500/20 bg-gray-900/50 backdrop-blur-sm animate-slide-up">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? 'Please select a language first' : 'Type your answer...'}
          className="flex-1 px-4 py-2 bg-gray-800/50 text-purple-100 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-900/50 disabled:text-gray-500 placeholder-purple-300/50 transition-all duration-300 hover:border-purple-400 backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim() || isLoading}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-scale animate-glow disabled:animate-none"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
}