import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../repositories/UsersRepository';
import { User } from '../../entities/User';

interface IAuthenticateRequest {
  identifier: string;
  password: string;
}

export class AuthenticateUserService {
  public async authenticate({
    identifier,
    password,
  }: IAuthenticateRequest): Promise<{ token: string; user: User }> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      where: [{ email: identifier }, { cpf: identifier }],
    });

    if (!user) {
      throw new Error('Incorrect email/CPF or password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email/CPF or password');
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'secret',
      {
        expiresIn: '1d',
      }
    );

    return { user, token };
  }
}
