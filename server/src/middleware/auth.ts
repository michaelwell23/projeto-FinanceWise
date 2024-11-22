import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      response.status(401).json({ error: 'Token not provided' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'defaultSecret';

    const decoded = jwt.verify(token, secret) as { userId: string };

    request.userId = decoded.userId;

    next();
  } catch (error) {
    response.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authMiddleware;
