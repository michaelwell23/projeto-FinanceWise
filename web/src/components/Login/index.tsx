import React from 'react';
import { LoginContainer, LoginForm, LoginInput, LoginButton } from './styles';

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <h1>Login</h1>
      <LoginForm>
        <LoginInput type='email' placeholder='Email' />
        <LoginInput type='password' placeholder='Senha' />
        <LoginButton>Entrar</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
