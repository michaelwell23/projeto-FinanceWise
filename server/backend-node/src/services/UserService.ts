import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export class UsersService {
  private userRepository = getRepository(User);

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }

  async create({ name, email, password }: ICreateUser) {
    const userExists = await this.userRepository.findOne({
      email,
    });

    if (userExists) {
      return userExists;
    }

    const user = this.userRepository.create({
      name,
      email,
      password,
    });

    await this.userRepository.save(user);

    return user;
  }
}
