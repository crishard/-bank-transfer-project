// import { validateJWTToken } from "../../../../auth/AuthUser";
import { prisma } from "../../../../dataBase/prismaClient";

import { permissionDenied } from "../../../../messages/messages"

interface IFindUser {
    userId: string;
}

export class FindUser {
    async execute({ userId }: IFindUser) {

        const findUser = await prisma.users.findFirst({
            where: {
                id: {
                    equals: userId
                }
            }
        })

        if (!findUser) {
            return new Error(permissionDenied.message)
        } else {
            const resultado = await prisma.users.findUnique({
                where: {
                    id: userId
                }
            })
            return resultado;
        }
    }
}