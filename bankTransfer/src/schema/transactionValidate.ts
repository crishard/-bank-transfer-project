import * as Yup from 'yup';

export const transactionValidate = Yup.object().shape({
    userCashIn: Yup.string().min(3, 'Nome de usuário muito curto!')
    .required('O campo usuário é obrigatório!'),
    value: Yup.number()
        .min(1, 'O valor da transação tem que ser de pelo menos R$: 1.00')
        .required('O campo "Valor" é obrigatório.').typeError(""),
    password: Yup.string()
    .required('O campo "Senha" é obrigatório.')
    .min(8, 'Precisa conter pelo menos 8 caracteres.')
    .matches(
          /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/,
          'Tente adicionar números e letras maiúsculas.'
    )
});