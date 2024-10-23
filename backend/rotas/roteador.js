const roteador = require("express").Router();
const controladorUsuario = require("../controladores/controladorUsuario.js");

// Roteador do usuário
const roteadorUsuario = require("./usuarios");

roteador.use("/usuarios", roteadorUsuario);

// Login
roteador.route("/autenticacao/usuarios").post((req, res, next) => {
    controladorUsuario.login(req, res, next);
});

module.exports = roteador;
