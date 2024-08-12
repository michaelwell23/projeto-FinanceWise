import bcrypt from 'bcrypt';
import { getCustomRepository, Repository } from 'typeorm';

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

interface IUpdatedUser {
  fullName?: string;
  email?: string;
  description?: string;
  skills?: string[];
  experience?: string;
  location?: string;
  currentPassword?: string;
  newPassword?: string;
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
      throw new Error('There is a registered user with this email');
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
      throw new Error('User does not exist!');
    }

    const userWithoutPassword = this.excludePassword(user);

    return userWithoutPassword;
  }

  public async updateUser(
    id: string,
    userData: IUpdatedUser,
    file?: Express.Multer.File
  ): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('User not found.');
    }

    if (userData.currentPassword) {
      const isPasswordValid = await bcrypt.compare(
        userData.currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error('Invalid data, please try again');
      }

      if (!userData.newPassword) {
        throw new Error('New password is required to update password.');
      }

      user.password = await bcrypt.hash(userData.newPassword, 10);
    } else if (userData.newPassword) {
      throw new Error('Old password is required to update password.');
    }

    if (file) {
      user.avatar = file.fieldname;
    }

    await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  public async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('User not found!');
    }

    await this.userRepository.remove(user);

    return true;
  }
}
