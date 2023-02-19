import { FindBalance } from "../modules/useCases/Account/findBalance/FindBalance";
import { Request, Response } from "express";

export class FindBalanceController {
    async handle(req: Request, res: Response) {
        const findBalance = new FindBalance();
        const { userId } = req;
        
    }
}