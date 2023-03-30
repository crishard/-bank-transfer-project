import { prisma } from "../../../../dataBase/prismaClient";

export async function createAccount() {
    return prisma.accounts.create({
        data: {
            balance: 100,
        },
    });
}