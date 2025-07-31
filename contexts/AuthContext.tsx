import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/services/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const storedUser = await AsyncStorage.getItem('@VirtualStore:user');
      const storedToken = await AsyncStorage.getItem('@VirtualStore:token');

      if (storedUser && storedToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/login', { email, password });
      const { user, accessToken } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      await AsyncStorage.setItem('@VirtualStore:user', JSON.stringify(user));
      await AsyncStorage.setItem('@VirtualStore:token', accessToken);

      setUser(user);
    } catch (error) {
      throw new Error('Erro ao fazer login');
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@VirtualStore:user');
    await AsyncStorage.removeItem('@VirtualStore:token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isVisible, setIsVisible, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
