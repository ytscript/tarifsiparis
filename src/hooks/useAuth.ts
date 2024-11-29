import { useState, useEffect } from 'react';
import type { User, AuthState } from '../types/auth';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const login = (email: string, password: string) => {
    // Simulate API call
    setTimeout(() => {
      const user: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      setAuth({
        user,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth(initialState);
  };

  const register = (email: string, password: string, name: string) => {
    // Simulate API call
    setTimeout(() => {
      const user: User = {
        id: '1',
        email,
        name,
      };
      setAuth({
        user,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    }, 1000);
  };

  return {
    ...auth,
    login,
    logout,
    register
  };
}