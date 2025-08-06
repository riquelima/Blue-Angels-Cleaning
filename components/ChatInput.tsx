import React, { useState } from 'react';
import { SendIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200 flex-shrink-0">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 w-full px-4 py-3 bg-slate-100 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow disabled:opacity-50 placeholder-slate-400"
          disabled={isLoading}
          aria-label="Digite sua mensagem"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-3 rounded-full text-white bg-sky-500 hover:bg-sky-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          aria-label="Enviar mensagem"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};