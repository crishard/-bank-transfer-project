import { prisma } from "../../dataBase/prismaClient";

export async function checkBalance(userId: string, value: number) {

    const findUser = await prisma.users.findUnique({
        where: {
            id: userId
        }
    });

    const findAccount = await prisma.accounts.findUnique({
        where: {
            id: findUser?.accountId
        }
    });

    if(findAccount){
        if(findAccount.balance != null  && findAccount.balance < value){
            return false
        } else{
            return true;
        }
    }
}