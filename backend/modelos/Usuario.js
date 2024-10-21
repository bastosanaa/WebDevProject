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
        tye
    },
    amigos: [{
        usuario_id: {
            type: mongoose.Schema.Type.ObjectId,

        }
    }]

})