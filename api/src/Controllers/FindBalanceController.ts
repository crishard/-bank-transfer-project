import { Request, Response } from "express";
import { FindBalance } from "../modules/useCases/Account/findBalance/FindBalance";

export class FindBalanceController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const findBalance = new FindBalance();
      const balance = await findBalance.execute({ userId });

      return res.status(200).json(balance);
    }

    catch (error) {
      let result = error as Error;

      return res.status(400).json(result.message || "Erro no servidor");
    }
  }
}
