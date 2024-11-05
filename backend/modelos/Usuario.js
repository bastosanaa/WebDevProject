const mongoose = require("mongoose")

const { Schema } = mongoose

const UsuarioSchema = new Schema({

    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String
    },
    experiencia: {
        type: Number
    },
    amigos: [{
        usuario_id: {
            type: mongoose.Schema.Types.ObjectId,
        }
    }]
})

const Usuario = mongoose.model("usuarios", UsuarioSchema)

module.exports = {
    Usuario,
    UsuarioSchema
}