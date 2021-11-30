import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Dashboard/Login.vue";
import CadastrarUsuario from "../views/Dashboard/CadastrarUsuario.vue";
import RedefinirSenha from "../views/Dashboard/RedefinirSenha.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: CadastrarUsuario,
  },
  {
    path: "/redefinirsenha",
    name: "redefinirsenha",
    component: RedefinirSenha,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
