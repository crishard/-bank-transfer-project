import { userNotExist } from "../../../../../messages/messages";
import { findCreditedTransactionsByUserId } from "../../../../resquestAndValidate/transactions/findCreditedTransaction";
import { findCreditedTransactionsByUserIdAndDate } from "../../../../resquestAndValidate/transactions/findCreditedTransactionsByUserIdAndDate";
import { findDebitedTransactionsByUserId } from "../../../../resquestAndValidate/transactions/findDebitedTransaction";
import { findDebitedTransactionsByUserIdAndDate } from "../../../../resquestAndValidate/transactions/findDebitedTransactionsByUserIdAndDate";
import { findUserById } from "../../../../repositories/usersRepository";
import { findTransactionsDate } from "../../../../resquestAndValidate/transactions/findTransactionDate";

interface IFiltersTransaction {
    userId: string;
    cashIn?: boolean;
    findDate?: Date;
}

export class FiltersTransactions {
    async execute({ userId, cashIn, findDate }: IFiltersTransaction) {

        const user = await findUserById(userId);

        if (!user) {
            throw new Error(userNotExist.message);
        }

        if (cashIn === undefined && findDate) {
            return await findTransactionsDate(findDate);
        }

        if (findDate) {
            if (cashIn) {
                return await findCreditedTransactionsByUserIdAndDate(user.accountId, findDate);
            } else {
                return await findDebitedTransactionsByUserIdAndDate(user.accountId, findDate);
            }
        } else {
            if (cashIn) {
                return await findCreditedTransactionsByUserId(user.accountId);
            } else {
                return await findDebitedTransactionsByUserId(user.accountId);
            }
        }
    }
}
