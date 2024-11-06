import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface RequisicaoCustomizada extends Request {
    usuario?: string
}

function verificaToken(req: RequisicaoCustomizada, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({msg: "Token não encontrado"})
    }
    try {
        const segredo = process.env.SEGREDO;

        if (!segredo) {
            throw new Error("Variável SEGREDO inválida")
        }

        const verificado = jwt.verify(token, segredo as string) as {usuario_id : string};
        req.usuario = verificado.usuario_id;

        next()

    } catch (erro) {
        console.log("error no middleware", erro);
        return res.status(400).json({msg: "Token Inválido"})
    }
}