const { Usuario: UsuarioModelo, Usuario } = require("../modelos/Usuario.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const controladorUsuario = {

    create: async(req, res) => {

        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: await hashSenha(req.body.senha),
            experiencia: 0,
            amigos: []
        }

        const usuarioRegistrado = await UsuarioModelo.find({email: usuario.email})
        if (usuarioRegistrado.length > 0) {
            //lancar erro de usuario ja existente
        }

        const response = await UsuarioModelo.create(usuario)

        res.status(201).json({response, msg: "Usuário registrado com sucesso"})
    },
    delete: async(req, res) => {

        const id = req.body.id

        const usuarioeletado = await UsuarioModelo.findByIdAndDelete(id)

        if (!usuarioeletado) {
            //enviar erro de usuario nao existente
        }

        res.status(200).json({msg: "Usuário deletado com sucesso"})
    },

    update: async (req, res) => {

        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: await hashSenha(req.body.senha),
            amigos: []
        }

        const id = req.params.id

        usuarioAtualizado = await UsuarioModelo.findByIdAndUpdate(id, usuario)

        if(!usuarioAtualizado) {
            //enviar erro ao atualizar
        }
        res.status(200).json({usuario, msg: "Usuário atualizado com sucesso"})
    },
    login: async (req,res) => {
        const {email, senha} = req.body

        const usuarioExiste = await UsuarioModelo.findOne({email});

        if (!usuarioExiste) {
            //lança erro de login incorreto
        }

        const senhaValida = await bcrypt.compare(senha, usuarioExiste.senha);

        if (!senhaValida) {
            //lança erro de login incorreto
        }

        const payload = {
            usuario_id: usuarioExiste._id,
            usuario_nome: usuarioExiste.nome,
            usuario_email: usuarioExiste.email
        }
        const token = jwt.sign( payload, process.env.SEGREDO, { expiresIn: 20000 });
        res.json({msg: "Login bem sucedido", auth:true, token})
    }  
}

module.exports = controladorUsuario

//função Hash
async function hashSenha(password) {
    
    const salt = await bcrypt.genSalt(12)
    const passwordHashed = await bcrypt.hash(password, salt)
    return passwordHashed
}