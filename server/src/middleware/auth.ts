import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response
        .status(401)
        .json({ error: 'Authorization header missing' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return response.status(401).json({ error: 'Malformed token' });
    }

    const token = parts[1];
    const secret = process.env.JWT_SECRET || 'defaultSecret';

    const decoded = jwt.verify(token, secret) as { userId: string };

    request.userId = decoded.userId;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ error: 'Token has expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({ error: 'Invalid token' });
    } else {
      return response.status(401).json({ error: 'Authentication failed' });
    }
  }
};
