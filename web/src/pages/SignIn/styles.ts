import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px)
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  max-width: 400px;
  background: #282828;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.3);
  animation: ${appearFromLeft} 1s;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  form {
    margin: 40px 0;
    width: 100%;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 24px;
      color: #f4ede8;
    }

    > a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.5s;

      &:hover {
        color: ${shade(0.2, '#94de5e')};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;
    color: #94de5e;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.5s;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#94de5e')};
    }
  }
`;
