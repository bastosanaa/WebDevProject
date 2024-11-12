import mongoose, { Schema, Document, Model } from 'mongoose';

// Definir o tipo para os membros da tarefa
interface Membro {
    usuario_id: mongoose.Types.ObjectId;
    nome_usuario: string;
    tempo_foco: number;
}

// Definir o tipo para o documento de Tarefa
interface Tarefa extends Document {
    titulo: string;
    usuario_id : mongoose.Types.ObjectId;
    meta_tempo?: number;
    data_termino?: Date;
    em_grupo?: boolean;
    membros: Membro[];
}

// Definir o schema para a tarefa
const TarefaModelo: Schema<Tarefa> = new Schema({

    titulo: {
        type: String,
        required: true
    },
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    meta_tempo: {
        type: Number
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
            required: true,
            ref: 'Usuario' 
        },
        nome_usuario: {
            type: String,
            required: true
        },
        tempo_foco: {
            type: Number,
            default: 0
        }
    }]
});

// Criar o modelo de tarefa com o tipo de documento especificado
const Tarefa: Model<Tarefa> = mongoose.model<Tarefa>('Tarefa', TarefaModelo);

export { Tarefa, TarefaModelo };