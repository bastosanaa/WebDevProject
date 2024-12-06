import express, { Request, Response, NextFunction } from "express";
import controladorNotificacao from "../controladores/controladorNotificacoes";
import tryCatch from "../utils/tryCatch";

// Criando o roteador do Express
const roteador = express.Router();


// Rota para criar uma nova notificação
roteador.route("/post").post(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorNotificacao.create)
    });

// Rota para atualizar o status ou a mensagem de uma notificação
// roteador.route("/update/:id").patch(
//     (req: Request, res: Response, next: NextFunction) => {
//         tryCatch(req, res, next, controladorNotificacao.update)
//     });

// Rota para deletar uma notificação
roteador.route("/delete/:id").delete(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorNotificacao.delete)
    });

// Rota para buscar uma notificação específica pelo ID

// Rota para buscar todas as notificações de um usuário
roteador.route("/getNotifications").get(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorNotificacao.getPorUsuario);
    }
);

// Rota para atualizar o status de uma notificação
roteador.route("/updateStatus/:id").patch(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorNotificacao.updateStatus);
    }
);

roteador.route("/:id").get(
    (req: Request, res: Response, next: NextFunction) => {
        tryCatch(req, res, next, controladorNotificacao.get)
    });

export default roteador;
