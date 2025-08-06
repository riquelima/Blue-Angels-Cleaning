import React, { useState } from 'react';

interface SupabaseSetupProps {
  onSave: (url: string, key: string) => void;
}

export const SupabaseSetup: React.FC<SupabaseSetupProps> = ({ onSave }) => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && anonKey.trim()) {
      setIsLoading(true);
      onSave(url, anonKey);
      // No need to setIsLoading(false) as the component will be replaced
    }
  };

  return (
    <div className="bg-slate-50 h-screen flex flex-col items-center justify-center font-sans text-slate-900 p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <img 
            src="https://raw.githubusercontent.com/riquelima/studio/master/semfundoBlueCleaning.png" 
            alt="Logo"
            className="w-60 h-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2 text-slate-800">Configuração do Banco de Dados</h1>
        <p className="text-center text-slate-500 mb-8">
          Para começar, insira as credenciais da sua instância Supabase.
          <br />
          Você pode encontrá-las em "Project Settings" &gt; "API" no seu painel do Supabase.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="supabase-url" className="block text-sm font-medium text-slate-600 mb-2">
              Project URL
            </label>
            <input
              id="supabase-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow placeholder-slate-400"
              placeholder="https://exemplo.supabase.co"
              aria-label="Supabase Project URL"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="supabase-key" className="block text-sm font-medium text-slate-600 mb-2">
              Project API Key (anon public)
            </label>
            <input
              id="supabase-key"
              type="text"
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow placeholder-slate-400"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              aria-label="Supabase Anon Key"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full mt-4 p-3 rounded-lg text-white font-semibold bg-sky-500 hover:bg-sky-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              disabled={isLoading || !url.trim() || !anonKey.trim()}
            >
              {isLoading ? 'Salvando...' : 'Salvar e Continuar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};