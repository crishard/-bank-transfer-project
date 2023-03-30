import { prisma } from "../../dataBase/prismaClient";

export async function findUserById(userId: string) {
  const user = await prisma.users.findFirst({
    where: {
      id: {
        equals: userId
      }
    }
  });
  return user;
}
