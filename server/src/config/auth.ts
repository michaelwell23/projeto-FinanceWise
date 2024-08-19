import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || '3dadf10fa5783618e0c61879917c154f';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
