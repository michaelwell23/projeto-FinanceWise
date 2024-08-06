import bcrypt from 'bcrypt';
import { getCustomRepository, Repository } from 'typeorm';
import { error } from 'console';

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
  avatar?: string;
}

export class UsersService {
  private userRepository: Repository<User>;

  private excludePassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }

  public async createUser({
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

    return this.excludePassword(user);
  }

  public async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();

    const usersWithoutPassword = users.map((user) =>
      this.excludePassword(user)
    );

    return usersWithoutPassword;
  }

  public async getUserById(
    id: string
  ): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new error('User does not exist!');
    }

    const userWithoutPassword = this.excludePassword(user);

    return userWithoutPassword;
  }
}
