import { FiltersTransactions } from "../modules/useCases/Transactions/findTransaction/filterTransactions/FilterTransactions";
import {Request, Response } from "express";

export class FiltersTransactionsController {
    async handle(req: Request,res: Response) {
        const {cashIn, findDate} = req.body;
        const {userId} = req;
        const filtersTransactions = new FiltersTransactions();
        const resultado = await filtersTransactions.execute({
            userId,
            cashIn,
            findDate
        });
        if (resultado instanceof Error) {
            return res.json(resultado);
        }
        return res.json(resultado);
    }
}