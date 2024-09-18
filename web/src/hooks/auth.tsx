import React, { createContext, useCallback, useState, ReactNode } from 'react';
import api from '../services/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  cpf?: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  identifier: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@mindForge:token');
    const user = localStorage.getItem('@mindForge:user');

    console.log(user);

    try {
      if (token && user) {
        return { token, user: JSON.parse(user) };
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ identifier, password }: SignInCredentials) => {
      try {
        console.log('Sending request to API with:', { identifier, password });
        const response = await api.post('signin', {
          identifier,
          password,
        });

        console.log('API Response:', response);

        if (response.data) {
          const { token, user } = response.data;
          localStorage.setItem('@mindForge:token', token);
          localStorage.setItem('@mindForge:user', JSON.stringify(user));
          setData({ token, user });
        } else {
          console.error('No data in API response');
        }
      } catch (error) {
        console.error('Error during sign in:', error);
      }
    },
    []
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
