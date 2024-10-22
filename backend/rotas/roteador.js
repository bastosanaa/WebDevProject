// const { Router } = require("express");
const roteador = require("express").Router();
const controladorUsuario = require("../controladores/controladorUsuario.js")


//Roteador do usuário
const roteadorUsuario = require("./usuarios")

roteador.use("/usuarios", roteadorUsuario);

module.exports = router

//Login
roteador.route("/autenticacao/usuarios").post((req,res,next) => req,res,next, controladorUsuario.login)