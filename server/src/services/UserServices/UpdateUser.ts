import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../../repositories/UsersRepository';
import { User } from '../../entities/User';

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

export class UserUpdateServices {
  public async updateUser({
    id,
    avatar,
    name,
    email,
    phone,
    cpf,
    oldPassword,
    newPassword,
  }: IUpdateUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (email && email !== user.email) {
      const userWithUpdatedEmail = await userRepository.findOne({
        where: { email },
      });

      if (userWithUpdatedEmail) {
        throw new Error('Email already is exists!.');
      }

      user.email = email;
    }

    if (oldPassword && newPassword) {
      const checkOldPassword = await hash(oldPassword, 8);
      if (checkOldPassword !== user.password) {
        throw new Error('Password already exists!');
      }

      user.password = await hash(newPassword, 8);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.cpf = cpf || user.cpf;
    user.phone = phone || user.phone;
    user.avatar = avatar;

    await userRepository.save(user);

    return user;
  }
}
