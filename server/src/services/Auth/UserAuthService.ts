import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UserRepository';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IAuthenticateRequest {
  email?: string;
  password?: string;
}

export class AuthService {
  public async authenticateUser({ email, password }: IAuthenticateRequest) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await compare(password, user.password || '');

    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const secret = process.env.JWT_SECRET || 'defaultSecret';

    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: process.env.EXPIRES_SECRET,
    });

    const { password: _, ...userResponse } = user;

    return { user: userResponse, token };
  }
}
