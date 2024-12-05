import { Request } from 'express';

// Estendendo a interface Request para adicionar a propriedade usuarioId
declare global {
    namespace Express {
        interface Request {
            usuario_id?: any; // Adiciona a propriedade usuarioId
        }
    }
}