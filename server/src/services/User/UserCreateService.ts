import * as Yup from 'yup';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../entities/User';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export class UserCreateServices {
  public async createUser({
    name,
    email,
    password,
  }: IUserRequest): Promise<{ user: User; token: string }> {
    const userRepository = getCustomRepository(UserRepository);

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
    });

    await schema.validate({ name, email, password }, { abortEarly: false });

    const userAlreadyExists = await userRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(password, 10);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      {
        expiresIn: process.env.EXPIRES_SECRET,
      }
    );

    return { user, token };
  }
}
