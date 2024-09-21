import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UsersRepository';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'object' && 'id' in decoded) {
      const { id } = decoded as JwtPayload;

      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne(id);

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      // Define o user na requisição
      req.user = user;

      return next();
    } else {
      return res.status(401).json({ error: 'Token inválido' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
