const { Tarefa: TarefaModelo } = require("../modelos/Tarefa.js");

const controladorTarefa = {

    create: async(req, res) => {

        const tarefa = {
            titulo: req.body.titulo,
            meta_tempo: req.body.meta_tempo,
            data_termino: req.body.data_termino,
            em_grupo: req.body.em_grupo,
            membros: req.body.membros
            
        }
        // const tarefaRegistrada = await TarefaModelo.find({email: tarefa.email})
        // if (tarefaRegistrada.length > 0) {
        //     //lancar erro de tarefa ja existente
        // }

        // const response = await tarefaModelo.create(tarefa)

        res.status(201).json({response, msg: "Usuário registrado com sucesso"})
    },
    delete: async(req, res) => {

        const id = req.body.id

        const tarefaDeletada = await TarefaModelo.findByIdAndDelete(id)

        if (!tarefaDeletada) {
            //enviar erro de tarefa nao existente
        }

        res.status(200).json({msg: "Usuário deletado com sucesso"})
    },

    update: async (req, res) => {

        const tarefa = {
            titulo: req.body.titulo,
            meta_tempo: req.body.meta_tempo,
            data_termino: req.body.data_termino,
            em_grupo: req.body.em_grupo,
            membros: req.body.membros
            
        }

        const id = req.params.id

        tarefaAtualizada = await TarefaModelo.findByIdAndUpdate(id, tarefa)

        if(!tarefaAtualizada) {
            //enviar erro ao atualizar
        }
        res.status(200).json({tarefa, msg: "tarefa atualizada com sucesso"})
    }
}

module.exports = controladorTarefa