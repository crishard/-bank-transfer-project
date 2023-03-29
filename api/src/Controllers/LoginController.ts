import { Request, Response } from "express";
import { LoginUser } from "../modules/login/Login";


export class LoginUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const loginUser = new LoginUser();
    let result: string | Error;
    try {
      result = await loginUser.execute({ username, password });
      return res.json(result);
    } catch (error) {
      result = error as Error;
      return res.status(400).json(result.message);
    }
  }
}
