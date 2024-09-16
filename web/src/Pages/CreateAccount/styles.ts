import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px)
  }

  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  place-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromRight} 1.2s;
`;

export const BoxContainer = styled.div`
  background: #282828;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; /* Ajustei para ser um pouco maior */

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px; /* Tamanho da logo */
    margin-bottom: 15px; /* Espaço abaixo da logo */
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }

  form {
    margin: 40px 0;
    width: 100%;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: #f4ede8;
    }

    > a {
      color: #f4ede8;
      display: block;
      margin-top: 15px;
      text-decoration: none;
      transition: background-color 0.5s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;
    justify-content: center; /* Centralizando o link de "Voltar para login" */
    color: #94de5e;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: background-color 0.5s;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#94de5e')};
    }
  }
`;
