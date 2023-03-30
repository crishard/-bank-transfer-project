import { prisma } from "../../../dataBase/prismaClient";
import { userExist } from "../../../messages/messages";

export async function checkUserExist(username: string) {
    const checkUser = await prisma.users.findFirst({
        where: {
            username: username,
        },
    });

    if (checkUser) {
        throw userExist;
    }
}

export async function findUserByUsername(username: string) {
    const user = await prisma.users.findUnique({
        where: {
            username: username

        }
    })
    return user;
}
