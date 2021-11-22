import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { mensagens } from '../../utils/mensagensInformativas';

export default (permissao) => {
  return (req, res, next) => {
    if (!permissao || (permissao != 'admin' && permissao != 'usuario')) {
      console.error('A permissão foi inserida incorretamente');
      return res.status(500).send({ erro: mensagens.ERRO_INTERNO });
    }

    const authHeader = req.headers.authorization;

    if (authHeader) {
      const tokenData = authHeader.split(' ');

      if (tokenData.length != 2) {
        return res.status(401).send({ erro: 'Token fornecido inválido' });
      }
      const [scheme, token] = tokenData;
      if (scheme.indexOf('Bearer') < 0) {
        return res.status(401).send({ erro: 'Token fornecido inválido' });
      }
      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({ erro: 'Token fornecido inválido' });
        } else {
          req.uid = decoded.id;
          req.nome = decoded.nome;
          req.email = decoded.email;
          req.permissao = decoded.permissao;

          if (permissao == 'admin') {
            if (decoded.permissao) return next();
            else {
              return res
                .status(403)
                .send({ erro: 'Não autorizado a fazer essa ação' });
            }
          } else {
            return next();
          }
        }
      });
    } else {
      return res.status(401).send({ erro: 'Token fornecido inválido' });
    }
  };
};
