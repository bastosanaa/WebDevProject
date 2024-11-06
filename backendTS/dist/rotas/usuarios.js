"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controladorUsuario_1 = __importDefault(require("../controladores/controladorUsuario"));
const tryCatch_1 = __importDefault(require("../utils/tryCatch"));
// Criando o roteador do Express
const roteador = express_1.default.Router();
roteador.route("/post").post((req, res, next) => {
    (0, tryCatch_1.default)(req, res, next, controladorUsuario_1.default.create);
});
roteador.route("/update/:id").patch((req, res, next) => {
    (0, tryCatch_1.default)(req, res, next, controladorUsuario_1.default.update);
});
roteador.route("/delete").delete((req, res, next) => {
    (0, tryCatch_1.default)(req, res, next, controladorUsuario_1.default.delete);
});
roteador.route("/:id").get((req, res, next) => {
    (0, tryCatch_1.default)(req, res, next, controladorUsuario_1.default.get);
});
exports.default = roteador;
