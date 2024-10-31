export type Language = 'C++' | 'JavaScript' | 'Python' | 'Java' | 'Ruby';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  selectedLanguage: Language | null;
  apiKey: string | null;
}