import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Notificacao } from '../modelos/Notificacao'; // Modelo de Notificação
import controladorUsuario from './controladorUsuario';
import { Usuario } from '../modelos/Usuario';

const controladorNotificacao = {

    create: async (req: Request, res: Response): Promise<void> => {
        const { destinatarioEmail, tipo, mensagem } = req.body;
        const remetente = req.usuario_id;

        // Verificação dos campos obrigatórios
        if (!remetente || !destinatarioEmail || !tipo) {
            res.status(400).json({ msg: "Destinatário e tipo são obrigatórios" });
            return;
        }

        // Verificando se os IDs são válidos
        if (!mongoose.Types.ObjectId.isValid(remetente)) {
            res.status(400).json({ msg: "IDs de remetente inválido" });
            return;
        }

        // Verificando se o destinatário existe
        const usuarioRegistrado = await Usuario.findOne({ email: destinatarioEmail });
        if (!usuarioRegistrado) {
            res.status(400).json({ msg: `Usuario não encontrado com email: ${destinatarioEmail}`});
            return;
        }

        const destinatario = usuarioRegistrado._id

        const notificacao = new Notificacao({
            remetente: new mongoose.Types.ObjectId(remetente),
            destinatario: destinatario,
            tipo,
            mensagem,
            status: "pendente", // Status inicial da notificação
        });

        const novaNotificacao = await notificacao.save();
        res.status(201).json({ novaNotificacao, msg: "Notificação criada com sucesso" });
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        const notificacaoDeletada = await Notificacao.findByIdAndDelete(id);
        if (!notificacaoDeletada) {
            res.status(404).json({ msg: "Notificação não encontrada" });
            return;
        }
        res.status(200).json({ msg: "Notificação deletada com sucesso" });
    },

    // update: async (req: Request, res: Response): Promise<void> => {
    //     const { id } = req.params;
    //     const { status, mensagem } = req.body;

    //     if (!status) {
    //         res.status(400).json({ msg: "Status é obrigatório" });
    //         return;
    //     }

    //     if (!["pendente", "aceito", "recusado"].includes(status)) {
    //         res.status(400).json({ msg: "Status inválido" });
    //         return;
    //     }

    //     const notificacaoAtualizada = await Notificacao.findByIdAndUpdate(
    //         id,
    //         { status, mensagem },
    //         { new: true } // Retorna a notificação atualizada
    //     );

    //     if (!notificacaoAtualizada) {
    //         res.status(404).json({ msg: "Notificação não encontrada para atualização" });
    //         return;
    //     }

    //     res.status(200).json({ notificacao: notificacaoAtualizada, msg: "Notificação atualizada com sucesso" });
    // },

    get: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        const notificacao = await Notificacao.findById(id);
        if (!notificacao) {
            res.status(404).json({ msg: "Notificação não encontrada" });
            return;
        }

        res.status(200).json({ notificacao, msg: "Notificação encontrada com sucesso" });
    },

    getPorUsuario: async (req: Request, res: Response): Promise<void> => {
        const  usuario_id  = req.usuario_id;

        if (!mongoose.Types.ObjectId.isValid(usuario_id)) {
            res.status(400).json({ msg: "ID de usuário inválido" });
            return;
        }

        const notificacoes = await Notificacao.find({ destinatario: usuario_id })
            .populate('remetente', 'nome') // Popula o campo 'remetente' com o nome do usuário
            .exec();

        if (notificacoes.length === 0) {
            res.status(404).json({ msg: "Nenhuma notificação encontrada para este usuário" });
            return;
        }

        res.status(200).json({ notificacoes, msg: "Notificações encontradas com sucesso" });
    },

    updateStatus: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { status } = req.body;

        if (!["pendente", "aceito", "recusado"].includes(status)) {
            res.status(400).json({ msg: "Status inválido" });
            return;
        }

        const notificacao = await Notificacao.findById(id);

        if (!notificacao) {
            res.status(404).json({ msg: 'Notificação não encontrada' });
            return;
        }

        // Se for um convite de amizade e o status for aceito, adicionar como amigo
        if (notificacao.tipo === "convite_amizade" && status === "aceito") {
        await chamarAddAmigo(
            notificacao.remetente.toString(),
            notificacao.destinatario.toString(), 
            res
        );
        return;
    }

        notificacao.status = status;
        await notificacao.save();

        res.status(200).json({ msg: 'Status da notificação atualizado com sucesso', notificacao });
    }
};

export default controladorNotificacao;

const chamarAddAmigo = async (remetenteId: string, destinatarioId: string, res: Response) => {
    // Criar objetos simulados de Request e Response para chamar a função addAmigo
    const addAmigoReq = { 
        body: {
            usuario_id: destinatarioId,  // Usuario que recebeu o convite
            amigo_id: remetenteId  // Usuario que enviou o convite
        }
    } as Request;
    const addAmigoRes = {
        status: (statusCode: number) => {
            return {
                json: (message: { mensagem: string }) => res.status(statusCode).json(message)
            };
        }
    } as Response;
    
    // Chamar a função addAmigo diretamente
    await controladorUsuario.addAmigo(addAmigoReq, addAmigoRes);
};