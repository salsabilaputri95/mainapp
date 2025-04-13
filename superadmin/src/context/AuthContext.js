// src/context/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('authToken');
      console.log('Token ditemukan:', token);
      if (token) {
        const isValid = await authService.validateToken(token);
        console.log('Token valid:', isValid);
        if (isValid) {
          const userData = localStorage.getItem('user');
          if (userData) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
          }
        } else {
          Cookies.remove('authToken');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (nikadmin, password) => {
    try {
      const response = await authService.login(nikadmin, password);
      console.log('Login response:', response);
      if (response.success) {
        const { token, user } = response.data;
        Cookies.set('authToken', token, { expires: 1 });
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
        router.push('/dashboard');
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Terjadi kesalahan saat login' };
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/authentication/sign-in');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};