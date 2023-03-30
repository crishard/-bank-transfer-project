import { Request, Response } from "express";
import { CreateUser } from "../modules/useCases/Users/createUser/CreateUser";
import {usernameAndPasswordRequired} from "../messages/messages"

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: usernameAndPasswordRequired });
      }
      const createUser = new CreateUser();
      const user = await createUser.execute({ username, password });

      return res.status(201).json(user);
    } catch (err) {
    let result = err as Error;
      return res.status(500).json(result.message);
    }
  }
}
