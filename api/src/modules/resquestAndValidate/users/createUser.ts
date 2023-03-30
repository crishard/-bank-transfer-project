import { prisma } from "../../../dataBase/prismaClient";

export interface User {
    username: string;
    password: string;
    accountId: string;
}

export async function createUser(user: User) {
    return prisma.users.create({
        data: user,
    });
}