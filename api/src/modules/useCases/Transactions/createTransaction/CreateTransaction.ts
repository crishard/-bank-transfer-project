import { prisma } from "../../../../dataBase/prismaClient";
import { checkBalance } from "../../../helpers/checkBalance";
import { updateBalance } from "../../../helpers/updateBalance";
import { checkPassword } from "../../../helpers/verifyUser";

interface ICreateTransaction {
    userCashIn: string;
    value: number;
    userId: string;
    password: string;
}

export class CreateTransaction {
    async execute({ password, userCashIn, value, userId }: ICreateTransaction) {

        const verifyUser = await checkPassword(userId, password);

        //salvando data do creatAt sem considerar horário
        const creatAt = new Date().setHours(0, 0, 0, 0)
        const creatAtDateWithoutHours = new Date(creatAt);

        const userCashInExist = await prisma.users.findFirst({
            where: {
                username: {
                    equals: userCashIn
                }
            }
        })

        const findUserCashOut = await prisma.users.findFirst({
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
                return new Error("Selecione um valor para transação maior que 0!")
            } else if (!userCashInExist) {
                return new Error("O usuário selecionado não existe")
            } else {

                const checkBalanceEnough = await checkBalance(findUserCashOut.id, value);

                if (!verifyUser) {
                    return new Error("Senha Inválida")
                }

                if (userId == userCashIn) {
                    return new Error("Você não pode realizar uma transação para sua própria conta!")
                }

                else if (checkBalanceEnough == false) {
                    return new Error("Você não tem saldo suficiente para realizar esta transação, por favor verifique o seu saldo!")
                }

                else {
                    const transaction = await prisma.transactions.create({
                        data: {
                            creatAt: creatAtDateWithoutHours,
                            value: value,
                            debitedAccountId: findUserCashOut.accountId,
                            creditedAccountId: userCashInExist.accountId
                        }
                    });
                    const debitedBalance = await updateBalance(value, findUserCashOut.accountId, true)
                    const creditedBalance = await updateBalance(value, userCashInExist.accountId, false)
                    return transaction;
                }
            }
        }
    }
}