import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'defaultSecret';
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      const { id } = decoded;

      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne(id);

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      req.user = user;

      return next();
    }

    return res.status(401).json({ error: 'Token inválido' });
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
