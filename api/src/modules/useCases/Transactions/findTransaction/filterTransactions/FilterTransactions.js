"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersTransactions = void 0;
const prismaClient_1 = require("../../../../../dataBase/prismaClient");
const messages_1 = require("../../../../../messages/messages");
class FiltersTransactions {
    execute({ userId, cashIn, cashOut, findDate }) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUserTransactions = yield prismaClient_1.prisma.users.findFirst({
                where: {
                    id: {
                        equals: userId
                    }
                }
            });
            if (findUserTransactions) {
                if (cashIn) {
                    const findFilterTransactions = yield prismaClient_1.prisma.transactions.findMany({
                        where: {
                            creditedAccountId: {
                                equals: findUserTransactions.accountId
                            }
                        }
                    });
                    return findFilterTransactions;
                }
                else if (cashOut) {
                    const findFilterTransactions = yield prismaClient_1.prisma.transactions.findMany({
                        where: {
                            debitedAccountId: {
                                equals: findUserTransactions.accountId
                            }
                        }
                    });
                    return findFilterTransactions;
                }
                else if (findDate) {
                    const dateCreateAt = yield prismaClient_1.prisma.transactions.findFirst({
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
                        return new Error(messages_1.noMovement.message);
                    }
                    else {
                        const findTransactionsCreateAt = yield prismaClient_1.prisma.transactions.findMany({
                            where: {
                                creatAt: {
                                    equals: createFindDate
                                }
                            }
                        });
                        return findTransactionsCreateAt;
                    }
                }
                else {
                    return new Error(messages_1.emptyFilters.message);
                }
            }
            else {
                return new Error(messages_1.userTokenIsInvalid.message);
            }
        });
    }
}
exports.FiltersTransactions = FiltersTransactions;
