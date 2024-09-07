import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Response | void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: 'JWT token is missing',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '7');

    const { id } = decoded as ITokenPayload;

    request.user = {
      id,
    };

    return next();
  } catch (error) {
    return response.status(401).json({
      error: 'Ivalid JTW token',
    });
  }
}
