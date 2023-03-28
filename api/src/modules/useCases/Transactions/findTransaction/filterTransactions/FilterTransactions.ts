import { prisma } from "../../../../../dataBase/prismaClient";
import { userTokenIsInvalid } from "../../../../../messages/messages";


interface IFiltersTransaction {
    userId: string;
    cashIn: boolean;
    findDate: string;
}

export class FiltersTransactions {
    async execute({ userId, cashIn, findDate }: IFiltersTransaction) {

        const findUserTransactions = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });

        if (findUserTransactions) {

            // Somente CashIn 
            if (cashIn) {
                const findTransactionCredited = await prisma.transactions.findMany({
                    where: {
                        creditedAccountId: {
                            equals: findUserTransactions.accountId
                        },
                    }
                });

                return findTransactionCredited;

                // somente CashOut
            }
            if (findDate) {

                const dbTransactions = await prisma.transactions.findMany({
                });


                const filteredTransactions = dbTransactions.filter((transaction) => {
                    const dbDate = new Date(transaction.creatAt);
                    const normalizedDbDate = dbDate.toISOString().slice(0, 10);

                    const formattedFindDate = new Date(findDate).toISOString().slice(0, 10);

                    return normalizedDbDate === formattedFindDate;
                });

                return filteredTransactions;

                // Data e CashIn
            }
            if (findDate && cashIn) {
                const findTransactionsCreateAtAndCredited = await prisma.transactions.findMany({
                    where: {
                        creditedAccountId: findUserTransactions.accountId
                    }
                });

                const filteredTransactionsCreatAtAndCredited = findTransactionsCreateAtAndCredited.filter((transaction) => {
                    const dbDate = new Date(transaction.creatAt);
                    const normalizedDbDate = dbDate.toISOString().slice(0, 10);

                    const formattedFindDate = new Date(findDate).toISOString().slice(0, 10);

                    return normalizedDbDate === formattedFindDate;
                });

                return filteredTransactionsCreatAtAndCredited;
            }
            // Data e CashOut
            if (findDate && !cashIn) {
                const findTransactionsCreateAtAndDebited = await prisma.transactions.findMany({
                    where: {
                        debitedAccountId: findUserTransactions.accountId
                    }
                });

                const filteredTransactionsCreatAtAndDebited = findTransactionsCreateAtAndDebited.filter((transaction) => {
                    const dbDate = new Date(transaction.creatAt);
                    const normalizedDbDate = dbDate.toISOString().slice(0, 10);

                    const formattedFindDate = new Date(findDate).toISOString().slice(0, 10);

                    return normalizedDbDate === formattedFindDate;
                });

                return filteredTransactionsCreatAtAndDebited;

            }
            if (!cashIn) {
                const findTransactionDebited = await prisma.transactions.findMany({
                    where: {
                        debitedAccountId: {
                            equals: findUserTransactions.accountId
                        }
                    }
                });
                return findTransactionDebited;
            }
        } else {
            return new Error(userTokenIsInvalid.message)
        }
    }
}