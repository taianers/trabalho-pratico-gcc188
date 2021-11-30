<template>
  <div>
    <div @click="$router.push('/login')" class="voltar"></div>
    <div class="container">
      <InputPadrao
        label="Nova senha"
        type="password"
        style="margin-bottom: 15px;"
      />
      <InputPadrao
        label="Confirmar nova senha"
        type="password"
        style="margin-bottom: 15px;"
      />
      <BotaoPadrao
        aparencia="botao-secundario"
        titulo="Redefinir"
        @click="teste"
        style="margin-bottom: 20px;"
      />
    </div>
  </div>
</template>

<script>
import BotaoPadrao from "../../components/BotaoPadrao.vue";
import InputPadrao from "../../components/InputPadrão.vue";

export default {
  name: "redefinirSenha",
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

.voltar {
  background-image: url("../../assets/dashboard/voltar.svg");
  background-size: cover;
  width: 125px;
  height: 25px;
  cursor: pointer;
  margin-left: 30px;
}
</style>
