<template>
  <button
    @click="click($event)"
    :class="[
      'botao',
      aparencia == 'primario' ? 'botao-primario' : 'botao-secundario',
      arredondado ? 'botao-arredondado' : 'botao-container',
    ]"
  >
    {{ titulo }}
  </button>
</template>

<script>
export default {
  name: "BotaoPadrao",
  props: {
    titulo: String,
    aparencia: {
      type: String,
      default: "primario",
    }, // primario ou secundario
    arredondado: Boolean,
  },
  methods: {
    click(e) {
      this.$emit("click", e);
    },
  },
  data() {
    return {
      styleBotao: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.botao {
  border: none;
  outline: none;
  line-height: 20px;
  text-align: center;
}
.botao:hover {
  filter: brightness(0.8);
}
.botao-primario {
  background-color: #780116;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  color: #ffffff;
}
.botao-secundario {
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #000000;
}
.botao-container {
  width: 100%;
  max-width: 700px;
  padding: 16px;
  border-radius: 10px;
}
.botao-arredondado {
  border-radius: 30px;
  //padding: 16px 45px;
}
</style>
