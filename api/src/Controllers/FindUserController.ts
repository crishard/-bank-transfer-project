import { FindUser } from "../modules/useCases/Users/findUser/FindUser";
import { Request, Response } from "express";

export class FindUserController {
    async handle(req: Request, res: Response) {

        const findUser = new FindUser();
        const { userId } = req;

        const resultado = await findUser.execute({
            userId
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