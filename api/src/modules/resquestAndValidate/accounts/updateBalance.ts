import { prisma } from "../../../dataBase/prismaClient";
import {transactionError} from "../../../messages/messages"

export async function updateBalance(value: number, userAccountId: string, debited: boolean) {

    const accountExist = await prisma.accounts.findFirst({
        where: {
            id: {
                equals: userAccountId
            }
        }
    });
    
    if (accountExist?.balance != null) {
        if (debited) {
            const countDebited = await prisma.accounts.update({
                where: {
                    id: userAccountId
                },
                data: {
                    balance: accountExist.balance - value
                }
            })
            return countDebited;
        } else {
            const countCredited = await prisma.accounts.update({
                where: {
                    id: userAccountId
                },
                data: {
                    balance: accountExist.balance + value
                }
            });
            return countCredited;
        }
    } else{
        return new Error(transactionError.message);
    }
}