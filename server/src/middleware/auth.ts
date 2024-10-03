import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UsersRepository';

export default async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error('JWT secret is undefined');
    }

    const decoded = jwt.verify(token, secretKey);

    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      const { id } = decoded as JwtPayload;

      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne(id);

      if (!user) {
        return response.status(401).json({ error: 'Usuário não encontrado' });
      }

      request.user = { id };

      return next();
    } else {
      return response.status(401).json({ error: 'Token inválido' });
    }
  } catch (err) {
    return response.status(401).json({ error: 'Token inválido' });
  }
}
