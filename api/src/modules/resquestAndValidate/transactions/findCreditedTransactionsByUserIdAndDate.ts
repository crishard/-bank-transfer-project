import { prisma } from "../../../dataBase/prismaClient";

export async function findCreditedTransactionsByUserIdAndDate(userId: string, findDate: Date) {
    return prisma.transactions.findMany({
        where: {
            AND: [
                {
                    creditedAccountId: {
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

    console.log
}