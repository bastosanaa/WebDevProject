const roteador = require("express").Router();

const controladorUsuario = require("../controladores/controladorUsuario")

// roteador.route("/").post((req, res, next) = req, res, next, controladorUsuario.create);
roteador.route("/").post((req, res, next) => controladorUsuario.create(req, res, next));

// roteador.route("/:id").patch((req, res, next) = req, res, next, controladorUsuario.update);
// roteador.route("/login").post((req, res, next) = req, res, next, controladorUsuario.create)

module.exports = roteador;