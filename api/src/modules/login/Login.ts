import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ILoginUser {
  username: string;
  password: string;
}

export class LoginUser {
  async execute({ username, password }: ILoginUser): Promise<string> {


    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('A chave secreta JWT não foi definida nas variáveis de ambiente!');
      process.exit(1);
    }
    try {
      const user = await prisma.users.findUnique({
        where: { username },
      });

      if (!user) {
        throw new Error("Usuário não cadastrado");
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Senha inválida");
      }

      const token = sign({ username }, jwtSecret, {
        subject: user.id.toString(),
        expiresIn: "1d",
      });

      return token;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      await prisma.$disconnect();
    }
  }
}
