import { Request, Response } from "express";
import { CreateUser } from "../modules/useCases/Users/createUser/CreateUser";

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const { username, password} = req.body;
        const createUser = new CreateUser();
        const resultado = await createUser.execute({
            username,
            password,
        });
        if (resultado instanceof Error) {
            return res.status(400).json(resultado.message)
        }
        else if (resultado) {
            return res.status(200).json(resultado);
        }
        return res.json("Erro no servidor");
    }
}