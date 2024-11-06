import express, { Request, Response } from 'express';
import cors from 'cors';

import conexao from './bd/conexao';
import rotas from './rotas/roteador';

const app = express();

app.use(cors());
app.use(express.json());

//conexão com banco de dados
conexao();

// definição das rotas
app.use('/api', rotas);

//Inicialização do servidor
app.listen(4444, () => {
    console.log("Servidor inicializado :D")
});

app.get('/', (req: Request, res: Response) => {
    res.send("Servidor inicializado")
})




