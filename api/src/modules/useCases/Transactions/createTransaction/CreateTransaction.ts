import { balanceShot, invalidTransactionAccount, passwordInvalid, sessionExpired, shotValue, userSelctedNotExist } from "../../../../messages/messages";
import { checkBalance } from "../../../resquestAndValidate/accounts/checkBalance";
import { updateBalance } from "../../../resquestAndValidate/accounts/updateBalance";
import { createTransaction } from "../../../resquestAndValidate/transactions/createTransaction";
import { findUserByUsername } from "../../../resquestAndValidate/users/findUserByUsername";
import { checkPassword } from "../../../resquestAndValidate/users/verifyUser";
import { findUserById } from "../../../repositories/usersRepository";

interface ICreateTransaction {
    userCashIn: string;
    value: number;
    userId: string;
    password: string;
}

export class CreateTransaction {
    async execute({ password, userCashIn, value, userId }: ICreateTransaction) {
        const creatAt = new Date().setHours(0, 0, 0, 0)
        const creatAtDateWithoutHours = new Date(creatAt);

        try {
            const verifyUser = await checkPassword(userId, password);
            const userCashInExist = await findUserByUsername(userCashIn);
            const findUserCashOut = await findUserById(userId);
            
            if (!verifyUser) {
                throw new Error(passwordInvalid.message);
            }

            if (!userCashInExist) {
                throw new Error(userSelctedNotExist.message);
            }

            if (!findUserCashOut) {
                throw new Error(sessionExpired.message);
            }
            
            if (value <= 0) {
                throw new Error(shotValue.message);
            }
            
            if (userId === userCashInExist.id) {
                throw new Error(invalidTransactionAccount.message);
            }
            
            const checkBalanceEnough = await checkBalance(findUserCashOut.id, value);
            if (!checkBalanceEnough) {
                throw new Error(balanceShot.message);
            }

            const transaction = await createTransaction(value, findUserCashOut.accountId, userCashInExist.accountId, creatAtDateWithoutHours);
            const debitedBalance = await updateBalance(value, findUserCashOut.accountId, true)
            const creditedBalance = await updateBalance(value, userCashInExist.accountId, false)

            return transaction;
        } catch (error) {
            let result = error as Error;
            return new Error(result.message);
        }
    }
}
