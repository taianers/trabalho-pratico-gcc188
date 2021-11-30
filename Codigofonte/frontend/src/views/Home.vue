<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <ModalVerMais idReceita="61a4275d935baf039e344833" /> -->
    <CadastrarReceita />
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
// import HelloWorld from '@/components/HelloWorld.vue';
import CadastrarReceita from "@/components/CadastrarReceita.vue";
//import BotaoPadrao from "@/components/BotaoPadrao.vue";

export default {
  name: "Home",
  components: {
    CadastrarReceita
    // ModalVerMais
    //    BotaoPadrao,
  },
  methods: {
    // teste: (e) => {
    //   console.log(e);
    // },
  }
};
</script>
