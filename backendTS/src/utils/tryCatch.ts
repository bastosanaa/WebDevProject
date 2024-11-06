import { Request, Response, NextFunction } from "express";

//centralização do tratamento de erro nas requisições
async function tryCatch(req: Request, res: Response, next: NextFunction, controlador: (req: Request, res: Response) => Promise<void>) {
    try {
        await controlador(req, res);
    } catch (erro) {
        console.log("caiu no catch de erros", erro);
        next(erro);
    }
}

export default tryCatch