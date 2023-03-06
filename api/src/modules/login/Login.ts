import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../dataBase/prismaClient";

interface ILoginUser {
  username: string;
  password: string;
}

export class LoginUser {
  async execute({ username, password }: ILoginUser) {
    //Receber a senha e password

    // Verificar Cliente Existe
    const user = await prisma.users.findFirst({
      where: { username },
    });
    if (!user) {
      return new Error("Usuário não cadastrado");
    }
    //Verificar se a senha está correta
    const compararSenha = await compare(password, user.password);

    if (!compararSenha) {
      return new Error("Senha invalida");
    }

    //Gerar umm token
    const token = sign({ username }, "chavesecreta", {
      subject: user.id,
      expiresIn: "1d",
    });

    return token;
  }
}