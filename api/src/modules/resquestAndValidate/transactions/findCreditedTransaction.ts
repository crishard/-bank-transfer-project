import { prisma } from "../../../dataBase/prismaClient";

export async function findCreditedTransactionsByUserId(userId: string) {
    return prisma.transactions.findMany({
      where: {
        creditedAccountId: {
          equals: userId
        },
      }
    });
  }