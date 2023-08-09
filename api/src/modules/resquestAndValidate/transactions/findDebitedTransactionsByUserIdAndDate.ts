import { prisma } from "../../../dataBase/prismaClient";

export async function findDebitedTransactionsByUserIdAndDate(userId: string, findDate: string) {
    return prisma.transactions.findMany({
        where: {
            AND: [
                {
                    debitedAccountId: {
                        equals: userId
                    },

                },
                {
                    creatAt: {
                        equals: new Date(findDate)
                    }
                }
            ]
        }
    });
}