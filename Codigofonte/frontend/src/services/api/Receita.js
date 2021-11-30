import Api from "./Api";

const getReceitas = () => {
  return Api().get("/receita/");
};

const getReceita = (id) => {
  return Api().get(`/receita/${id}`);
};

const postReceita = (receita) => {
  return Api().post("/receita", receita);
};

export { getReceitas, getReceita, postReceita };

// Para usar:
//     - Importar a funcao (import { ExemploGet } from '@/services/ExemploApi')
//     - ExemploGet().then(res => {
//         dados ficam em res.data
//     }).catch(error => {
//         console.error('descricao do erro', error)
//         ou
//         console.error('descricao do erro', error.response) se tiver mensagem de erro etc
//     })
