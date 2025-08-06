
import React, { useState, useEffect } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { LoginScreen } from './components/LoginScreen';
import { type Message, Sender, type User, type NewUser } from './types';
import { getBotResponse } from './services/webhookService';
import { SettingsModal } from './components/SettingsModal';
import { supabase } from './services/supabaseClient';


const initialMessage: Message = {
      id: 'initial-1',
      sender: Sender.Bot,
      text: `Olá! 👋 Sou o assistente virtual da Blue Angels Cleaning Services. 🤖

Como posso te ajudar hoje? ✨`,
      timestamp: '09:52',
    };

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all users on initial load.
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data || []);
      }
    };
    fetchUsers();
  }, []);

  // Load chat history when the current user changes.
  useEffect(() => {
    if (currentUser) {
      try {
        const storedMessages = localStorage.getItem(`chat_history_${currentUser.username}`);
        setMessages(storedMessages ? JSON.parse(storedMessages) : [initialMessage]);
      } catch (e) {
        console.error("Failed to parse messages from localStorage", e);
        setMessages([initialMessage]);
      }
    }
  }, [currentUser]);

  // Save chat history when messages change.
  useEffect(() => {
    if (currentUser && isAuthenticated) {
      localStorage.setItem(`chat_history_${currentUser.username}`, JSON.stringify(messages));
    }
  }, [messages, currentUser, isAuthenticated]);

  const handleLogin = async (username: string, pass: string): Promise<boolean> => {
    const lowercasedUsername = username.toLowerCase();

    // New admin login
    if (lowercasedUsername === 'blue' && pass === 'Blue2025') {
        const { data: adminUser, error } = await supabase
          .from('users')
          .select('*')
          .eq('username', 'admin') // The user in DB is still 'admin'
          .single();

        if (error || !adminUser) {
            console.error('Admin login failed: Could not find admin user record in database.', error?.message);
            return false;
        }

        setCurrentUser(adminUser);
        setIsAuthenticated(true);
        return true;
    }
    
    // Explicitly block login with 'admin' username to enforce the change.
    if (lowercasedUsername === 'admin') {
      return false;
    }

    // Standard login for all other users
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', lowercasedUsername)
      .eq('password', pass)
      .single();
    
    if (error || !data) {
      console.error('Login failed:', error?.message);
      return false;
    }

    setCurrentUser(data);
    setIsAuthenticated(true);
    return true;
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const addUser = async (newUser: NewUser): Promise<boolean> => {
    const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('username')
        .eq('username', newUser.username.toLowerCase())
        .single();
    
    if (findError && findError.code !== 'PGRST116') { // PGRST116: "exact one row not found"
        console.error('Error checking for existing user:', findError);
        return false;
    }

    if (existingUser) {
        return false; // User already exists
    }
    
    const { data, error } = await supabase
        .from('users')
        .insert([{ ...newUser, username: newUser.username.toLowerCase() }])
        .select()
        .single();
    
    if (error) {
        console.error('Error adding user:', error);
        return false;
    }

    if (data) {
      setUsers(prev => [...prev, data]);
    }
    return true;
};


  const deleteUser = async (username: string) => {
    if (username === 'admin') return;
    
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('username', username);
      
    if (error) {
        console.error('Error deleting user:', error);
        return;
    }

    setUsers(prev => prev.filter(u => u.username !== username));
    localStorage.removeItem(`chat_history_${username}`);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const timestamp = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: Sender.User,
      text,
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const botText = await getBotResponse(text);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: Sender.Bot,
        text: botText,
        timestamp: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        sender: Sender.Bot,
        text: 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.',
        timestamp: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="bg-slate-100 h-screen font-sans flex items-center justify-center p-4">
      <div className="w-[95%] h-full bg-white flex flex-col overflow-hidden rounded-xl shadow-2xl border border-slate-200">
        <ChatHeader 
          currentUser={currentUser}
          onToggleSettings={() => setIsSettingsOpen(true)}
          onLogout={handleLogout}
        />
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        {currentUser?.username === 'admin' && (
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            users={users}
            addUser={addUser}
            deleteUser={deleteUser}
          />
        )}
      </div>
    </div>
  );
};

export default App;
