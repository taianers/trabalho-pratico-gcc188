<template>
  <div>
    <div @click="$router.push('/')" class="voltar"></div>
    <div class="container">
      <div class="container-input">
        <input
          v-model="form.email"
          type="email"
          name="email"
          required
          autocomplete="off"
        />
        <label>Email</label>
      </div>
      <div class="container-input">
        <input
          v-model="form.senha"
          type="password"
          name="senha"
          required
          autocomplete="off"
        />
        <label>Senha</label>
      </div>
      <div
        class="container-linha"
        style="justify-content: center; margin-bottom: 40px;"
      >
        <p>
          Esqueceu sua senha?
          <a href="#" id="meulink" @click="$router.push('/redefinirsenha')"
            >Clique aqui</a
          >
        </p>
      </div>
      <BotaoPadrao
        aparencia="botao-secundario"
        titulo="Entrar"
        @click="login"
        style="margin-bottom: 20px;"
      />
      <div class="container-linha">
        <p>
          É novo por aqui?
        </p>
        <BotaoPadrao
          aparencia="botao-secundario"
          arredondado="true"
          titulo="Crie uma conta"
          @click="$router.push('/cadastro')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BotaoPadrao from "../../components/BotaoPadrao.vue";
// import InputPadrao from "../../components/InputPadrão.vue";
import { postLogin } from "@/services/api/Auth.js";
import { setCookie } from "@/utils/Cookie.js";

export default {
  name: "login",
  components: {
    BotaoPadrao
    // InputPadrao
  },

  data() {
    return {
      form: {
        email: "",
        senha: ""
      }
    };
  },

  methods: {
    login() {
      console.log(this.form);
      postLogin(this.form)
        .then((res) =>
          setCookie("token", res.data.token, {
            expires: Number.parseInt(res.data.expiracaoToken)
          })
        )
        .catch((error) => console.log(error));
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  background: #780116;
  box-shadow: 10px 10px 41px #000000;
  border-radius: 20px;
  padding: 100px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 540px;
  height: 633px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: normal;
  color: #ffffff;
  p {
    margin-bottom: 0;
  }
  margin-top: 30px;
}

.container-linha {
  display: flex;
  font-size: 16px;
  gap: 4px;
  padding: 5px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

#meulink {
  color: #ffffff;
  font-weight: bold;
}

.voltar {
  background-image: url("../../assets/dashboard/voltar.svg");
  background-size: cover;
  width: 125px;
  height: 25px;
  cursor: pointer;
  margin-left: 30px;
}

.container-input {
  position: relative;
  width: 100%;
}

.container-input input {
  width: 100%;
  font-size: 24px;
  background: transparent;
  color: #ffffff;
  border: none;
  outline: none;
  border-bottom: 1px solid #ffffff;
  margin-bottom: 30px;
}

.container-input label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 20px;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  pointer-events: none;
  transition: 0.5s;
}

.container-input input:focus ~ label,
.container-input input:valid ~ label {
  top: -30px;
  font-size: 16px;
}
</style>
