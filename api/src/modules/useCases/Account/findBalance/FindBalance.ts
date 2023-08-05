import { PrismaClient } from '@prisma/client';
import { permissionDenied } from '../../../../messages/messages';

const prisma = new PrismaClient();

interface IFindBalance {
  userId: string;
}

export class FindBalance {
  async execute({ userId }: IFindBalance) {
    console.log(userId)
    const findUser = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      return new Error(permissionDenied.message);
    }

    const findBalance = await prisma.accounts.findFirst({
      where: {
        id: findUser.accountId,
      },
    });

    return findBalance;
  }
}
