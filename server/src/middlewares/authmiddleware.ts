import { Request, Response, NextFunction, request, response } from 'express';
import { verifyToken } from '../config/auth';

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    return response
      .status(401)
      .json({ message: 'Access Denied: No Token Provided!' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return response.status(401).json({ message: 'Invalid Token!' });
  }

  request.user = decoded;
  next();
};
