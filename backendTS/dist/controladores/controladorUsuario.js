"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../modelos/Usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Função Hash para senha
function hashSenha(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(12);
        const passwordHashed = yield bcrypt_1.default.hash(password, salt);
        return passwordHashed;
    });
}
const controladorUsuario = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { nome, email, senha } = req.body;
        const usuario = {
            nome,
            email,
            senha: yield hashSenha(senha),
            experiencia: 0,
            amigos: []
        };
        const usuarioRegistrado = yield Usuario_1.Usuario.find({ email: usuario.email });
        if (usuarioRegistrado.length > 0) {
            res.status(400).json({ msg: "Usuário já existente" });
            return;
        }
        const response = yield Usuario_1.Usuario.create(usuario);
        res.status(201).json({ response, msg: "Usuário registrado com sucesso" });
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const usuarioDeletado = yield Usuario_1.Usuario.findByIdAndDelete(id);
        if (!usuarioDeletado) {
            res.status(404).json({ msg: "Usuário não encontrado" });
            return;
        }
        res.status(200).json({ msg: "Usuário deletado com sucesso" });
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { nome, email, senha } = req.body;
        const { id } = req.params;
        const usuario = {
            nome,
            email,
            senha: yield hashSenha(senha),
            amigos: []
        };
        const usuarioAtualizado = yield Usuario_1.Usuario.findByIdAndUpdate(id, usuario, { new: true });
        if (!usuarioAtualizado) {
            res.status(404).json({ msg: "Erro ao atualizar usuário" });
            return;
        }
        res.status(200).json({ usuario, msg: "Usuário atualizado com sucesso" });
    }),
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const usuario = yield Usuario_1.Usuario.findById(id);
        if (!usuario) {
            res.status(404).json({ msg: "usuario não encontrada" });
            return;
        }
        res.status(200).json({ usuario: usuario, msg: "usuario encontrada com sucesso" });
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, senha } = req.body;
        const usuarioExiste = yield Usuario_1.Usuario.findOne({ email });
        if (!usuarioExiste) {
            res.status(400).json({ msg: "Login incorreto" });
            return;
        }
        const senhaValida = yield bcrypt_1.default.compare(senha, usuarioExiste.senha);
        if (!senhaValida) {
            res.status(400).json({ msg: "Login incorreto" });
            return;
        }
        const payload = {
            usuario_id: usuarioExiste._id,
            usuario_nome: usuarioExiste.nome,
            usuario_email: usuarioExiste.email
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.SEGREDO, { expiresIn: '1h' });
        res.json({ msg: "Login bem sucedido", auth: true, token });
    })
};
exports.default = controladorUsuario;
