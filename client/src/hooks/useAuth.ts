import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface User {
  id: string;
  email: string;
  name: string;
  provider: 'google' | 'apple' | 'email';
  profileImageUrl?: string;
}

// Mock user data for demonstration
const MOCK_USERS = {
  'admin@myonsite.com': {
    id: '1',
    email: 'admin@myonsite.com',
    name: 'John Doe',
    provider: 'email' as const,
    profileImageUrl: 'https://via.placeholder.com/40'
  },
  'google.user@gmail.com': {
    id: '2',
    email: 'google.user@gmail.com',
    name: 'Google User',
    provider: 'google' as const,
    profileImageUrl: 'https://via.placeholder.com/40'
  },
  'apple.user@icloud.com': {
    id: '3',
    email: 'apple.user@icloud.com',
    name: 'Apple User',
    provider: 'apple' as const,
    profileImageUrl: 'https://via.placeholder.com/40'
  }
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS];
    if (!mockUser) {
      throw new Error('Invalid credentials');
    }

    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    setUser(mockUser);
    
    // Ensure state update is processed
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUser;
  };

  const loginWithProvider = async (provider: 'google' | 'apple'): Promise<User> => {
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser = provider === 'google' 
      ? MOCK_USERS['google.user@gmail.com']
      : MOCK_USERS['apple.user@icloud.com'];

    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    setUser(mockUser);
    
    // Ensure state update is processed
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUser;
  };

  const signup = async (email: string, password: string, name: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      provider: 'email',
      profileImageUrl: 'https://via.placeholder.com/40'
    };

    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithProvider,
    signup,
    logout
  };
}