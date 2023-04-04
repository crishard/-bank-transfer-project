import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export class AuthMiddleware {
  public static async authenticate(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não existe" });
    }

    const [, token] = authHeader.split(" ");

    try {
      const { sub } = verify(token, "chavesecreta") as IPayload;
      req.userId = sub;
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido", token });
    }
  }
}
