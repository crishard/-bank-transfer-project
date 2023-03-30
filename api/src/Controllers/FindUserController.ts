import { FindUser } from "../modules/useCases/Users/findUser/FindUser";
import { Request, Response } from "express";

export class FindUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req;
    const findUser = new FindUser();

    try {
      const user = await findUser.execute({ userId });
      return res.json(user);
    } catch (err) {
        const result = err as Error;
      return res.status(400).json({ error: result.message });
    }
  }
}

