import { userNotExist } from "../../../../../messages/messages";
import { findCreditedTransactionsByUserId } from "../../../../resquestAndValidate/transactions/findCreditedTransaction";
import { findCreditedTransactionsByUserIdAndDate } from "../../../../resquestAndValidate/transactions/findCreditedTransactionsByUserIdAndDate";
import { findDebitedTransactionsByUserId } from "../../../../resquestAndValidate/transactions/findDebitedTransaction";
import { findDebitedTransactionsByUserIdAndDate } from "../../../../resquestAndValidate/transactions/findDebitedTransactionsByUserIdAndDate";
import { findUserById } from "../../../../repositories/usersRepository";

interface IFiltersTransaction {
    userId: string;
    cashIn: boolean;
    findDate: Date;
}

export class FiltersTransactions {
    async execute({ userId, cashIn, findDate }: IFiltersTransaction) {

        const user = await findUserById(userId);

        if (!user) {
            throw new Error(userNotExist.message);
        }

        if (cashIn) {
            if (findDate) {
                const transactions = await findCreditedTransactionsByUserIdAndDate(user.accountId, findDate);
                return transactions;
            } else {
                const transactions = await findCreditedTransactionsByUserId(user.accountId);
                return transactions;
            }
        } else {
            if (findDate) {
                const transactions = await findDebitedTransactionsByUserIdAndDate(user.accountId, findDate);
                return transactions;
            } else {
                const transactions = await findDebitedTransactionsByUserId(user.accountId);
                return transactions;
            }
        }
    }
}
