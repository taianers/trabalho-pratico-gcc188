import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Usuario from '../schemas/Usuario';
import Autenticacao from '../../config/auth';
import Mailer from '../../modules/Mailer';
import { mensagens } from '../../utils/mensagensInformativas';
import AuthMiddleware from '../middlewares/Auth';

const router = new Router();

const gerarToken = (params) => {
  return jwt.sign(params, Autenticacao.secret, {
    expiresIn: 86400,
  });
};

router.post('/cadastrarusuario', (req, res) => {
  const { nome, email, senha } = req.body;
  Usuario.findOne({ email })
    .then((dadoUsuario) => {
      if (dadoUsuario) {
        return res.status(400).send({ error: 'Usuário já existe' });
      } else {
        Usuario.create({ nome, email, senha })
          .then((usuario) => {
            return res.send({ usuario });
          })
          .catch((error) => {
            console.error('Erro ao salvar usuário', error);
            return res.status(400).send({ erro: mensagens.ERRO_CADASTRAR });
          });
      }
    })
    .catch((error) => {
      console.error('', error);
      return res.status(500).send({ erro: mensagens.ERRO_CADASTRAR });
    });
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  Usuario.findOne({ email })
    .select('+senha')
    .then((usuario) => {
      if (usuario) {
        bcrypt
          .compare(senha, usuario.senha)
          .then((resultado) => {
            if (resultado) {
              const token = gerarToken({
                uid: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                permissao: usuario.isAdmin,
              });
              return res.send({ token: token, expiracaoToken: '1d' });
            } else {
              return res.status(400).send({ erro: 'Senha Inválida!' });
            }
          })
          .catch((error) => {
            console.error('Erro ao verificar senha', error);
            return res.status(500).send({ error: mensagens.ERRO_INTERNO });
          });
      } else {
        res.status(404).send({ erro: mensagens.DADO_NAO_ENCONTRADO });
      }
    })
    .catch((error) => {
      console.error('Erro ao logar', error);
      return res.status(500).send({ erro: mensagens.ERRO_INTERNO });
    });
});

router.post('/esqueciminhasenha', (req, res) => {
  const { email } = req.body;

  Usuario.findOne({ email })
    .then((usuario) => {
      if (usuario) {
        const token = crypto.randomBytes(20).toString('hex');
        const expiracao = new Date();
        expiracao.setHours(new Date().getHours() + 1);

        Usuario.findByIdAndUpdate(usuario.id, {
          $set: {
            senhaResetToken: token,
            senhaResetTokenExpiracao: expiracao,
          },
        })
          .then(() => {
            Mailer.sendMail(
              {
                to: email,
                from: 'contato@buchinhocheio.com.br',
                template: 'auth/esqueciMinhaSenha',
                context: { token },
              },
              (error) => {
                if (error) {
                  console.error('Erro ao enviar email', error);
                  return res.status(400).send({
                    erro: 'Falha ao enviar email de recuperacao de senha',
                  });
                } else {
                  return res.send();
                }
              },
            );
          })
          .catch((error) => {
            console.error(
              'Erro ao salvar o token de recuperação de senha',
              error,
            );
            return res.send.status(500).send({ error: mensagens.ERRO_INTERNO });
          });
      } else {
        res.status(404).send({ error: mensagens.DADO_NAO_ENCONTRADO });
      }
    })
    .catch((error) => {
      console.error('Erro no esqueci minha senha ', error);
      return res.send.status(500).send({ error: mensagens.ERRO_INTERNO });
    });
});

router.post('/resetarsenha', (req, res) => {
  const { email, token, novaSenha } = req.body;

  Usuario.findOne({ email })
    .select('+ senhaResetToken senhaResetTokenExpiracao')
    .then((usuario) => {
      if (usuario) {
        if (
          token != usuario.senhaResetToken ||
          new Date().now > usuario.senhaResetTokenExpiracao
        ) {
          return res.status(400).send({ erro: 'Token Invalido' });
        } else {
          usuario.senhaResetToken = undefined;
          usuario.senhaResetTokenExpiracao = undefined;
          usuario.senha = novaSenha;

          usuario
            .save()
            .then(() => {
              return res.send({ message: mensagens.SUCESSO_ALTERAR });
            })
            .catch((error) => {
              console.error('Erro ao salvar nova senha do usuario', error);
              return res.status(500).send({ error: mensagens.ERRO_INTERNO });
            });
        }
      } else {
        return res.status(404).send({ error: mensagens.DADO_NAO_ENCONTRADO });
      }
    })
    .catch((error) => {
      console.error('Erro no recuperar minha senha', error);
      return res.status(500).send({ error: mensagens.ERRO_INTERNO });
    });
});

router.get('/infousuario/:id', AuthMiddleware('admin'), (req, res) => {
  const { id } = req.params;

  Usuario.findById(id)
    .then((usuario) => {
      if (usuario) {
        return res.send(usuario);
      } else {
        return res.status(404).send({ erro: 'Usuário não encontrado' });
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar usuário: ', error);
      res.status(500).send({ erro: mensagens.ERRO_LISTAR });
    });
});

router.get('/infousuarios', AuthMiddleware('admin'), (req, res) => {
  Usuario.find()
    .then((usuarios) => {
      if (usuarios) {
        return res.send(usuarios);
      } else {
        return res.status(404).send({ erro: 'Nenhum usuário encontrado' });
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar usuários: ', error);
      res.status(500).send({ erro: mensagens.ERRO_INTERNO });
    });
});

router.delete('/deletarusuario', AuthMiddleware('admin'), (req, res) => {
  const { email } = req.body;
  Usuario.findOneAndDelete({ email })
    .then(() => {
      return res.send({ mensagem: mensagens.SUCESSO_EXCLUIR });
    })
    .catch((error) => {
      console.error('Erro ao excluir usuário: ', error);
      return res.status(400).send({ erro: mensagens.ERRO_EXCLUIR });
    });
});

export default router;
