import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Usuario } from "../modelos/Usuario";
import { Tarefa } from '../modelos/Tarefa';
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
            amigos: [],
            tarefasEmGrupo: []
        };
        const nomeUsuarioEmUso = await Usuario.find({ nome: usuario.nome });
        if (nomeUsuarioEmUso.length > 0) {
            res.status(400).json({ 
        msg: "Nome de usuário em uso", 
        errorCode: "USERNAME_IN_USE" 
    });
            return;
        }

        const usuarioRegistrado = await Usuario.find({ email: usuario.email });
        if (usuarioRegistrado.length > 0) {
            res.status(400).json({ 
        msg: "Email já Cadastrado", 
        errorCode: "EMAIL_ALREADY_REGISTERED" 
    });
            return;
        }

        const response = await Usuario.create(usuario);

        const payload = {
          usuario_id: response._id,
          usuario_nome: usuario.nome,
          usuario_email: usuario.email
        };

        const token = jwt.sign(payload, process.env.SEGREDO as string, { expiresIn: '1h' });

        res.status(201).json({ response, token, msg: "Usuário registrado com sucesso" });
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const id = req.usuario_id;

        const usuarioDeletado = await Usuario.findByIdAndDelete(id);

        if (!usuarioDeletado) {
            res.status(404).json({ msg: "Usuário não encontrado" });
            return;
        }

        res.status(200).json({ msg: "Usuário deletado com sucesso" });
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { nome, email } = req.body;
        const id = req.usuario_id;

        const usuario = {
            nome,
            email
        };

        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, usuario, { new: true });

        if (!usuarioAtualizado) {
            res.status(404).json({ msg: "Erro ao atualizar usuário" });
            return;
        }


        const payload = {
            usuario_id: usuarioAtualizado._id,
            usuario_nome: usuarioAtualizado.nome,
            usuario_email: usuarioAtualizado.email
        };

        const token = jwt.sign(payload, process.env.SEGREDO as string, { expiresIn: '1h' });

        res.status(200).json({ usuario, msg: "Usuário atualizado com sucesso", token });
    },
    get: async (req: Request, res: Response): Promise<void> => {
        const id  = req.usuario_id

        const usuario = await Usuario.findById(id).select("-senha")
        
        if (!usuario) {
            res.status(404).json({ msg: "usuario não encontrado" });
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
    },

    // Funções relacionadas a Amizade 
    // OBS - addAmigo: esta rota tem relacao as acoes feitas a entidade USUARIO e so deve ser chamadas após a aceitação de um convite de amizade (notificacao)
    addAmigo: async (req: Request, res: Response): Promise<void> => {
        const { amigo_id } = req.body;
        const usuario_id = req.usuario_id;
        // Validar os IDs antes de usá-los
        if (!mongoose.Types.ObjectId.isValid(usuario_id) || !mongoose.Types.ObjectId.isValid(amigo_id)) {
            res.status(400).json({ mensagem: 'IDs inválidos fornecidos.' });
            return;
        }
    
        const usuario = await Usuario.findById(usuario_id);
        const amigo = await Usuario.findById(amigo_id);
    
        if (!usuario || !amigo) {
            res.status(404).json({ mensagem: 'Usuário ou amigo não encontrado.' });
            return;
        }

        //verifica se já são amigos
        const jaSaoAmigosUsuario = usuario.amigos.some(amigoObj => amigoObj.usuario_id.equals(amigo_id));
        const jaSaoAmigosAmigo = amigo.amigos.some(amigoObj => amigoObj.usuario_id.equals(usuario_id));

        if (jaSaoAmigosUsuario || jaSaoAmigosAmigo) {
            res.status(400).json({ mensagem: 'Amizade já estabelecida.' });
            return;
        }
    
        // Adicionar o amigo no campo `amigos` de ambos os usuários
        usuario.amigos.push({ usuario_id: amigo._id as mongoose.Types.ObjectId, nome: amigo.nome as string });
        amigo.amigos.push({ usuario_id: usuario._id as mongoose.Types.ObjectId, nome: usuario.nome as string });
    
        // Salvar as alterações no banco
        await usuario.save();
        await amigo.save();
    
        res.status(200).json({ mensagem: 'Amizade adicionada com sucesso!' });
    },

    removeAmigo: async (req: Request, res: Response): Promise<void> => {
        const { amigo_id } = req.body;
        const usuario_id = req.usuario_id 
    
        // Validar os IDs antes de usá-los
        if (!mongoose.Types.ObjectId.isValid(usuario_id) || !mongoose.Types.ObjectId.isValid(amigo_id)) {
            res.status(400).json({ mensagem: 'IDs inválidos fornecidos.' });
            return;
        }
    
        const usuario = await Usuario.findById(usuario_id);
        const amigo = await Usuario.findById(amigo_id);
    
        if (!usuario || !amigo) {
            res.status(404).json({ mensagem: 'Usuário ou amigo não encontrado.' });
            return;
        }

        //verifica se já são amigos
        const jaSaoAmigosUsuario = usuario.amigos.some(amigoObj => amigoObj.usuario_id.equals(amigo_id));
        const jaSaoAmigosAmigo = amigo.amigos.some(amigoObj => amigoObj.usuario_id.equals(usuario_id));

        if (!jaSaoAmigosUsuario || !jaSaoAmigosAmigo) {
            res.status(400).json({ mensagem: 'Amizade não existe.' });
            return;
        }
    
        // Remover o amigo do campo `amigos` de ambos os usuários
        usuario.amigos = usuario.amigos.filter(amigo => !amigo.usuario_id.equals(amigo_id));
        amigo.amigos = amigo.amigos.filter(amigo => !amigo.usuario_id.equals(usuario_id));
    
        // Salvar as alterações no banco
        await usuario.save();
        await amigo.save();
    
        res.status(200).json({ mensagem: 'Amizade desfeita com sucesso!' });
    },

    addEmTarefaEmGrupo: async (req: Request, res: Response): Promise<void> => {
        const usuario_id = req.usuario_id;
        const { tarefa_id } = req.body;
    
        try {
            if (!usuario_id || !tarefa_id) {
                res.status(400).json({ msg: "Usuário ou tarefa não informados" });
                return;
            }
    
            const usuario = await Usuario.findById(usuario_id);
    
            if (!usuario) {
                res.status(404).json({ msg: "Usuário não encontrado" });
                return;
            }
    
            const tarefa = await Tarefa.findById(tarefa_id);
    
            if (!tarefa) {
                res.status(404).json({ msg: "Tarefa não encontrada" });
                return;
            }
    
            // Verifica se a tarefa já está associada ao usuário
            const tarefaJaAssociada = usuario.tarefasEmGrupo.some(tarefa =>
                tarefa.tarefa_id.toString() === tarefa_id
            );
    
            if (tarefaJaAssociada) {
                res.status(400).json({ msg: "A tarefa já está associada ao usuário" });
                return;
            }
    
            // Adiciona a tarefa à lista de tarefas em grupo do usuário
            usuario.tarefasEmGrupo.push({ tarefa_id });
            await usuario.save();
    
            // Adiciona o usuário à lista de membros da tarefa
            tarefa.membros.push({
                usuario_id: (usuario_id),
                nome_usuario: usuario.nome,
                tempo_foco: 0
            });
            await tarefa.save();
    
            res.status(200).json({ msg: "Tarefa adicionada ao grupo com sucesso" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao adicionar a tarefa ao grupo" });
        }
    },
    
    removeTarefaEmGrupo: async (req: Request, res: Response): Promise<void> => {
        const usuario_id = req.usuario_id;
        const { tarefa_id } = req.body;
    
        try {
            if (!usuario_id || !tarefa_id) {
                res.status(400).json({ msg: "Usuário ou tarefa não informados" });
                return;
            }
    
            const usuario = await Usuario.findById(usuario_id);
    
            if (!usuario) {
                res.status(404).json({ msg: "Usuário não encontrado" });
                return;
            }
    
            const tarefa = await Tarefa.findById(tarefa_id);
    
            if (!tarefa) {
                res.status(404).json({ msg: "Tarefa não encontrada" });
                return;
            }
    
            // Remove a tarefa da lista de tarefas em grupo do usuário
            const tarefaIndex = usuario.tarefasEmGrupo.findIndex(tarefa =>
                tarefa.tarefa_id.toString() === tarefa_id
            );
    
            if (tarefaIndex === -1) {
                res.status(404).json({ msg: "Tarefa não encontrada na lista do usuário" });
                return;
            }
    
            usuario.tarefasEmGrupo.splice(tarefaIndex, 1);
            await usuario.save();
    
            // Remove o usuário da lista de membros da tarefa
            const membroIndex = tarefa.membros.findIndex(
                membro => membro.usuario_id.toString() === usuario_id
            );
    
            if (membroIndex !== -1) {
                tarefa.membros.splice(membroIndex, 1);
                await tarefa.save();
            }
    
            res.status(200).json({ msg: "Tarefa removida do grupo com sucesso" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao remover a tarefa do grupo" });
        }
    }
}    

export default controladorUsuario;

