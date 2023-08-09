import { prisma } from "../../../dataBase/prismaClient";

export async function findDebitedTransactionsByUserIdAndDate(userId: string, findDate: Date) {
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
                        equals: findDate
                    }
                }
            ]
        }
    });
}