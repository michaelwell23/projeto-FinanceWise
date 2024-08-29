import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
  cpf: Yup.string()
    .matches(/^\d{11}$/, 'CPF deve ter 11 dígitos')
    .required('CPF é obrigatório'),
  phone: Yup.string()
    .matches(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
    .required('Telefone é obrigatório'),
});

export const updateUserSchema = Yup.object().shape({
  name: Yup.string().optional(),
  email: Yup.string().email('E-mail inválido').optional(),
  cpf: Yup.string()
    .matches(/^\d{11}$/, 'CPF deve ter 11 dígitos')
    .optional(),
  phone: Yup.string()
    .matches(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
    .optional(),
  oldPassword: Yup.string().optional(),
  newPassword: Yup.string().when('oldPassword', {
    is: (val: string | undefined) => val !== undefined && val !== '', // Verifica se oldPassword está presente
    then: Yup.string()
      .required('Nova senha é obrigatória se a senha antiga for fornecida')
      .min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
    otherwise: Yup.string().notRequired(),
  }),
});
