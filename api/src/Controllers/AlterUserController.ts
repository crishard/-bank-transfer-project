import { Request, Response } from "express";
import { AlterUser } from "../modules/useCases/Users/alterUser/AlterUser";

export class AlterUserController {
    async handle(req: Request, res: Response) {
        const { username, password, confirmPassword } = req.body;
        const { userId } = req;
        const alterUser = new AlterUser();
        const resultado = await alterUser.execute({
            userId,
            username,
            password,
            confirmPassword
        });
        if (resultado instanceof Error) {
            return res.status(400).json(resultado.message)
        }
        return res.json(resultado);
    }
}