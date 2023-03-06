import { Request, Response } from "express";
import { CreateTransaction } from "../modules/useCases/Transactions/createTransaction/CreateTransaction";

export class CreateTransactionController {
    async handle(req: Request, res: Response) {
        const { userCashIn, value, password } = req.body;
        const {userId} = req;
        const createTransaction = new CreateTransaction();
        const resultado = await createTransaction.execute({
            userId,
            password,
            userCashIn,
            value
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