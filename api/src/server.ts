import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
    }
    return res
        .status(500)
        .json({ status: "erro", message: "Erro interno do Servidor" });
});


app.listen(3000, () => console.log("Servidor rodando"));