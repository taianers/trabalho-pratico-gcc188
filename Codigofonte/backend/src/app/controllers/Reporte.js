import { Router } from 'express';
import Reporte from '../schemas/Reporte';
import { mensagens } from '../../utils/mensagensInformativas';
import { isValidObjectId } from 'mongoose';
import AuthMiddleware from '../middlewares/Auth';
import Receita from '../schemas/Receita';

const router = new Router();

router.get('/', AuthMiddleware('admin'), (req, res) => {
  Reporte.find()
    .then((reporte) => {
      if (reporte.length > 0) {
        const reportes = reporte.map((rpt) => {
          return {
            id: rpt._id,
            motivo: rpt.motivo,
            nomeReporter: rpt.nomeReporter,
            nomeReceita: rpt.nomeReceita,
          };
        });
        return res.send(reportes);
      } else {
        return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
      }
    })
    .catch((err) => {
      console.error('Erro ao listar as reportes cadastrados', err);
      return res.status(500).send({ erro: mensagens.ERRO_LISTAR });
    });
});

router.get('/:id', AuthMiddleware('admin'), (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).send({ erro: mensagens.ID_INVALIDO });

  Reporte.findById(id)
    .then((reporte) => {
      if (reporte) {
        return res.send({
          motivo: reporte.motivo,
          nomeReporter: reporte.nomeReporter,
          nomeReceita: reporte.nomeReceita,
        });
      } else {
        return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
      }
    })
    .catch((err) => {
      console.error('Erro ao procurar pelo reporte solicitado', err);
      return res.status(500).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
    });
});

router.post('/', AuthMiddleware('usuario'), async (req, res) => {
  const { motivo, idReceita } = req.body;
  const receita = await Receita.findById(idReceita);
  if (!receita) return res.send({ erro: 'Receita reportada não existe' });
  Reporte.create({
    motivo,
    idReceita,
    nomeReceita: receita.nome,
    idReporter: req.user.uid,
    nomeReporter: req.user.nome,
  })
    .then(() => {
      return res.send({ message: mensagens.SUCESSO_CADASTRAR });
    })
    .catch((erro) => {
      console.error('Erro ao criar reporte', erro);
      return res.status(500).send({ erro: mensagens.ERRO_CADASTRAR });
    });
});

router.put('/', AuthMiddleware('admin'), (req, res) => {
  return res.status(400).send({ erro: mensagens.ID_NAO_ESPECIFICADO });
});

router.put('/:id', AuthMiddleware('admin'), (req, res) => {
  const { motivo } = req.body;
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).send({ erro: mensagens.ID_INVALIDO });

  Reporte.findByIdAndUpdate(id, {
    motivo,
    idReporter: req.user.uid,
    nomeReporter: req.user.nome,
  })
    .then((dadosReporte) => {
      if (dadosReporte) return res.send({ message: mensagens.SUCESSO_ALTERAR });
      else return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
    })
    .catch((erro) => {
      console.error('Erro ao editar reporte', erro);
      return res.status(500).send({ erro: mensagens.ERRO_ALTERAR });
    });
});

router.delete('/', AuthMiddleware('admin'), (req, res) => {
  return res.status(400).send({ erro: mensagens.ID_NAO_ESPECIFICADO });
});

router.delete('/:id', AuthMiddleware('admin'), (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).send({ erro: mensagens.ID_INVALIDO });

  Reporte.findByIdAndRemove(id)
    .then((reporte) => {
      if (reporte)
        return res.status(200).send({ mensagem: mensagens.SUCESSO_EXCLUIR });
      else return res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
    })
    .catch((err) => {
      console.error('Erro ao remover reporte', err);
      return res.status(500).send({ erro: mensagens.ERRO_EXCLUIR });
    });
});

export default router;
