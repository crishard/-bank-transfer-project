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
exports.FindTransactions = void 0;
const prismaClient_1 = require("../../../../dataBase/prismaClient");
const messages_1 = require("../../../../messages/messages");
class FindTransactions {
    execute({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUserTransactions = yield prismaClient_1.prisma.users.findFirst({
                where: {
                    id: {
                        equals: userId
                    }
                }
            });
            if (findUserTransactions) {
                const findTransactions = yield prismaClient_1.prisma.transactions.findMany({
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
                if (findTransactions.length <= 0) {
                    return new Error(messages_1.noMovement.message);
                }
                else if (findTransactions.length > 0) {
                    return findTransactions;
                }
            }
            else {
                return new Error(messages_1.userNotExist.message);
            }
        });
    }
}
exports.FindTransactions = FindTransactions;
