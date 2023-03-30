import { findUserById } from "../../../repositories/usersRepository";
import { findTransactionsByAccountId } from "../../../repositories/transactionRepository";
import { userNotExist } from "../../../../messages/messages";

interface IFindTransactions {
    userId: string;
}
export async function findTransactions({ userId }: IFindTransactions) {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error(userNotExist.message);
    }

    const transactions = await findTransactionsByAccountId(user.accountId);

    return transactions;
}
