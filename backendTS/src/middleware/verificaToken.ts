import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface RequisicaoCustomizada extends Request {
    usuario_id?: string;
    usuario_nome?: string;
    usuario_email?: string;
}

export function verificaToken(req: RequisicaoCustomizada, res: Response, next: NextFunction): void {
    const token = req.header('Authorization');
    
    if (!token) {
        res.status(401).json({ msg: "Token não encontrado" });
        return;
    }

    try {
        const segredo = process.env.SEGREDO;
        if (!segredo) {
            throw new Error("Variável SEGREDO inválida");
        }

        interface PayloadToken {
            usuario_id: string;
            usuario_nome: string;
            usuario_email: string;
            [key: string]: any; // Outros campos do payload, se existirem
        }

        // Verifica e decodifica o token diretamente
        const verificado = jwt.verify(token, segredo as string) as PayloadToken;
        req.usuario_id = verificado.usuario_id;
        req.usuario_nome = verificado.usuario_nome;
        req.usuario_email = verificado.usuario_email;

        next(); // Passa para o próximo middleware ou rota
    } catch (erro) {
        console.log("Error no middleware:", erro);
        res.status(401).json({ msg: "Token Inválido" });
        return;
    }
}