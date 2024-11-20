import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token =
      request.cookies.authToken || request.headers.authorization?.split(' ')[1];

    if (!token) {
      return response.status(401).json({ error: 'Token not provided' });
    }

    const secret = process.env.JWT_SECRET || 'defaultSecret';

    const decoded = jwt.verify(token, secret);

    request.user = decoded;
    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Invalid or expired token' });
  }
};
