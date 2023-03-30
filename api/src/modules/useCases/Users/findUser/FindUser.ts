import { prisma } from "../../../../dataBase/prismaClient";
import { permissionDenied } from "../../../../messages/messages";

interface IFindUser {
    userId: string;
}
export class FindUser {
    async execute({ userId }: IFindUser) {
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true
            }
        });

        if (!user) {
            throw new Error(permissionDenied.message);
        }

        return user;
    }
}