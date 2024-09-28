import { Request, Response } from 'express';
import { UserUpdateServices } from '../../services/UserServices/UpdateUser';
import * as Yup from 'yup';

export class UserUpdateController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, cpf, phone, oldPassword, newPassword } = request.body;
    const avatar = request.file?.filename;

    const updateUserService = new UserUpdateServices();

    // Validação de entrada
    const schema = Yup.object().shape({
      name: Yup.string().optional(),
      email: Yup.string().email('Invalid email format').optional(),
      cpf: Yup.string()
        .matches(/^\d{11}$/, 'CPF must have exactly 11 digits')
        .optional(),
      phone: Yup.string()
        .matches(/^\d{10,11}$/, 'Phone number must have 10 or 11 digits')
        .optional(),
      oldPassword: Yup.string().optional(),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .optional(),
    });

    try {
      // Valida os dados recebidos
      await schema.validate(
        {
          name,
          email,
          cpf,
          phone,
          oldPassword,
          newPassword,
        },
        { abortEarly: false }
      );

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

      const userResponse = {
        ...user,
        avatar_url: user.avatar
          ? `${request.protocol}://${request.get('host')}/uploads/${
              user.avatar
            }`
          : null,
      };

      return response.status(200).json(userResponse); // Código de status 200 para atualizações bem-sucedidas
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({ errors: error.errors });
      }

      return response.status(400).json({ error: 'Unexpected error occurred' });
    }
  }
}
