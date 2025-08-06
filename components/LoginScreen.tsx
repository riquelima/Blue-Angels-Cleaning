

import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (user: string, pass: string) => Promise<boolean>;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const success = await onLogin(username, password);
    if (!success) {
      setError('Usuário ou senha inválidos.');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-slate-50 h-screen flex flex-col items-center justify-center font-sans text-slate-900 p-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center mb-6">
            <img 
              src="https://raw.githubusercontent.com/riquelima/Blue-Angels-Cleaning/main/logoTransparentbe.png" 
              alt="Logo"
              className="w-60 h-auto"
            />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Bem vindo</h1>
        <p className="text-slate-500 mb-8">Faça login para acessar o assistente.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-600 mb-2">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow placeholder-slate-400"
              placeholder="blue"
              aria-label="Campo de usuário"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-600 mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow placeholder-slate-400"
              placeholder="••••••••"
              aria-label="Campo de senha"
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <p role="alert" className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full mt-4 p-3 rounded-lg text-white font-semibold bg-sky-500 hover:bg-sky-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};