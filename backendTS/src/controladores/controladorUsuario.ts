import { Request, Response } from 'express';
import { Usuario } from "../modelos/Usuario";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Função Hash para senha
async function hashSenha(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const passwordHashed = await bcrypt.hash(password, salt);
    return passwordHashed;
}

const controladorUsuario = {

    create: async (req: Request, res: Response): Promise<void> => {
        const { nome, email, senha } = req.body;

        const usuario = {
            nome,
            email,
            senha: await hashSenha(senha),
            experiencia: 0,
            amigos: []
        };

        const usuarioRegistrado = await Usuario.find({ email: usuario.email });
        if (usuarioRegistrado.length > 0) {
            res.status(400).json({ msg: "Usuário já existente" });
            return;
        }

        const response = await Usuario.create(usuario);

        res.status(201).json({ response, msg: "Usuário registrado com sucesso" });
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        const usuarioDeletado = await Usuario.findByIdAndDelete(id);

        if (!usuarioDeletado) {
            res.status(404).json({ msg: "Usuário não encontrado" });
            return;
        }

        res.status(200).json({ msg: "Usuário deletado com sucesso" });
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { nome, email, senha } = req.body;
        const { id } = req.params;

        const usuario = {
            nome,
            email,
            senha: await hashSenha(senha),
            amigos: []
        };

        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, usuario, { new: true });

        if (!usuarioAtualizado) {
            res.status(404).json({ msg: "Erro ao atualizar usuário" });
            return;
        }

        res.status(200).json({ usuario, msg: "Usuário atualizado com sucesso" });
    },
    get: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params

        const usuario = await Usuario.findById(id)

        if (!usuario) {
            res.status(404).json({ msg: "usuario não encontrada" });
            return;
        }
        res.status(200).json({ usuario: usuario, msg: "usuario encontrada com sucesso"})
    },

    login: async (req: Request, res: Response): Promise<void> => {
        const { email, senha } = req.body;

        const usuarioExiste = await Usuario.findOne({ email });

        if (!usuarioExiste) {
            res.status(400).json({ msg: "Login incorreto" });
            return;
        }

        const senhaValida = await bcrypt.compare(senha, usuarioExiste.senha);

        if (!senhaValida) {
            res.status(400).json({ msg: "Login incorreto" });
            return;
        }

        const payload = {
            usuario_id: usuarioExiste._id,
            usuario_nome: usuarioExiste.nome,
            usuario_email: usuarioExiste.email
        };

        const token = jwt.sign(payload, process.env.SEGREDO as string, { expiresIn: '1h' });

        res.json({ msg: "Login bem sucedido", auth: true, token });
    }
};

export default controladorUsuario;
