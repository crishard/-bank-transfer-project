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

            
        }
    }
}