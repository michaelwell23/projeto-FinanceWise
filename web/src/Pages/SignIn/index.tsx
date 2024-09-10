import React, { useState } from 'react';

import { LoginContainer, LoginForm, LoginInput, LoginButton } from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao realizar login');
        return;
      }

      const data = await response.json();
      console.log('Login realizado com sucesso:', data);

      // Armazenar token ou redirecionar
      localStorage.setItem('token', data.token);
      // redirecionar o usuário após login
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erro na requisição de login:', error);
      setError('Erro ao realizar login. Tente novamente.');
    }
  };

  return (
    <LoginContainer>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin}>
        <LoginInput
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoginInput
          type='password'
          placeholder='Senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <LoginButton type='submit'>Entrar</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
