import { compare } from "bcrypt";
import { prisma } from "../../dataBase/prismaClient";

export async function checkPassword(userId: string, password: string) {

    const findUser = await prisma.users.findUnique({
        where: {
            id: userId
        }
    });

    function verify(){
        if (findUser) {
            const verifyUser = compare(password, findUser.password);
            return verifyUser;
        }   
    }

    if (!verify) {
        return false;
    } else{
        return true;
    }
}