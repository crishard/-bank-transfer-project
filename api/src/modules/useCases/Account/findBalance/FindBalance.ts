import { prisma } from "../../../../dataBase/prismaClient";

interface IFindBalance {
    userId: string;
}


export class FindBalance {
    async execute({ userId }: IFindBalance) {

        const findUser = await prisma.users.findFirst({
            where: {
                id: {
                    equals: userId
                }
            }
        });
        if (!findUser) {
            return new Error("Permissão negada!")
        } else {
            const findBalance = await prisma.accounts.findMany({
                where: {
                    id: {
                        equals: findUser.accountId
                    }
                }
            });
            return findBalance;
        }
    }
}