import { Router } from 'express';
import Receita from '../schemas/Receita';
import { mensagens } from '../../utils/mensagensInformativas';
import { isValidObjectId } from 'mongoose';
import AuthMiddleware from '../middlewares/Auth';

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
            qtdPorcoes: receita.qtdPorcoes,
            nomeCriador: receita.nomeCriador,
          };
        });
        return res.status(200).send(receitas);
      } else {
        return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
      }
    })
    .catch((erro) => {
      console.error('Erro ao listar as receitas cadastradas', erro);
      return res.status(500).send({ erro: mensagens.ERRO_INTERNO });
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
          qtdPorcoes: dadoReceita.qtdPorcoes,
          nomeCriador: dadoReceita.nomeCriador,
        });
      } else {
        return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
      }
    })
    .catch((erro) => {
      console.error('Erro ao buscar receita', erro);
      return res.status(500).send({ erro: mensagens.ERRO_INTERNO });
    });
});

router.post('/', AuthMiddleware('usuario'), async (req, res) => {
  const {
    nome,
    ingredientes,
    modoPreparo,
    tempoPreparo,
    categoria,
    qtdPorcoes,
  } = req.body;

  if (
    !nome ||
    !ingredientes ||
    !modoPreparo ||
    !tempoPreparo ||
    !categoria ||
    !qtdPorcoes
  )
    return res.status(400).send({ erro: mensagens.INFORMACAO_OBRIGATORIA });

  Receita.create({
    nome,
    ingredientes,
    modoPreparo,
    tempoPreparo,
    categoria,
    qtdPorcoes,
    uidCriador: req.user.uid,
    nomeCriador: req.user.nome,
  })
    .then(() => {
      return res.status(200).send({ mensagem: mensagens.SUCESSO_CADASTRAR });
    })
    .catch((erro) => {
      console.error('Erro ao criar uma receita', erro);
      return res.status(500).send({ erro: mensagens.ERRO_INTERNO });
    });
});

router.put('/:id', AuthMiddleware('usuario'), async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    ingredientes,
    modoPreparo,
    tempoPreparo,
    categoria,
    qtdPorcoes,
  } = req.body;

  if (
    !nome ||
    !ingredientes ||
    !modoPreparo ||
    !tempoPreparo ||
    !categoria ||
    !qtdPorcoes
  )
    return res.status(400).send({ erro: mensagens.INFORMACAO_OBRIGATORIA });

  if (!isValidObjectId(id))
    return res.status(400).send({ erro: mensagens.ID_INVALIDO });

  let filtro = {
    _id: id,
  };
  let criador = {
    uidCriador: req.user.uid,
  };
  if (!req.user.admin) {
    filtro = { ...filtro, ...criador };
  }

  Receita.findOneAndUpdate(
    filtro,
    {
      nome,
      ingredientes,
      modoPreparo,
      tempoPreparo,
      categoria,
      qtdPorcoes,
    },
    { new: true },
  )
    .then((dadoReceita) => {
      if (dadoReceita) {
        return res.status(200).send({ mensagem: mensagens.SUCESSO_ALTERAR });
      } else {
        return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
      }
    })
    .catch((erro) => {
      console.error('Erro ao editar receita', erro);
      return res.status(500).send({ erro: mensagens.ERRO_INTERNO });
    });
});

router.delete('/', AuthMiddleware('usuario'), (req, res) => {
  return res.status(400).send({ erro: mensagens.ID_NAO_ESPECIFICADO });
});

router.delete('/:id', AuthMiddleware('usuario'), (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).send({ erro: mensagens.ID_INVALIDO });

  let filtro = {
    _id: id,
  };
  let criador = {
    uidCriador: req.user.uid,
  };
  if (!req.user.admin) {
    filtro = { ...filtro, ...criador };
  }

  Receita.findOneAndRemove(filtro)
    .then((dadoReceita) => {
      if (dadoReceita) {
        return res.status(200).send({ messagem: mensagens.SUCESSO_EXCLUIR });
      } else {
        return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
      }
    })
    .catch((erro) => {
      console.error('Erro ao remover receita', erro);
      return res.status(500).send({ erro: mensagens.ERRO_INTERNO });
    });
});

export default router;
