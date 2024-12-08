import express, { Request, Response, NextFunction } from "express";
import controladorUsuario from "../controladores/controladorUsuario";
import tryCatch from "../utils/tryCatch";

// Criando o roteador do Express
const roteador = express.Router();

roteador.route("/update").patch(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.update)
    });

roteador.route("/delete").delete(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.delete)
    });

//altera lista de amigos do usuário
roteador.route("/addAmigo").patch(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.addAmigo)
    });

roteador.route("/removeAmigo").patch(
(req: Request, res: Response, next: NextFunction) => {
    tryCatch(req, res, next, controladorUsuario.removeAmigo)
});

//altera lista de tarefas em grupo do usuário
roteador.route("/addTarefaGrupo").patch(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.addEmTarefaEmGrupo);
    }
);

roteador.route("/removeTarefaGrupo").patch(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.removeTarefaEmGrupo);
    }
);

roteador.route("/getUsuario").get(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.get)
    });

export default roteador;
