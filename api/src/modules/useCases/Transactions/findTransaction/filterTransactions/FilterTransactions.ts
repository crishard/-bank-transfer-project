import { prisma } from "../../../../../dataBase/prismaClient";
import { userTokenIsInvalid, emptyFilters, noMovement } from "../../../../../messages/messages";

interface IFiltersTransaction {
    userId: string;
    cashIn: boolean;
    cashOut: boolean;
    findDate: string;
}

export class FiltersTransactions {
    async execute({ userId, cashIn, cashOut, findDate }: IFiltersTransaction) {


        const findUserTransactions = await prisma.users.findFirst({
            where: {
                id: {
                    equals: userId
                }
            }
        });

        if (findUserTransactions) {
            if (cashIn) {
                const findFilterTransactions = await prisma.transactions.findMany({
                    where: {
                        creditedAccountId: {
                            equals: findUserTransactions.accountId
                        }
                    }
                });

                return findFilterTransactions;
            } else if (cashOut) {
                const findFilterTransactions = await prisma.transactions.findMany({
                    where: {
                        debitedAccountId: {
                            equals: findUserTransactions.accountId
                        }
                    }
                })
                return findFilterTransactions;
            } else if (findDate) {

                const dateCreateAt = await prisma.transactions.findFirst({
                    where: {
                        OR: [
                            {
                                debitedAccountId: findUserTransactions.accountId
                            },
                            {
                                creditedAccountId: findUserTransactions.accountId
                            }
                        ]
                    }
                });

                const createFindDate = new Date(findDate);
                if (!dateCreateAt) {
                    return new Error(noMovement.message)
                } else {
                    const findTransactionsCreateAt = await prisma.transactions.findMany({
                        where: {
                            creatAt: {
                                equals: createFindDate
                            }
                        }
                    })
                    return findTransactionsCreateAt;
                }
            } else {
                return new Error(emptyFilters.message)
            }
        } else {
            return new Error(userTokenIsInvalid.message)
        }
    }
}