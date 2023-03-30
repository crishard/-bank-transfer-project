import { findTransactions } from "../modules/useCases/Transactions/findTransaction/FindTransaction";
import { Request, Response } from "express";

export class FindTransactionsController {
    async handle(req: Request, res: Response) {

        const { userId } = req;

        try {
            const transactions = await findTransactions({ userId });
            return res.status(200).json(transactions);
        } catch (err) {
            return res.status(500).json("Erro interno no servidor!");
        }
    }
}