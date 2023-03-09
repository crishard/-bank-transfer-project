import { prisma } from "../../../../dataBase/prismaClient";
import * as bcrypt from "bcrypt";
import { passwordValid } from "../../../helpers/validatePassword";
import { passwordInvalidConfirm, shortPassword, invalidPassword, permissionDenied } from '../../../../messages/messages';

interface IAlterUser {
    userId: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export class AlterUser {
    async execute({ userId, username, password, confirmPassword }: IAlterUser) {

        const findUser = await prisma.users.findFirst({
            where: {
                id: {
                    equals: userId
                }
            }
        });
        if (!findUser) {
            return new Error(permissionDenied.message)
        } else {
            const validadePassword = await passwordValid(password)

            if (password.length < 8) {
                return new Error(shortPassword.message);
            } else if (validadePassword == false) {
                return new Error(invalidPassword.message)
            } else if (password != confirmPassword) {
                return new Error(passwordInvalidConfirm.message)
            } else {
                const hashPassword = await bcrypt.hash(password, 8);

                const updateUser = await prisma.users.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        username,
                        password,
                    }
                });
                return updateUser;
            }
        }
    }
}