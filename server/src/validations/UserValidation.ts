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
