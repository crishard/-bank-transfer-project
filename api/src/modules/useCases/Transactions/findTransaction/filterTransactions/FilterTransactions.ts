import { prisma } from "../../../../../dataBase/prismaClient";
import { userTokenIsInvalid, emptyFilters, noMovement } from "../../../../../messages/messages";

interface IFiltersTransaction {
    userId: string;
    cashIn: boolean;
    findDate: Date;
}

export class FiltersTransactions {
    async execute({ userId, cashIn, findDate }: IFiltersTransaction) {

        const findUserTransactions = await prisma.users.findFirst({
            where: {
                id: {
                    equals: userId
                }
            }
        });


        if (cashIn) {
            const findTransactionCredited = await prisma.transactions.findFirst({
                where: {
                    creditedAccountId: {
                        equals: userId
                    }
                }
            });
            return findTransactionCredited
        }


        if (!cashIn) {
            const findTransactionDebited = await prisma.transactions.findFirst({
                where: {
                    debitedAccountId: {
                        equals: userId
                    }
                }
            });
            return findTransactionDebited
        }

        if (findUserTransactions) {
            if (findDate) {
                // const createFindDate = new Date(findDate);
                const findTransactionsCreateAt = await prisma.transactions.findMany({
                    where: {
                        creatAt: {
                            equals: findDate
                        }
                    }
                });

            } else if (findDate && cashIn) {
                const findTransactionsCreateAtAndCredited = await prisma.transactions.findMany({
                    where: {
                        AND: [
                            {
                                creatAt: {
                                    equals: findDate
                                },
                                creditedAccountId: userId
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
                                creditedAccountId: userId
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