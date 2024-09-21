import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationError from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface SignInFormData {
  identifier: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          identifier: Yup.string().required(
            'Identificador (e-mail ou CPF) obrigatório'
          ),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ identifier: data.identifier, password: data.password });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src='logo.png' alt='logo' />
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <h1>Faça seu Login</h1>
            <Input
              name='identifier'
              icon={FiMail}
              type='text'
              placeholder='E-mail ou CPF'
            />
            <Input
              name='password'
              icon={FiLock}
              type='password'
              placeholder='Senha'
            />
            <Button type='submit'>Entrar</Button>
            <Link to='/forgot-password'>Esqueci minha senha</Link>
          </Form>
          <Link to='/signup'>
            <FiLogIn />
            Cadastrar conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
