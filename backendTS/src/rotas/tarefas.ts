import express, { Request, Response, NextFunction } from "express";
import controladorTarefa from "../controladores/controladorTarefa";
import tryCatch from "../utils/tryCatch";

// Criando o roteador do Express
const roteador = express.Router();

roteador.route("/post").post(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorTarefa.create)
    });

roteador.route("/update/:id").patch(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorTarefa.update)
    });

roteador.route("/delete/:id").delete(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorTarefa.delete)
    });

roteador.route("/:id").get(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorTarefa.get)
    });

roteador.route("/getTasks").get(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorTarefa.getPorUsuario);
    }
);

roteador.route("/updateStatus/:id").patch(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorTarefa.updateStatusEmAndamento);
    }
);

export default roteador;
