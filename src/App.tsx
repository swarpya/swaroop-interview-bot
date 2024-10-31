import React, { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import ApiKeyInput from './components/ApiKeyInput';
import { streamResponse } from './lib/chat';
import type { ChatState, Language, Message } from './types';

function App() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    selectedLanguage: null,
    apiKey: null,
  });

  const handleApiKeySubmit = (apiKey: string) => {
    setState(prev => ({ ...prev, apiKey }));
  };

  const handleLanguageSelect = async (language: Language) => {
    setState((prev) => ({ ...prev, selectedLanguage: language, messages: [], isLoading: true }));

    let fullResponse = '';
    try {
      for await (const chunk of streamResponse([], language, state.apiKey!)) {
        fullResponse += chunk;
        setState((prev) => ({
          ...prev,
          messages: [{ role: 'assistant', content: fullResponse }],
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!state.selectedLanguage || state.isLoading) return;

    const userMessage: Message = { role: 'user', content };
    const currentMessages = [...state.messages, userMessage];
    
    setState((prev) => ({
      ...prev,
      messages: currentMessages,
      isLoading: true,
    }));

    let fullResponse = '';
    try {
      for await (const chunk of streamResponse(currentMessages, state.selectedLanguage, state.apiKey!)) {
        fullResponse += chunk;
        setState((prev) => ({
          ...prev,
          messages: [...currentMessages, { role: 'assistant', content: fullResponse }],
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_50%)]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-4">
              <img 
                src="https://i.ibb.co/0VMkM1W/3d-circular-logo-of-robot-face-black-face-body-purple-outline-neon-green-eyes-pk0f2br621bws2iqa8il-0.png"
                alt="SWAROOP Logo"
                className="w-24 h-24 animate-float"
              />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent animate-pulse-purple">
                  SWAROOP
                </h1>
                <p className="text-purple-300 animate-slide-up mt-2">
                  Your Expert Programming Interview Assistant
                </p>
              </div>
            </div>
          </div>

          {!state.apiKey ? (
            <ApiKeyInput onSubmit={handleApiKeySubmit} />
          ) : (
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg shadow-purple-500/20 overflow-hidden border border-purple-500/20 animate-glow">
              <LanguageSelector
                selectedLanguage={state.selectedLanguage}
                onSelect={handleLanguageSelect}
              />
              
              <div className="h-[700px] flex flex-col">
                <ChatMessages messages={state.messages} />
                <ChatInput
                  onSend={handleSendMessage}
                  disabled={!state.selectedLanguage || state.isLoading}
                  isLoading={state.isLoading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;