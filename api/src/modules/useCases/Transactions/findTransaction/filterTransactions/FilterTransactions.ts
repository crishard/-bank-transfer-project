import { prisma } from "../../../../../dataBase/prismaClient";
import { userTokenIsInvalid } from "../../../../../messages/messages";

interface IFiltersTransaction {
    userId: string;
    cashIn: boolean;
    findDate: Date;
}

export class FiltersTransactions {
    async execute({ userId, cashIn, findDate }: IFiltersTransaction) {

        const findUserTransactions = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });

        if (findUserTransactions) {
            if (cashIn) {
                const findTransactionCredited = await prisma.transactions.findMany({
                    where: {
                        creditedAccountId: {
                            equals: findUserTransactions.accountId
                        },
                    }
                });

                return findTransactionCredited;

            } else if (!cashIn) {
                const findTransactionDebited = await prisma.transactions.findMany({
                    where: {
                        debitedAccountId: {
                            equals: findUserTransactions.accountId
                        }
                    }
                });
                return findTransactionDebited;
            } else if (findDate) {
                const findTransactionsCreateAt = await prisma.transactions.findMany({
                    where: {
                        creatAt: {
                            equals: findDate
                        }
                    }
                });
                return findTransactionsCreateAt;

            } else if (findDate && cashIn) {
                const dateFinDate = new Date(findDate)
                const findTransactionsCreateAtAndCredited = await prisma.transactions.findMany({
                    where: {
                        AND: [
                            {
                                creatAt: {
                                    equals: dateFinDate
                                },
                                creditedAccountId: findUserTransactions.accountId
                            }
                        ]
                    }
                })
                return findTransactionsCreateAtAndCredited;

            }
            else if (findDate && !cashIn) {
                const findTransactionsCreateAtAndDebited = await prisma.transactions.findMany({
                    where: {
                        AND: [
                            {
                                creatAt: {
                                    equals: findDate
                                },
                                creditedAccountId: findUserTransactions.accountId
                            }
                        ]
                    }
                })
                return findTransactionsCreateAtAndDebited;
            }
        } else {
            return new Error(userTokenIsInvalid.message)
        }
    }
}