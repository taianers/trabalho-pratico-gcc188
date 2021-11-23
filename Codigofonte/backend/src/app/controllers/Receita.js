import { Router } from "express";
import Receita from "../schemas/Receita";
import { mensagens } from "../../utils/mensagensInformativas";
import { isValidObjectId } from 'mongoose';

const router = new Router();

router.get('/', (req, res) => {
    Receita.find()
        .then((dadoReceita) => {
            if (dadoReceita.length > 0) {
                const receitas = dadoReceita.map((receita) => {
                    return {
                        id: receita._id,
                        nome: receita.nome,
                        ingredientes: receita.ingredientes,
                        modoPreparo: receita.modoPreparo,
                        tempoPreparo: receita.tempoPreparo,
                        categoria: receita.categoria,
                        qtdPorcoes: receita.qtdPorcoes
                    };
                });
                return res.status(200).send(receitas);
            } else {
                return res
                    .status(404)
                    .send({ erro: mensagens.DADO_NAO_ENCONTRADO });
            }
        })
        .catch((erro) => {
            console.error('Erro ao listar as receitas cadastradas', erro);
            return res.status(500).send({ erro: mensagens.ERRO_LISTAR });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id))
        return res.status(400).send({ erro: mensagens.ID_INVALIDO });

    Receita.findById(id)
        .then((dadoReceita) => {

            if (dadoReceita) {
                return res.send({
                    nome: dadoReceita.nome,
                    ingredientes: dadoReceita.ingredientes,
                    modoPreparo: dadoReceita.modoPreparo,
                    tempoPreparo: dadoReceita.tempoPreparo,
                    categoria: dadoReceita.categoria,
                    qtdPorcoes: dadoReceita.qtdPorcoes
                });
            } else {
                return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
            }
        })
        .catch((erro) => {
            console.error('Erro ao buscar receita', erro);
            return res.status(500).send({ erro: mensagens.ERRO_LISTAR });
        });
});

router.post('/', async (req, res) => {
    const { nome, ingredientes, modoPreparo, tempoPreparo, categoria, qtdPorcoes } = req.body;

    if (!nome) return res.status(400).send({ erro: mensagens.INFORMACAO_OBRIGATORIA });
    if (!ingredientes) return res.status(400).send({ erro: mensagens.INFORMACAO_OBRIGATORIA });
    if (!modoPreparo) return res.status(400).send({ erro: mensagens.INFORMACAO_OBRIGATORIA });
    if (!tempoPreparo) return res.status(400).send({ erro: mensagens.INFORMACAO_OBRIGATORIA });
    if (!categoria) return res.status(400).send({ erro: mensagens.INFORMACAO_OBRIGATORIA });
    if (!qtdPorcoes) return res.status(400).send({ erro: mensagens.INFORMACAO_OBRIGATORIA });

    Receita.create({
        nome: nome, ingredientes: ingredientes, modoPreparo: modoPreparo, tempoPreparo: tempoPreparo,
        categoria: categoria, qtdPorcoes: qtdPorcoes
    })
        .then(() => {
            return res.status(200).send({ mensagem: mensagens.SUCESSO_CADASTRAR });
        })
        .catch((erro) => {
            console.error('Erro ao criar uma receita', erro);
            return res.status(500).send({ erro: mensagens.ERRO_CADASTRAR });
        });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, ingredientes, modoPreparo, tempoPreparo, categoria, qtdPorcoes } = req.body;

    if (!nome) return res.status(400).send({ erro: 'Campo nome é obrigatório' });
    if (!ingredientes) return res.status(400).send({ erro: 'Campo ingredientes é obrigatório' });
    if (!modoPreparo) return res.status(400).send({ erro: 'Campo modo de preparo é obrigatório' });
    if (!tempoPreparo) return res.status(400).send({ erro: 'Campo tempo de preparo é obrigatório' });
    if (!categoria) return res.status(400).send({ erro: 'Campo categoria é obrigatório' });
    if (!qtdPorcoes) return res.status(400).send({ erro: 'Campo porções é obrigatório' });

    if (!isValidObjectId(id))
        return res.status(400).send({ erro: mensagens.ID_INVALIDO });

    Receita.findByIdAndUpdate(id, { nome, ingredientes, modoPreparo, tempoPreparo, categoria, qtdPorcoes }, { new: true })
        .then((dadoReceita) => {
            if (dadoReceita) {
                return res.status(200).send({ mensagem: mensagens.SUCESSO_ALTERAR });
            } else {
                return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
            }
        })
        .catch((erro) => {
            console.error('Erro ao editar receita', erro);
            return res.status(500).send({ erro: mensagens.ERRO_ALTERAR });
        });
});

router.delete('/', (req, res) => {
    return res.status(400).send({ erro: mensagens.ID_NAO_ESPECIFICADO });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id))
        return res.status(400).send({ erro: mensagens.ID_INVALIDO });

    Receita.findByIdAndRemove(id)
        .then((dadoReceita) => {
            if (dadoReceita) {
                return res
                    .status(200)
                    .send({ messagem: mensagens.SUCESSO_EXCLUIR });
            } else {
                return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
            }
        })
        .catch((erro) => {
            console.error('Erro ao remover receita', erro);
            return res.status(500).send({ erro: mensagens.ERRO_EXCLUIR });
        });
});

export default router;