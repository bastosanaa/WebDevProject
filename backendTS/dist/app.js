"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const conexao_1 = __importDefault(require("./bd/conexao"));
const roteador_1 = __importDefault(require("./rotas/roteador"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//conexão com banco de dados
(0, conexao_1.default)();
// definição das rotas
app.use('/api', roteador_1.default);
//Inicialização do servidor
app.listen(4444, () => {
    console.log("Servidor inicializado :D");
});
app.get('/', (req, res) => {
    res.send("Servidor inicializado");
});
