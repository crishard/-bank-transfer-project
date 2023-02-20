import { prisma } from "../../../../dataBase/prismaClient";
import { userNotExist, noMovement} from "../../../../messages/messages"
interface IFindTransaction {
    userId: string;
}

export class FindTransactions {
    async execute({ userId }: IFindTransaction) {


        const findUserTransactions = await prisma.users.findFirst({
            where: {
                id: {
                    equals: userId
                }
            }
        })
        if (findUserTransactions) {
            const findTransactions = await prisma.transactions.findMany({
                where: {
                    OR: [
                        {
                            debitedAccountId: findUserTransactions.accountId
                        },
                        {
                            creditedAccountId: findUserTransactions.accountId
                        }
                    ]
                }
            })
            if (findTransactions.length <= 0) {
                return new Error(noMovement.message)
            } else if(findTransactions.length > 0){
                return findTransactions;
            }
        } else {
            return new Error(userNotExist.message)
        }
        
    }
}