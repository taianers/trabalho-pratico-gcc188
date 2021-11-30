import Api from "./Api";

const getCategorias = () => {
  return Api().get("/categoria/");
};

const getCategoria = (id) => {
  return Api().get(`/categoria/${id}`);
};

export { getCategorias, getCategoria };

// Para usar:
//     - Importar a funcao (import { ExemploGet } from '@/services/ExemploApi')
//     - ExemploGet().then(res => {
//         dados ficam em res.data
//     }).catch(error => {
//         console.error('descricao do erro', error)
//         ou
//         console.error('descricao do erro', error.response) se tiver mensagem de erro etc
//     })
