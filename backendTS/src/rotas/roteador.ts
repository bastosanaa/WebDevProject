import { Router, Request, Response, NextFunction } from "express";
import tryCatch from "../utils/tryCatch";

const roteador = Router();

import  controladorUsuario  from '../controladores/controladorUsuario';

// ❗❗❗ adicionar VerificaToken para as rotas privadas
//Roteador Usuário
import roteadorUsuario from './usuarios';
roteador.use('/usuarios', roteadorUsuario);

//Roteador Tarefa
import roteadorTarefa from './tarefas';
roteador.use('/tarefas', roteadorTarefa);

//Roteador Notificação
import roteadorNotificacao from './notificacoes'
roteador.use('/notificacoes', roteadorNotificacao)

//Login
roteador.route('/autenticacao/usuarios').post((req: Request, res: Response, next: NextFunction) => {
    tryCatch(req, res, next, controladorUsuario.login);
});

export default roteador

