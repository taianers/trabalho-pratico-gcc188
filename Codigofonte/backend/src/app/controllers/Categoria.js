import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import Categoria from '@/app/schemas/Categoria';
import AuthMiddleware from '../middlewares/Auth';

const router = new Router();

router.get('/', (req, res) => {
  Categoria.find()
    .then((data) => {
      if (data.length > 0) {
        const categorias = data.map((categoria) => {
          return {
            id: categoria._id,
            nome: categoria.nome,
          };
        });
        return res.send(categorias);
      } else {
        return res
          .status(404)
          .send({ erro: 'Nenhuma categoria foi encontrada' });
      }
    })
    .catch((err) => {
      console.error('Erro ao listar as categorias cadastradas', err);
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  Categoria.findById(id)
    .then((data) => {
      if (data) {
        return res.send({ nome: data.nome });
      } else {
        return res.status(404).send({ erro: 'Categoria não encontrada' });
      }
    })
    .catch((err) => {
      console.error('Erro ao procurar pela categoria solicitada', err);
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

router.post('/', AuthMiddleware('admin'), async (req, res) => {
  const { nome } = req.body;

  if (!nome) return res.status(400).send({ erro: 'O nome é obrigatório' });

  const categoria = await Categoria.findOne({ nome: nome });
  if (categoria) {
    return res
      .status(400)
      .send({ erro: 'Já existe uma categoria com esse nome' });
  }

  Categoria.create({ nome: nome })
    .then(() => {
      return res.status(200).send({ mensagem: 'Categoria criada com sucesso' });
    })
    .catch((err) => {
      console.error('Erro ao criar uma categoria', err);
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

router.put('/:id', AuthMiddleware('admin'), async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) return res.status(400).send({ erro: 'O nome é obrigatório' });

  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  const categoria = await Categoria.findOne({ nome: nome });
  if (categoria) {
    return res
      .status(400)
      .send({ erro: 'Já existe uma categoria com esse nome' });
  }

  Categoria.findByIdAndUpdate(id, { nome }, { new: true })
    .then((data) => {
      if (data) {
        return res.status(200).send({ mensagem: 'Nome alterado com sucesso' });
      } else {
        return res.status(404).send({ erro: 'Categoria não encontrada' });
      }
    })
    .catch((err) => {
      console.error('Erro ao editar categoria', err);
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

router.delete('/', AuthMiddleware('admin'), (req, res) => {
  return res.status(400).send({ erro: 'ID não informado' });
});

router.delete('/:id', AuthMiddleware('admin'), (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  Categoria.findByIdAndRemove(id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .send({ mensagem: 'Categoria deletada com sucesso' });
      } else {
        return res.status(404).send({ erro: 'Categoria não encontrada' });
      }
    })
    .catch((err) => {
      console.error('Erro ao remover categoria', err);
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

export default router;
