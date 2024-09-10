import React from 'react';
import {
  RegisterContainer,
  RegisterForm,
  RegisterInput,
  RegisterButton,
} from './styles';

const Register: React.FC = () => {
  return (
    <RegisterContainer>
      <h1>Cadastro</h1>
      <RegisterForm>
        <RegisterInput type='text' placeholder='Nome' />
        <RegisterInput type='email' placeholder='Email' />
        <RegisterInput type='password' placeholder='Senha' />
        <RegisterButton>Cadastrar</RegisterButton>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
