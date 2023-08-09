import { prisma } from "../../../dataBase/prismaClient";

export async function findCreditedTransactionsByUserIdAndDate(userId: string, findDate: string) {
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
                        equals: new Date(findDate)
                    }
                }
            ]
        }
    });

    console.log
}