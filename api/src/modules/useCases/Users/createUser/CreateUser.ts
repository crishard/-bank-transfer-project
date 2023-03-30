import { passwordValid } from "../../../resquestAndValidate/password/validatePassword";
import { invalidPassword } from "../../../../messages/messages";
import { validateUsername } from "../../../resquestAndValidate/users/validateUsername"
import { checkUserExist } from "../../../resquestAndValidate/users/findUserByUsername";
import { hashPassword } from "../../../resquestAndValidate/password/hashPassword";
import { createAccount } from "../../Account/createAccount/CreateAccount";
import { User, createUser } from "../../../resquestAndValidate/users/createUser";

interface ICreateUser {
    username: string;
    password: string;
}

export class CreateUser {
    async execute({ username, password }: ICreateUser) {
        try {
            await validateUsername(username);
            await checkUserExist(username);

            const isValidPassword = await passwordValid(password);
            if (password.length < 8 || !isValidPassword) {
                throw invalidPassword;
            }

            const hashedPassword = await hashPassword(password);

            const account = await createAccount();

            const user: User = {
                username,
                password: hashedPassword,
                accountId: account.id,
            };
            const createdUser = await createUser(user);

            return createdUser;
        } catch (error) {
            throw error;
        }
    }
}