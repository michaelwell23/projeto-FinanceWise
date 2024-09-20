import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft,
  FiUser,
  FiCreditCard,
  FiMail,
  FiLock,
  FiPhone,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/apiClient';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationError from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import { Container, Content, AnimationContainer, BoxContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Completo obrigatório!'),
          email: Yup.string()
            .required('E-mail obrigatório!')
            .email('Digite email válido'),
          cpf: Yup.string().required('CPF obrigatório!'),
          phone: Yup.string().required('Telefone é obrigatório!'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/signin');

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
          description:
            'Utilize o seu email e senha para acesso, na página de login.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao realizar cadastro',
          description: 'Verifique os campos e tente novamente',
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <BoxContainer>
            <img src='logo.png' alt='Logo' />

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <h1>Cadastre-se</h1>

              <Input name='name' icon={FiUser} placeholder='Nome Completo' />
              <Input name='cpf' icon={FiCreditCard} placeholder='CPF' />
              <Input name='email' icon={FiMail} placeholder='E-mail' />
              <Input name='phone' icon={FiPhone} placeholder='Telefone' />
              <Input
                name='password'
                icon={FiLock}
                type='password'
                placeholder='Senha'
              />

              <Button type='submit'>Cadastrar</Button>
            </Form>

            <Link to='/signin'>
              <FiArrowLeft />
              Voltar para Login
            </Link>
          </BoxContainer>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
