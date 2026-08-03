'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: 'recruiter' | 'candidate') => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'recruiter' | 'candidate') => Promise<void>;
  logout: () => Promise<void>;
  switchMode: (mode: 'recruiter' | 'candidate') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
    mode: 'candidate',
  });

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const user = await response.json();
          const mode = localStorage.getItem('vitae-mode') as 'recruiter' | 'candidate' || 'candidate';
          setAuthState({ user, isLoading: false, error: null, mode });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: 'recruiter' | 'candidate') => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const user = await response.json();
      localStorage.setItem('vitae-mode', role);
      setAuthState({ user, isLoading: false, error: null, mode: role });
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: error.message }));
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'recruiter' | 'candidate') => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const user = await response.json();
      localStorage.setItem('vitae-mode', role);
      setAuthState({ user, isLoading: false, error: null, mode: role });
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: error.message }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('vitae-mode');
      setAuthState({ user: null, isLoading: false, error: null, mode: 'candidate' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const switchMode = (mode: 'recruiter' | 'candidate') => {
    localStorage.setItem('vitae-mode', mode);
    setAuthState(prev => ({ ...prev, mode }));
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout, switchMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
