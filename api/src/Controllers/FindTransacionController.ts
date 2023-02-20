import { FindTransactions } from "../modules/useCases/Transactions/findTransaction/FindTransaction";
import {Request, Response } from "express";

export class FindTransactionsController {
    async handle(req: Request,res: Response) {
        const findTransactions = new FindTransactions();
        const {userId} = req;
        const resultado = await findTransactions.execute({
            userId
        });
        if (resultado instanceof Error) {
            return res.json(resultado.message);
        } else if(resultado){
            return res.status(200).json(resultado);
        }
        return res.json("Error");
    }
}