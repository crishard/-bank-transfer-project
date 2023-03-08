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
exports.CreateTransaction = void 0;
const prismaClient_1 = require("../../../../dataBase/prismaClient");
const checkBalance_1 = require("../../../helpers/checkBalance");
const updateBalance_1 = require("../../../helpers/updateBalance");
const verifyUser_1 = require("../../../helpers/verifyUser");
class CreateTransaction {
    execute({ password, userCashIn, value, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUser = yield (0, verifyUser_1.checkPassword)(userId, password);
            //salvando data do creatAt sem considerar horário
            const creatAt = new Date().setHours(0, 0, 0, 0);
            const creatAtDateWithoutHours = new Date(creatAt);
            const userCashInExist = yield prismaClient_1.prisma.users.findUnique({
                where: {
                    username: userCashIn
                }
            });
            const findUserCashOut = yield prismaClient_1.prisma.users.findFirst({
                where: {
                    id: {
                        equals: userId
                    }
                }
            });
            if (!findUserCashOut) {
                return new Error("Sua seção expirou!");
            }
            else {
                if (value <= 0) {
                    return new Error("Selecione um valor para transação maior que 0!");
                }
                else if (!userCashInExist) {
                    return new Error("O usuário selecionado não existe");
                }
                else {
                    const checkBalanceEnough = yield (0, checkBalance_1.checkBalance)(userId, value);
                    if (!verifyUser) {
                        return new Error("Senha Inválida");
                    }
                    if (userId == userCashIn) {
                        return new Error("Você não pode realizar uma transação para sua própria conta!");
                    }
                    else if (checkBalanceEnough == false) {
                        return new Error("Você não tem saldo suficiente para realizar esta transação, por favor verifique o seu saldo!");
                    }
                    else {
                        const transaction = yield prismaClient_1.prisma.transactions.create({
                            data: {
                                creatAt: creatAtDateWithoutHours,
                                value: value,
                                debitedAccountId: findUserCashOut.accountId,
                                creditedAccountId: userCashInExist.accountId
                            }
                        });
                        const debitedBalance = yield (0, updateBalance_1.updateBalance)(value, findUserCashOut.accountId, true);
                        const creditedBalance = yield (0, updateBalance_1.updateBalance)(value, userCashInExist.accountId, false);
                        return transaction;
                    }
                }
            }
        });
    }
}
exports.CreateTransaction = CreateTransaction;
