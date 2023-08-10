import { prisma } from "../../../dataBase/prismaClient";
import { isSameDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export async function findDebitedTransactionsByUserIdAndDate(userId: string, findDate: Date) {


    const transactions = await prisma.transactions.findMany({
        where: {
            debitedAccountId: {
                equals: userId
            },
        }
    });
    const zonedFindDate = utcToZonedTime(findDate, 'UTC');
    const filteredTransactions = transactions.filter(transaction =>
        isSameDay(transaction.creatAt, zonedFindDate)
    );
    return filteredTransactions;
}