import { prisma } from "../../../dataBase/prismaClient";
import { isSameDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export async function findTransactionsDate(findDate: Date) {


    const transactions = await prisma.transactions.findMany({
    });

    const zonedFindDate = utcToZonedTime(findDate, 'UTC');
    const filteredTransactions = transactions.filter(transaction =>
        isSameDay(transaction.creatAt, zonedFindDate)
    );

    return filteredTransactions;
}