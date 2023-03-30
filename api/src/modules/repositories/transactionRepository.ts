import { prisma } from "../../dataBase/prismaClient";

export async function findTransactionsByAccountId(accountId: string) {
  return prisma.transactions.findMany({
    where: {
      OR: [
        {
          debitedAccountId: accountId,
        },
        {
          creditedAccountId: accountId,
        },
      ],
    },
  });
}
