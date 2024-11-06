"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verificaToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: "Token não encontrado" });
    }
    try {
        const segredo = process.env.SEGREDO;
        if (!segredo) {
            throw new Error("Variável SEGREDO inválida");
        }
        const verificado = jsonwebtoken_1.default.verify(token, segredo);
        req.usuario = verificado.usuario_id;
        next();
    }
    catch (erro) {
        console.log("error no middleware", erro);
        return res.status(400).json({ msg: "Token Inválido" });
    }
}
