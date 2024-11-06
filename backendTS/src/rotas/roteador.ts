import { Router, Request, Response, NextFunction } from "express";
import tryCatch from "../utils/tryCatch";

const roteador = Router();

import  controladorUsuario  from '../controladores/controladorUsuario';
import  controladorTarefa  from '../controladores/controladorTarefa';

//Roteador Usuário
import roteadorUsuario from './usuarios';
roteador.use('/usuarios', roteadorUsuario);

//Roteador Tarefa
import roteadorTarefa from './tarefas';
roteador.use('/tarefas', roteadorTarefa);

//Login
roteador.route('/autenticacao/usuarios').post((req: Request, res: Response, next: NextFunction) => {
    tryCatch(req, res, next, controladorUsuario.login);
});

export default roteador

