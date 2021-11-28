<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <botao-padrao
      aparencia="primario"
      arredondado="true"
      titulo="confirmar"
      @click="teste"
    /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
//import BotaoPadrao from "@/components/BotaoPadrao.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    //    BotaoPadrao,
  },
  methods: {
    // teste: (e) => {
    //   console.log(e);
    // },
  },
};
</script>
