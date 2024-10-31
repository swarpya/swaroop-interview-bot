import React from 'react';
import { Code2 } from 'lucide-react';
import type { Language } from '../types';

const languages: Language[] = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];

type Props = {
  selectedLanguage: Language | null;
  onSelect: (language: Language) => void;
};

export default function LanguageSelector({ selectedLanguage, onSelect }: Props) {
  return (
    <div className="w-full max-w-md mx-auto mb-8 p-4 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="w-6 h-6 text-purple-400 animate-pulse-purple" />
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Select Programming Language
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {languages.map((language, index) => (
          <button
            key={language}
            onClick={() => onSelect(language)}
            style={{ animationDelay: `${index * 100}ms` }}
            className={`px-4 py-2 rounded-lg transition-all duration-300 animate-slide-up hover-scale ${
              selectedLanguage === language
                ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg scale-105 animate-glow'
                : 'bg-gray-800/50 text-purple-300 border border-purple-500/30 hover:border-purple-400 hover:shadow-purple-500/20 hover:shadow-lg backdrop-blur-sm'
            }`}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
}