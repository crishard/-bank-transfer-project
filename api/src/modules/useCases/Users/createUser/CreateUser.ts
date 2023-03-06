import { prisma } from "../../../../dataBase/prismaClient";
import * as bcrypt from "bcrypt";
import { passwordValid } from "../../../helpers/validatePassword";
import { userShortName, userExist, shortPassword, invalidPassword } from '../../../../messages/messages';

interface ICreateUser {
    username: string;
    password: string;
}

export class CreateUser {
    async execute({ username, password }: ICreateUser) {

        const checkUser = await prisma.users.findFirst({
            where: {
                username: username
            }
        })

        if (checkUser) {
            return new Error(userExist.message)
        } else {

            const validadePassword = await passwordValid(password)

            if (password.length < 8) {
                return new Error(shortPassword.message);
            } else if (validadePassword == false) {
                return new Error(invalidPassword.message)
            } else {
                const hashPassword = await bcrypt.hash(password, 8);
                const createAccount = await prisma.accounts.create({
                    data: {
                        balance: 100
                    }
                });
                const user = await prisma.users.create({
                    data: {
                        username: username,
                        password: hashPassword,
                        accountId: createAccount.id
                    },
                });
                return user;
            }
        }
    }
}