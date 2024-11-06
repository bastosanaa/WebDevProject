import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function main(): Promise<void> {
    try {
        mongoose.set('strictQuery', true);

        const uri = process.env.BD_CONEXAO;

        if (!uri) {
            throw new Error("Variável BD_CONEXAO inválida");
        }

        await mongoose.connect(uri);

        console.log("conectado ao banco de dados");
        

    } catch (erro) {
        console.error("Erro ao conectar ao banco de dados", erro)
    }
}

export default main;