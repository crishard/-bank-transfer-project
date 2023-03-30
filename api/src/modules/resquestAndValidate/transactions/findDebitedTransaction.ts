import { prisma } from "../../../dataBase/prismaClient";

export async function findDebitedTransactionsByUserId(userId: string) {
    return prisma.transactions.findMany({
        where: {
            debitedAccountId: {
                equals: userId
            },
        }
    });
}