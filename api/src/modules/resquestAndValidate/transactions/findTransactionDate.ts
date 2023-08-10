import { prisma } from "../../../dataBase/prismaClient";
import { startOfDay, endOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export async function findTransactionsDate(findDate: Date) {

    const zonedFindDateStart = startOfDay(utcToZonedTime(findDate, 'UTC'));
    const zonedFindDateEnd = endOfDay(utcToZonedTime(findDate, 'UTC'));

    const transactions = await prisma.transactions.findMany({
        where: {
            creatAt: {
                gte: zonedFindDateStart,
                lte: zonedFindDateEnd,
            },
        },
    });
    return transactions;
}