import { prisma } from "../../../../dataBase/prismaClient";

interface IFindBalance{
    userId: string;
}


export class FindBalance {
    async execute({ userId }: IFindBalance) {
  
        const findUser = await prisma.users.findFirst({
            where: {
              id: {
                equals: userId
              }
            }
          })
    }
  }