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
exports.checkBalance = void 0;
const prismaClient_1 = require("../../dataBase/prismaClient");
function checkBalance(userId, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const findUser = yield prismaClient_1.prisma.users.findUnique({
            where: {
                id: userId
            }
        });
        const findAccount = yield prismaClient_1.prisma.accounts.findUnique({
            where: {
                id: findUser === null || findUser === void 0 ? void 0 : findUser.accountId
            }
        });
        if (findAccount) {
            if (findAccount.balance != null && findAccount.balance < value) {
                return false;
            }
            else {
                return true;
            }
        }
    });
}
exports.checkBalance = checkBalance;
