import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AuthProviderProps> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
