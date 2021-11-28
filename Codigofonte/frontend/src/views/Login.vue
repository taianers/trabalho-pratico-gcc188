<template>
  <div class="container">
    <div class="campo">
      <input type="text" required="" />
      <label>Email</label>
    </div>
    <div class="campo">
      <input type="password" required="" />
      <label>Senha</label>
    </div>
    <div class="container-linha">
      <p>
        Esqueceu sua senha?
        <a href="#" id="meulink">Clique aqui</a>
      </p>
    </div>
    <BotaoPadrao aparencia="botao-secundario" titulo="Entrar" @click="teste" />
    <div class="container-linha">
      <p>
        É novo por aqui?
      </p>
      <BotaoPadrao
        aparencia="botao-secundario"
        arredondado="true"
        titulo="Crie uma conta"
        @click="teste"
      />
    </div>
  </div>
</template>

<script>
import BotaoPadrao from "../components/BotaoPadrao.vue";

export default {
  name: "login",
  components: {
    BotaoPadrao,
  },

  methods: {
    teste: (e) => {
      console.log(e);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  background: #780116;
  box-shadow: 10px 10px 41px #000000;
  border-radius: 20px;
  padding: 100px 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 500px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: normal;
  color: #ffffff;
  p {
    margin-bottom: 0;
  }
}

.container-linha {
  display: flex;
  font-size: 16px;
  gap: 4px;
  padding: 5px;
}

.container .campo {
  position: relative;
}

.container .campo input {
  width: 100%;
  font-size: 24px;
  background: transparent;
  color: #ffffff;
  border: none;
  outline: none;
  border-bottom: 1px solid #ffffff;
  margin-bottom: 30px;
}

.container .campo label {
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

.container .campo input:focus ~ label,
.container .campo input:valid ~ label {
  top: -30px;
  font-size: 16px;
}

#meulink {
  color: #ffffff;
  font-weight: bold;
}
</style>
