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

       
    }
}