import { compare } from "bcrypt";
import { prisma } from "../../../dataBase/prismaClient";

export async function checkPassword(userId: string, password: string): Promise<boolean> {
    const findUser = await prisma.users.findUnique({
        where: {
            id: userId
        }
    });

    if (!findUser) {
        return false;
    }

    try {
        const verifyUser = await compare(password, findUser.password);
        return verifyUser;
    } catch (error) {
        console.error(`Error comparing passwords for user ${userId}: ${error}`);
        return false;
    }
}
