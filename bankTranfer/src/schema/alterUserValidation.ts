import * as Yup from 'yup';

export const alterUSerValidation = Yup.object({
      username: Yup.string()
            .min(3, 'Nome de usuário muito curto')
            .required('O campo "Nome do usuário" é obrigatório.'),
      password: Yup.string()
            .required('O campo "Senha" é obrigatório.')
            .min(8, 'Precisa conter pelo menos 8 caracteres.')
            .matches(
                  /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/,
                  'Tente adicionar números e letras maiúsculas.'
            ),
      confirmPassword: Yup.string()
            .required('O campo "Senha" é obrigatório.')
            .min(8, 'Precisa conter pelo menos 8 caracteres.')
            .matches(
                  /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/,
                  'Tente adicionar números e letras maiúsculas.'
            )
            .oneOf([Yup.ref('password'),], 'A confirmação de senha não confere!')
});