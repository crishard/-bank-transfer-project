import { Request, Response } from "express";
import { LoginUser } from "../modules/login/Login";


export class LoginUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const loginUser = new LoginUser();
    const result = await loginUser.execute({
      username,
      password,
    });
    if (result instanceof Error) {
      return res.status(400).json(result.message)
    }
    return res.json(result);
  }
}