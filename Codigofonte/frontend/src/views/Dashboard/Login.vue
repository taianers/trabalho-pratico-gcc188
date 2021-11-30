<template>
  <div>
    <div @click="$router.push('/')" class="voltar"></div>
    <div class="container">
      <InputPadrao label="Email" style="margin-bottom: 30px;" />
      <InputPadrao label="Senha" type="password" style="margin-bottom: 15px;" />
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
        @click="teste"
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
import InputPadrao from "../../components/InputPadrão.vue";

export default {
  name: "login",
  components: {
    BotaoPadrao,
    InputPadrao,
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
</style>
