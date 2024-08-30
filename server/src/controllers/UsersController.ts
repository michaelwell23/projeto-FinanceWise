import { Request, Response } from 'express';
import { UserServices } from '../services/UsersService';
import { userSchema, updateUserSchema } from '../validations/UserValidation';
import * as Yup from 'yup';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf, phone } = request.body;

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

      return response.status(201).json(user);
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
      return response.json(users);
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

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, cpf, phone, oldPassword, newPassword } = request.body;

    try {
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
      });

      return response.json(user);
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
