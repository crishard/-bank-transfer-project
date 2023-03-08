import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { internalError } from "./messages/messages";
import  routes  from "./routers";


const app = express();
app.use(express.json());

app.use(cors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
    }
    return res
        .status(500)
        .json({ status: "erro", message: internalError });
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Servidor rodando "));