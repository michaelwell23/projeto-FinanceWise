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

interface IUpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  oldPassword?: string;
  newPassword?: string;
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

  public async updateUser({
    id,
    name,
    email,
    cpf,
    phone,
    oldPassword,
    newPassword,
  }: IUpdateUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (oldPassword) {
      const passwordMatch = await hash(oldPassword, user.password);

      if (!passwordMatch) {
        throw new Error('A senha antiga está incorreta');
      }

      if (!newPassword) {
        throw new Error(
          'Nova senha é obrigatória se a senha antiga for fornecida'
        );
      }

      user.password = await hash(newPassword, 8);
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.cpf = cpf || user.cpf;
    user.phone = phone || user.phone;

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
