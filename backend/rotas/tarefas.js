const roteador = require("express").Router();

const controladorTarefa = require("../controladores/controladorTarefa.js")

// roteador.route("/").post((req, res, next) = req, res, next, controladorTarefa.create);
roteador.route("/").post((req, res, next) => controladorTarefa.create(req, res, next));

// roteador.route("/:id").patch((req, res, next) = req, res, next, controladorTarefa.update);
// roteador.route("/login").post((req, res, next) = req, res, next, controladorTarefa.create)

module.exports = roteador;