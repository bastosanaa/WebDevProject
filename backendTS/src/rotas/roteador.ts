import { Router, Request, Response, NextFunction } from "express";
import { verificaToken } from "../middleware/verificaToken";
import tryCatch from "../utils/tryCatch";

const roteador = Router();

import  controladorUsuario  from '../controladores/controladorUsuario';

// ❗❗❗ adicionar VerificaToken para as rotas privadas
//Roteador Usuário
import roteadorUsuario from './usuarios';
roteador.use('/usuarios',verificaToken, roteadorUsuario);

//Roteador Tarefa
import roteadorTarefa from './tarefas';
roteador.use('/tarefas',verificaToken, roteadorTarefa);

//Roteador Notificação
import roteadorNotificacao from './notificacoes'
roteador.use('/notificacoes',verificaToken, roteadorNotificacao)

//Login
roteador.route('/autenticacao/usuarios').post((req: Request, res: Response, next: NextFunction) => {
    tryCatch(req, res, next, controladorUsuario.login);
});

roteador.route("/novousuario/post").post(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.create)
    });

export default roteador

