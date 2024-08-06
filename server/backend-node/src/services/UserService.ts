import bcrypt from 'bcrypt';
import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';
import { error } from 'console';

interface ICreateUser {
  fullName: string;
  email: string;
  password: string;
  description: string;
  skills: string[];
  experience: string;
  location: string;
  avatar?: string;
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
    avatar,
  }: ICreateUser) {
    const userExists = await this.userRepository.findOne({
      email,
    });

    if (userExists) {
      throw new error('There is a registered user with this email');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      fullName,
      email,
      password: passwordHash,
      skills,
      experience,
      description,
      location,
      avatar,
    });

    await this.userRepository.save(user);

    return user;
  }
}
