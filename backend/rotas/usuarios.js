const roteador = require("express").Router();

const userController = require("../controladores/controladorUsuario")

roteador.route("/").post((req, res, next) = req, res, next, userController.create);
roteador.route("/:id").patch((req, res, next) = req, res, next, userController.update);
roteador.route("/login").post((req, res, next) = req, res, next, userController.create)

