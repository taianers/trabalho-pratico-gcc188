import Api from "./Api";

const ExemploGet = () => {
  return Api().get("/url-do-get");
};

export { ExemploGet };

// Para usar:
//     - Importar a funcao (import { ExemploGet } from '@/services/ExemploApi')
//     - ExemploGet().then(res => {
//         dados ficam em res.data
//     }).catch(error => {
//         console.error('descricao do erro', error)
//         ou
//         console.error('descricao do erro', error.response) se tiver mensagem de erro etc
//     })
