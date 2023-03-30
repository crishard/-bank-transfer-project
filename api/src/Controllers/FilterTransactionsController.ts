import { Request, Response } from "express";
import { FiltersTransactions } from "../modules/useCases/Transactions/findTransaction/filterTransactions/FilterTransactions";

export class FiltersTransactionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { cashIn, findDate } = req.body;
    const { userId } = req;

    try {
      const filtersTransactions = new FiltersTransactions();
      const filteredTransactions = await filtersTransactions.execute({
        userId,
        cashIn,
        findDate,
      });

      return res.status(200).json(filteredTransactions);
    } catch (error) {
      let result = error as Error
      return res.status(400).json(result.message);
    }
  }
}
