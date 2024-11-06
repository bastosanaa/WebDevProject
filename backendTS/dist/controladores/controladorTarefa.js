"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tarefa_1 = require("../modelos/Tarefa"); // Adicionando tipo para Tarefa, caso necessário
const controladorTarefa = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { titulo, meta_tempo, data_termino, em_grupo, membros } = req.body;
        const tarefa = {
            titulo,
            meta_tempo,
            data_termino,
            em_grupo,
            membros
        };
        // Verificar se a tarefa já existe (se necessário)
        // const tarefaRegistrada = await Tarefa.find({ titulo: tarefa.titulo });
        // if (tarefaRegistrada.length > 0) {
        //     res.status(400).json({ msg: "Tarefa já existente" });
        //     return;
        // }
        const response = yield Tarefa_1.Tarefa.create(tarefa);
        if (!response) {
            res.status(500).json({ msg: "Erro ao criar tarefa" });
            return;
        }
        res.status(201).json({ response, msg: "Tarefa criada com sucesso" });
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const tarefaDeletada = yield Tarefa_1.Tarefa.findByIdAndDelete(id);
        if (!tarefaDeletada) {
            res.status(404).json({ msg: "Tarefa não encontrada" });
            return;
        }
        res.status(200).json({ msg: "Tarefa deletada com sucesso" });
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { titulo, meta_tempo, data_termino, em_grupo, membros } = req.body;
        const { id } = req.params;
        const tarefa = {
            titulo,
            meta_tempo,
            data_termino,
            em_grupo,
            membros
        };
        //retorna a tarefa APOS atualizacao
        const tarefaAtualizada = yield Tarefa_1.Tarefa.findByIdAndUpdate(id, tarefa, { new: true });
        if (!tarefaAtualizada) {
            res.status(404).json({ msg: "Tarefa não encontrada para atualizar" });
            return;
        }
        res.status(200).json({ tarefa: tarefaAtualizada, msg: "Tarefa atualizada com sucesso" });
    }),
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const tarefa = yield Tarefa_1.Tarefa.findById(id);
        if (!tarefa) {
            res.status(404).json({ msg: "Tarefa não encontrada" });
            return;
        }
        res.status(200).json({ tarefa: tarefa, msg: "Tarefa encontrada com sucesso" });
    })
};
exports.default = controladorTarefa;
