import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UserRepository';
import { hash, compare } from 'bcryptjs';
import * as Yup from 'yup';

interface IUserUpdateRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  avatar?: string;
}

export class UserUpdateService {
  public async updateUser({
    id,
    name,
    email,
    password,
    oldPassword,
    avatar,
  }: IUserUpdateRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('Invalid email format'),
      password: Yup.string().min(
        6,
        'Password must be at least 6 characters long'
      ),
      oldPassword: Yup.string().when('password', (password, schema) => {
        return password
          ? schema.required(
              'Current password is required to set a new password'
            )
          : schema;
      }),
    });

    await schema.validate(
      { name, email, password, oldPassword },
      { abortEarly: false }
    );

    if (email && email !== user.email) {
      const emailExists = await userRepository.findOne({ email });
      if (emailExists) {
        throw new Error('Email already in use');
      }
      user.email = email;
    }

    if (avatar) user.avatar = avatar;
    if (name) user.name = name;

    if (password && oldPassword) {
      if (user.password) {
        const passwordMatch = await compare(oldPassword, user.password);
        if (!passwordMatch) {
          throw new Error('Old password does not match');
        }
        user.password = await hash(password, 10);
      } else {
        throw new Error('User does not have an existing password set');
      }
    }

    await userRepository.save(user);

    const { password: _, ...userResponse } = user;
    return userResponse;
  }
}
