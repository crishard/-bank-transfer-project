import { Request, Response } from "express";
import { CreateUser } from "../modules/useCases/Users/createUser/CreateUser";

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, password} = req.body;
        const createUser = new CreateUser();
        const resultado = await createUser.execute({
            name,
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