import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

interface ICreateUser {
  fullName: string;
  email: string;
  password: string;
  description: string;
  skills: string[];
  experience: string;
  location: string;
}

export class UsersService {
  private userRepository = getRepository(User);

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }

  async createUser({
    fullName,
    email,
    password,
    skills,
    experience,
    description,
    location,
  }: ICreateUser) {
    const userExists = await this.userRepository.findOne({
      email,
    });

    if (userExists) {
      return userExists;
    }

    const user = this.userRepository.create({
      fullName,
      email,
      password,
      skills,
      experience,
      description,
      location,
    });

    await this.userRepository.save(user);

    return user;
  }
}
