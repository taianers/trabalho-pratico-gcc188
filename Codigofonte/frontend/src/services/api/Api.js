import axios from "axios";
// import store from '@/store';

//Caso ocorra algum erro no servidor (de teste ou de produção), o erro pode ser a falta da
//url completa no lugar do /api
const apiUrl =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000";

export default () => {
  // console.log("token", store.getters["auth/token"]);
  return axios.create({
    baseURL: apiUrl,
    // Configuração automática de token na requisição, se tiver as propriedades na store
    // headers: {
    //   Authorization: store.getters['auth/isLoggedIn']
    //     ? `Bearer ${store.getters['auth/token']}`
    //     : undefined,
    // },
  });
};
