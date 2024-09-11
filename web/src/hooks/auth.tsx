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
    const token = localStorage.getItem('@+clinicaSaude:token');
    const user = localStorage.getItem('@+clinicaSaude:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ identifier, password }: SignInCredentials) => {
      const response = await api.post('sessions', {
        identifier, // Pode ser CPF ou email
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('@+clinicaSaude:token', token);
      localStorage.setItem('@+clinicaSaude:user', JSON.stringify(user));

      setData({ token, user });
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
