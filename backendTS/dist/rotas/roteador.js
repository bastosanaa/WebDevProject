"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tryCatch_1 = __importDefault(require("../utils/tryCatch"));
const roteador = (0, express_1.Router)();
const controladorUsuario_1 = __importDefault(require("../controladores/controladorUsuario"));
//Roteador Usuário
const usuarios_1 = __importDefault(require("./usuarios"));
roteador.use('/usuarios', usuarios_1.default);
//Roteador Tarefa
const tarefas_1 = __importDefault(require("./tarefas"));
roteador.use('/tarefas', tarefas_1.default);
//Login
roteador.route('/autenticacao/usuarios').post((req, res, next) => {
    (0, tryCatch_1.default)(req, res, next, controladorUsuario_1.default.login);
});
exports.default = roteador;
