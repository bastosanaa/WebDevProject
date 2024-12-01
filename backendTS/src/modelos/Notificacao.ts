import mongoose, { Document, Schema } from "mongoose";

// Interface para a notificação
export interface INotificacao extends Document {
    remetente: mongoose.Schema.Types.ObjectId; // ID do usuário que enviou a notificação
    destinatario: mongoose.Schema.Types.ObjectId; // ID do usuário que recebe a notificação
    tipo: "convite_amizade" | "convite_tarefa_grupo"; // Tipo de notificação
    status: "pendente" | "aceito" | "recusado"; // Status da notificação
    mensagem?: string; // Mensagem adicional (opcional)
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
