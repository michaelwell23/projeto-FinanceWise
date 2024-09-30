// tests/utils/generateToken.ts
import jwt from 'jsonwebtoken';

export const generateValidTokenForTesting = () => {
  const payload = { id: 'user-id', email: 'user@example.com' }; // Payload com informações do usuário
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });
  return token;
};
