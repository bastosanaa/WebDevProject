const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

//Conexao com o banco
const conexao = require("./bd/conexao");
conexao();

//Rotas
const rotas = require("./rotas/roteador");

app.use('/api', rotas);

app.listen(4444, () => {
    console.log("Servidor inicializado omg")
})

app.get("/", (req, res) => {
    res.send("servidor inicializado")
})