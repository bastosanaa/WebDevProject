import express, { Request, Response, NextFunction } from "express";
import controladorUsuario from "../controladores/controladorUsuario";
import tryCatch from "../utils/tryCatch";

// Criando o roteador do Express
const roteador = express.Router();

roteador.route("/post").post(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.create)
    });

roteador.route("/update/:id").patch(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.update)
    });

roteador.route("/delete/:id").delete(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.delete)
    });

roteador.route("/:id").get(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.get)
    });

roteador.route("/addAmigo").patch(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorUsuario.addAmigo)
    });

    roteador.route("/removeAmigo").patch(
        (req: Request, res: Response, next: NextFunction) => {
            tryCatch(req, res, next, controladorUsuario.removeAmigo)
        });

export default roteador;
