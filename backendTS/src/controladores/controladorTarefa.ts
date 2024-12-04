import { Request, Response } from 'express';
import mongoose from 'mongoose';
// import { TarefaModelo } from "../modelos/Tarefa";
import { Usuario } from '../modelos/Usuario';
import { Tarefa } from "../modelos/Tarefa";  // Adicionando tipo para Tarefa, caso necessário

const controladorTarefa = {

    create: async (req: Request, res: Response): Promise<void> => {
        const { titulo,descricao, meta_tempo, data_termino, em_grupo, membros } = req.body;
        let { usuario_id } = req.params

        if (!titulo || !usuario_id) {
            res.status(400).json({ msg: "Título e usuário são obrigatórios" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(usuario_id)) {
            res.status(400).json({ msg: "ID de usuário inválido" });
            return;
        }

        const usuarioObjectId = new mongoose.Types.ObjectId(usuario_id);


        const tarefa: Partial<Tarefa> = {
            titulo,
            descricao,
            usuario_id: usuarioObjectId,
            meta_tempo,
            data_termino,
            em_andamento: true,
            em_grupo,
            membros
        };

        // Verificar se a tarefa já existe (se necessário)
        // const tarefaRegistrada = await Tarefa.find({ titulo: tarefa.titulo });
        // if (tarefaRegistrada.length > 0) {
        //     res.status(400).json({ msg: "Tarefa já existente" });
        //     return;
        // }

        const response = await Tarefa.create(tarefa);
        if (!response) {
            res.status(500).json({ msg: "Erro ao criar tarefa" });
            return;
        }

        res.status(201).json({ response, msg: "Tarefa criada com sucesso" });
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        const tarefaDeletada = await Tarefa.findByIdAndDelete(id);
        if (!tarefaDeletada) {
            res.status(404).json({ msg: "Tarefa não encontrada" });
            return;
        }

        res.status(200).json({ msg: "Tarefa deletada com sucesso" });
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { titulo,descricao, meta_tempo, data_termino, em_grupo, membros, em_andamento } = req.body;
        const { id } = req.params;

        const tarefa: Partial<Tarefa> = {
            titulo,
            descricao,
            meta_tempo,
            data_termino,
            em_andamento,
            em_grupo,
            membros
        };
        //retorna a tarefa APOS atualizacao
        const tarefaAtualizada = await Tarefa.findByIdAndUpdate(id, tarefa, { new: true });
        if (!tarefaAtualizada) {
            res.status(404).json({ msg: "Tarefa não encontrada para atualizar" });
            return;
        }

        res.status(200).json({ tarefa: tarefaAtualizada, msg: "Tarefa atualizada com sucesso" });
    },

    get: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params

        const tarefa = await Tarefa.findById(id)

        if (!tarefa) {
            res.status(404).json({ msg: "Tarefa não encontrada" });
            return;
        }
        res.status(200).json({ tarefa: tarefa, msg: "Tarefa encontrada com sucesso"})
    },

    getPorUsuario: async (req: Request, res: Response): Promise<void> => {
        const { usuario_id } = req.params;

        const tarefas = await Tarefa.find({ usuario_id }).populate('usuario_id', 'nome');

        // if (tarefas.length === 0) {
        // res.status(404).json({ mensagem: 'Nenhuma tarefa encontrada para esse usuário.' });
        // return;
        // }

        res.status(200).json(tarefas);
        return;
    },

    updateStatusEmAndamento: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        const tarefa = await Tarefa.findById(id)

        if (!tarefa) {
            res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
            return;
        }

        tarefa.em_andamento = !tarefa.em_andamento;

        await tarefa.save();

        res.status(200).json({ mensagem: 'Status da tarefa atualizado com sucesso.', tarefa });
        return;
    }
};

export default controladorTarefa;
