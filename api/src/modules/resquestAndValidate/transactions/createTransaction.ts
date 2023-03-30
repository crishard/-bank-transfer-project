import { prisma } from "../../../dataBase/prismaClient";

export async function createTransaction(value: number, debitedAccountId: string, creditedAccountId: string, creatAt: Date) {
    const transaction = await prisma.transactions.create({
        data: {
            creatAt: creatAt,
            value: value,
            debitedAccountId: debitedAccountId,
            creditedAccountId: creditedAccountId
        }
    });
    return transaction;
}