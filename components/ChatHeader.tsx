
import React from 'react';
import { type User } from '../types';
import { SettingsIcon, LogoutIcon, LeadsIcon, WebsiteIcon, HcpIcon, BasecampIcon, EmailIcon } from './icons';

interface ChatHeaderProps {
  currentUser: User | null;
  onToggleSettings: () => void;
  onLogout: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ currentUser, onToggleSettings, onLogout }) => {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-4 border-b border-slate-200 flex-shrink-0 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img
          src="https://raw.githubusercontent.com/riquelima/Blue-Angels-Cleaning/main/logoTransparentbe.png"
          alt="Logo"
          className="w-24 h-auto"
        />
        <div>
          <h1 className="text-base font-semibold text-slate-800">Meu Assistente Virtual 🤖</h1>
          <div className="flex items-center mt-1">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
            <p className="text-sm font-medium text-slate-500">Online - Assistente IA</p>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-wrap justify-end gap-2">
        <button 
          onClick={() => handleLinkClick('https://docs.google.com/spreadsheets/d/1Kg91cQ4fD6zICE0aOhNIfBY4VluL0ehhQg7Yoc59c54/edit?gid=0#gid=0')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Abrir planilha de leads"
        >
          <LeadsIcon className="w-5 h-5" />
          <span>Leads</span>
        </button>
        <button 
          onClick={() => handleLinkClick('https://blueangelscleaning.com/')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Abrir site"
        >
          <WebsiteIcon className="w-5 h-5" />
          <span>Site</span>
        </button>
        <button 
          onClick={() => handleLinkClick('https://pro.housecallpro.com/app/log_in')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Abrir Housecall Pro"
        >
          <HcpIcon className="w-5 h-5" />
          <span>HCP</span>
        </button>
        <button 
          onClick={() => handleLinkClick('https://launchpad.37signals.com/signin')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Abrir Basecamp"
        >
          <BasecampIcon className="w-5 h-5" />
          <span>Basecamp</span>
        </button>
        {currentUser?.username === 'blue' && (
            <>
              <button 
                onClick={() => handleLinkClick('https://geradortemplatesblueangels.vercel.app/')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Abrir Email Templates"
              >
                <EmailIcon className="w-5 h-5" />
                <span>Email Templates</span>
              </button>
              <button 
                onClick={onToggleSettings}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Abrir configurações"
              >
                <SettingsIcon className="w-6 h-6" />
              </button>
            </>
        )}
        <button 
          onClick={onLogout}
          className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Sair"
        >
          <LogoutIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
