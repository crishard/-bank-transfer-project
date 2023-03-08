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
exports.updateBalance = void 0;
const prismaClient_1 = require("../../dataBase/prismaClient");
const messages_1 = require("../../messages/messages");
function updateBalance(value, userAccountId, debited) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountExist = yield prismaClient_1.prisma.accounts.findFirst({
            where: {
                id: {
                    equals: userAccountId
                }
            }
        });
        if ((accountExist === null || accountExist === void 0 ? void 0 : accountExist.balance) != null) {
            if (debited) {
                const countDebited = yield prismaClient_1.prisma.accounts.update({
                    where: {
                        id: userAccountId
                    },
                    data: {
                        balance: accountExist.balance - value
                    }
                });
                return countDebited;
            }
            else {
                const countCredited = yield prismaClient_1.prisma.accounts.update({
                    where: {
                        id: userAccountId
                    },
                    data: {
                        balance: accountExist.balance + value
                    }
                });
                return countCredited;
            }
        }
        else {
            return new Error(messages_1.transactionError.message);
        }
    });
}
exports.updateBalance = updateBalance;
