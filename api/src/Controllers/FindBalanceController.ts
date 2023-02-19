import { FindBalance } from "../modules/useCases/Account/findBalance/FindBalance";
import { Request, Response } from "express";

export class FindBalanceController {
    async handle(req: Request, res: Response) {
        const findBalance = new FindBalance();
        const { userId } = req;
        const resultado = await findBalance.execute({
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