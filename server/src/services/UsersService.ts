import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UsersRepository';
import { User } from '../entities/User';
import { hash } from 'bcrypt';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

export class UserServices {
  public async createUser({
    name,
    email,
    password,
    cpf,
    phone,
  }: IUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    if (!email) {
      throw new Error('Email is required');
    }

    const userAlreadyExists = await userRepository.findOne({ email });

    const hashadPassword = await hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashadPassword,
      cpf,
      phone,
    });

    await userRepository.save(user);

    return user;
  }

  public async getAllUser(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();

    return users;
  }

  public async getUser(id: string): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    return user;
  }
}
