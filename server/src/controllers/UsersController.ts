import { Request, Response } from 'express';
import { UserServices } from '../services/UsersService';
import { userSchema, updateUserSchema } from '../validations/UserValidation';

import * as Yup from 'yup';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf, phone } = request.body;
    const avatar = request.file ? request.file.filename : undefined;

    await userSchema.validate(
      { name, email, password, cpf, phone },
      { abortEarly: false }
    );

    const userServices = new UserServices();

    try {
      const user = await userServices.createUser({
        name,
        email,
        password,
        cpf,
        phone,
      });

      const avatar_url = avatar
        ? `${request.protocol}://${request.get('host')}/uploads/${avatar}`
        : null;

      const userResponse = {
        ...user,
        avatar_url,
      };

      return response.status(201).json(userResponse);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({
          errors: error.errors,
        });
      }

      return response.status(400).json({ error: error.message });
    }
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listUsersService = new UserServices();

    try {
      const users = await listUsersService.getAllUser();

      const usersWithAvatar = users.map((user) => ({
        ...user,
        avatar_url: user.avatar
          ? `${request.protocol}://${request.get('host')}/uploads/${
              user.avatar
            }`
          : null,
      }));

      return response.json(usersWithAvatar);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUserService = new UserServices();

    try {
      const user = await getUserService.getUser(id);

      if (!user) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      const userResponse = {
        ...user,
        avatar_url: user.avatar
          ? `${request.protocol}://${request.get('host')}/uploads/${
              user.avatar
            }`
          : null,
      };

      return response.json(userResponse);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, cpf, phone, oldPassword, newPassword } = request.body;
    const avatar = request.file ? request.file.filename : undefined;

    try {
      // Validar os dados de entrada
      await updateUserSchema.validate(
        { name, email, cpf, phone, oldPassword, newPassword },
        { abortEarly: false }
      );

      const updateUserService = new UserServices();

      const user = await updateUserService.updateUser({
        id,
        name,
        email,
        cpf,
        phone,
        oldPassword,
        newPassword,
        avatar,
      });

      const avatar_url = user.avatar
        ? `${request.protocol}://${request.get('host')}/uploads/${user.avatar}`
        : null;

      const userResponse = {
        ...user,
        avatar_url,
      };

      return response.json(userResponse);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({
          errors: error.errors,
        });
      }
      return response.status(400).json({ error: error.message });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = new UserServices();

    try {
      await deleteUserService.deleteUser(id);
      return response
        .status(200)
        .json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
