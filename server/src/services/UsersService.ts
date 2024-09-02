import path from 'path';
import fs from 'fs';

import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UsersRepository';
import { User } from '../entities/User';
import { hash } from 'bcrypt';

import uploadConfig from '../config/multer';
interface IUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  avatar?: string;
}

interface IUpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  oldPassword?: string;
  newPassword?: string;
  avatar?: string;
}

export class UserServices {
  public async createUser({
    name,
    email,
    password,
    cpf,
    phone,
    avatar,
  }: IUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    if (!email) {
      throw new Error('Email is required');
    }

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const hashadPassword = await hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashadPassword,
      cpf,
      phone,
      avatar,
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

  public async updateUser({
    id,
    name,
    email,
    phone,
    cpf,
    oldPassword,
    newPassword,
    avatar,
  }: IUpdateUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (email && email !== user.email) {
      const userWithUpdatedEmail = await userRepository.findOne({
        where: { email },
      });

      if (userWithUpdatedEmail) {
        throw new Error('E-mail já está em uso.');
      }

      user.email = email;
    }

    if (oldPassword && newPassword) {
      const checkOldPassword = await hash(oldPassword, 8);
      if (checkOldPassword !== user.password) {
        throw new Error('Senha antiga incorreta.');
      }

      user.password = await hash(newPassword, 8);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.cpf = cpf || user.cpf;
    user.phone = phone || user.phone;

    await userRepository.save(user);

    if (avatar) {
      user.avatar = avatar;
    }

    await userRepository.save(user);

    return user;
  }

  public async deleteUser(id: string): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    await userRepository.remove(user);
  }
}
