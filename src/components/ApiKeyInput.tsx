import React, { useState } from 'react';
import { Key } from 'lucide-react';

type Props = {
  onSubmit: (apiKey: string) => void;
};

export default function ApiKeyInput({ onSubmit }: Props) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900/80 rounded-xl shadow-lg shadow-purple-500/20 border border-purple-500/20 backdrop-blur-sm animate-slide-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-6 h-6 text-purple-400 animate-pulse-purple" />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Enter Your Groq API Key
          </h2>
        </div>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="gsk_..."
          className="w-full px-4 py-2 bg-gray-800/50 text-purple-100 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-purple-300/50 transition-all duration-300 hover:border-purple-400 backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={!apiKey.trim()}
          className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-scale animate-glow disabled:animate-none"
        >
          Start Interview
        </button>
      </form>
    </div>
  );
}