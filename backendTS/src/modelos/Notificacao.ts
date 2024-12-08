import mongoose, { Document, Schema } from "mongoose";

// Interface para a notificação
export interface INotificacao extends Document {
    remetente: mongoose.Schema.Types.ObjectId; 
    destinatario: mongoose.Schema.Types.ObjectId; 
    tipo: "convite_amizade" | "convite_tarefa_grupo"; 
    status: "pendente" | "aceito" | "recusado"; 
    mensagem?: string; 
    tarefaEmGrupo?: mongoose.Schema.Types.ObjectId
}

// Esquema da notificação
const NotificacaoSchema: Schema<INotificacao> = new Schema(
    {
        remetente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usuarios",
            required: true,
        },
        destinatario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usuarios",
            required: true,
        },
        tarefaEmGrupo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tarefas",
        },
        tipo: {
            type: String,
            enum: ["convite_amizade", "convite_tarefa_grupo"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pendente", "aceito", "recusado"],
            default: "pendente",
        },
        mensagem: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const Notificacao = mongoose.model<INotificacao>("notificacoes", NotificacaoSchema);

export { Notificacao };
