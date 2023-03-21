import * as Yup from 'yup';

export const findTransactionValidate = Yup.object().shape({
    userCashIn: Yup.string().optional(),
    date: Yup.date().optional()
});