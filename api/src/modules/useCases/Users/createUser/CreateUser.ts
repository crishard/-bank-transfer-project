import { prisma } from "../../../../dataBase/prismaClient";
import * as bcrypt from "bcrypt";
import { passwordValid } from "../../../helpers/validatePassword";
import { userShortName, userExist, shortPassword, invalidPassword } from '../../../../messages/messages';

interface ICreateUser {
    name: string;
    password: string;
}

export class CreateUser {
    async execute({ name, password }: ICreateUser) {

        if (name.length < 3) {
            return new Error(userShortName.message);
        }

        const checkUser = await prisma.users.findFirst({
            where: {
                username: name
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
                        username: name,
                        password: hashPassword,
                        accountId: createAccount.id
                    },
                });
                return user;
            }
        }
    }
}