import * as Yup from 'yup';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UsersRepository';
import { User } from '../../entities/User';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

export class UserCreateServices {
  public async createUser({
    name,
    email,
    password,
    cpf,
    phone,
  }: IUserRequest): Promise<{ user: User; token: string }> {
    const userRepository = getCustomRepository(UserRepository);

    // Validação de entrada de dados
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
      cpf: Yup.string()
        .required('CPF is required')
        .matches(/^\d{11}$/, 'CPF must have exactly 11 digits'),
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{10,11}$/, 'Phone number must have 10 or 11 digits'),
    });

    await schema.validate(
      { name, email, password, cpf, phone },
      { abortEarly: false }
    );

    // Verifica se o e-mail ou CPF já existe
    const userAlreadyExists = await userRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const cpfAlreadyExists = await userRepository.findOne({ cpf });
    if (cpfAlreadyExists) {
      throw new Error('User with this CPF already exists');
    }

    const hashedPassword = await hash(password, 10);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      phone,
    });

    await userRepository.save(user);

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'secret',
      {
        expiresIn: '1d',
      }
    );

    return { user, token };
  }
}
