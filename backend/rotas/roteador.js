const roteador = require("express").Router();
const controladorUsuario = require("../controladores/controladorUsuario.js");
const controladorTarefa = require("../controladores/controladorTarefa.js")

// Roteador do usuário
const roteadorUsuario = require("./usuarios");

roteador.use("/usuarios", roteadorUsuario);

//Roteador da tarefa
const roteadorTarefa = require("./tarefas.js")

roteador.use("/tarefas", roteadorTarefa)

// Login
roteador.route("/autenticacao/usuarios").post((req, res, next) => {
    controladorUsuario.login(req, res, next);
});

module.exports = roteador;
