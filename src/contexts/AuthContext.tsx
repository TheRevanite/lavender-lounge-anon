
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  joinAnonymously: (username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login
    setIsLoading(true);
    try {
      // This would be replaced with actual authentication logic
      const user: User = {
        id: `user-${Date.now()}`,
        username: email.split('@')[0],
        isAnonymous: false,
        isOnline: true,
      };
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    // Simulate signup
    setIsLoading(true);
    try {
      // This would be replaced with actual registration logic
      const user: User = {
        id: `user-${Date.now()}`,
        username,
        isAnonymous: false,
        isOnline: true,
      };
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const joinAnonymously = async (username: string) => {
    const anonymousUser: User = {
      id: `anon-${Date.now()}`,
      username: username || `Guest-${Math.floor(Math.random() * 1000)}`,
      isAnonymous: true,
      isOnline: true,
    };
    setCurrentUser(anonymousUser);
    // We don't save anonymous users to localStorage
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser && !currentUser.isAnonymous,
        isLoading,
        login,
        signup,
        logout,
        joinAnonymously,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
