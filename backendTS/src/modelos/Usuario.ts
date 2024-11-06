import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Interface para o modelo Usuario
export interface IUsuario extends Document {
    nome: string;
    email: string;
    senha: string;
    experiencia: number;
    amigos: { usuario_id: mongoose.Schema.Types.ObjectId }[];
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
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "usuarios",
                },
            },
        ],
    },
    { timestamps: true }
);

// Criptografando a senha antes de salvar no banco
UsuarioSchema.pre<IUsuario>('save', async function (next) {
    if (this.isModified('senha')) {
        this.senha = await bcrypt.hash(this.senha, 10);
    }
    next();
});

// Cria o modelo de Usuario com o esquema e a interface
const Usuario = mongoose.model<IUsuario>("usuarios", UsuarioSchema);

export { Usuario };
