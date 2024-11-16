import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UserRepository';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IAuthenticateRequest {
  email?: string;
  password?: string;
}

export class AuthService {
  public async authenticateUser({ email, password }: IAuthenticateRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const secret = process.env.JWT_SECRET || 'defaultSecret';

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: '8d',
    });

    const { password: _, ...userResponse } = user;

    return { user: userResponse, token };
  }
}
