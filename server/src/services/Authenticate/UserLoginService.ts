import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../repositories/UsersRepository';

interface IAuthenticateRequest {
  emailOrCpf: string;
  password: string;
}

export class AuthenticateUserService {
  public async authenticate({
    emailOrCpf,
    password,
  }: IAuthenticateRequest): Promise<{ token: string }> {
    const userRepository = getCustomRepository(UserRepository);

    // Verifica se é e-mail ou CPF e procura o usuário
    const user = await userRepository.findOne({
      where: [{ email: emailOrCpf }, { cpf: emailOrCpf }],
    });

    if (!user) {
      throw new Error('Incorrect email/CPF or password');
    }

    // Verifica se a senha é correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email/CPF or password');
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'secret',
      {
        expiresIn: '1d',
      }
    );

    return { token };
  }
}
