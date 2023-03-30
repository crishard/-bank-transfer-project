import * as bcrypt from "bcrypt";

export async function hashPassword(password: string) {
    const saltRounds = 8;
    return bcrypt.hash(password, saltRounds);
}