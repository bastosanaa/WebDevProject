const mongoose = require("mongoose")

const { Schema } = mongoose

const TarefaSchema = new Schema({

    titulo: {
        type: String,
        required: true
    },
    meta_tempo: {
        type: Number,
    },
    data_termino: {
        type: Date
    },
    em_grupo: {
        type: Boolean
    },
    membros: [{
        usuario_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        nome_usuario: {
            type: String
        },
        tempo_foco: {
            type: Number
        }
    }]
})

const Tarefa = mongoose.model("tarefa", TarefaSchema)

module.exports = {
    Tarefa,
    TarefaSchema
}