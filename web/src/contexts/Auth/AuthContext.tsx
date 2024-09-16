import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextData {
  signed: boolean;
  signIn(): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [signed, setSigned] = useState(false);

  function signIn() {
    // Simulação de login bem-sucedido
    setSigned(true);
  }

  function signOut() {
    setSigned(false);
  }

  return (
    <AuthContext.Provider value={{ signed, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
