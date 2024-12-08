import mongoose, { Document, mongo, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Interface para o modelo Usuario
export interface IUsuario extends Document {
    nome: string;
    email: string;
    senha: string;
    experiencia: number;
    amigos: { usuario_id: mongoose.Types.ObjectId }[];
    tarefasEmGrupo: { tarefa_id: mongoose.Types.ObjectId }[];
}

// Esquema do usuário com as validações e criptografia da senha
const UsuarioSchema: Schema<IUsuario> = new Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Regex para validar email
        },
        senha: {
            type: String,
            required: true,
        },
        experiencia: {
            type: Number,
            default: 0,
        },
        amigos: [
            {
                usuario_id: {
                    type: mongoose.Types.ObjectId,
                    ref: "usuarios",
                },
            },
        ],
        tarefasEmGrupo: [
            {
                tarefa_id: {
                    type: mongoose.Types.ObjectId,
                    ref: "tarefas",
                }
            }
        ]
    },
    { timestamps: true }
);

// Cria o modelo de Usuario com o esquema e a interface
const Usuario = mongoose.model<IUsuario>("usuarios", UsuarioSchema);

export { Usuario };
