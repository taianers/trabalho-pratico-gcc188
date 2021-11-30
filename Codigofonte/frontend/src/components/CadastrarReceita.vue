<template>
  <div class="card">
    <div class="itensReceita">
      <div class="item">
        <div class="label">
          <label for="nome">Nome da receita</label><br />
          <input
            v-model="form.nome"
            class="input"
            type="text"
            name="nome"
            id="nome"
            placeholder="Insira o nome da receita"
          />
        </div>
        <div class="label">
          <label for="ingredientes">Ingredientes</label><br />
          <textarea
            v-model="form.ingredientes"
            class="input"
            name="ingredientes"
            id="ingredientes"
            placeholder="Descreva os ingredientes"
          />
        </div>
        <div class="label">
          <label for="modoPreparo">Modo de preparo</label><br />
          <textarea
            v-model="form.modoPreparo"
            class="input"
            type="text"
            name="modoPreparo"
            id="modoPreparo"
            placeholder="Descreva o modo de preparo"
          />
        </div>
      </div>
      <div class="item">
        <label for="foto" class="input imagem">
          Enviar foto da receita
        </label>
        <div style="display: flex; justify-content: center;">
          <botao-padrao
            type="button"
            for="foto"
            titulo="Adicionar foto"
            class="botaoFoto"
            label
            labelfor="foto"
          />
        </div>
        <input
          @change="handleFoto($event)"
          type="file"
          class="label"
          name="foto"
          id="foto"
          ref="file"
          accept="image/*"
          style="visibility: hidden; display: none;"
        /><br />
        <label for="categoria">Categoria</label><br />

        <select
          v-model="form.categoria"
          class="input label"
          type="text"
          name="categoria"
          id="categoria"
        >
          <option disabled selected value="">Selecione uma categoria</option>
          <option
            v-for="categoria in categorias"
            :value="categoria.nome"
            :key="categoria.id"
            >{{ categoria.nome }}</option
          >
        </select>
        <div style="display: flex;">
          <div class="label" style=" margin: 5px;">
            <label for="tempoPreparo">Tempo de preparo</label><br />
            <p class="input inputNumero">
              <input
                v-model="form.tempoPreparo"
                class="numero"
                style="margin-right: 10px;"
                type="text"
                name="tempoPreparo"
                id="tempoPreparo"
              />
              Minutos
            </p>
          </div>
          <div class="label" style=" margin: 5px">
            <label for="qtdPorcoes">Porções</label><br />
            <p class="input inputNumero">
              <input
                v-model="form.qtdPorcoes"
                class="numero"
                style="margin-right: 10px;"
                type="text"
                name="qtdPorcoes"
                id="qtdPorcoes"
              />
              Porções
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <botao-padrao
        aparencia="primario"
        titulo="Enviar Receita"
        arredondado
        @click="salvarReceita"
        class="botaoEnviar"
      />
    </div>
  </div>
</template>

<script>
import BotaoPadrao from "../components/BotaoPadrao.vue";
import { getCategorias } from "@/services/api/Categoria.js";
import { postReceita } from "@/services/api/Receita.js";

export default {
  components: { BotaoPadrao },
  name: "CadastrarReceita",
  props: {
    idReceita: {
      type: String
    }
  },
  data() {
    return {
      categorias: [],
      form: {
        nome: "",
        ingredientes: "",
        modoPreparo: "",
        tempoPreparo: null,
        foto: "",
        categoria: "",
        qtdPorcoes: null
      }
    };
  },

  methods: {
    handleFoto() {
      this.form.foto = this.$refs.file.files[0];
    },
    salvarReceita() {
      console.log(this.form);
      postReceita(this.form)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  mounted() {
    getCategorias()
      .then((res) => {
        this.categorias = res.data;
      })
      .catch((error) => console.log(error.response));
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  margin: 3% auto;
  height: 90%;
  width: 85%;
  left: 0px;
  top: 0px;
  right: 0px;
  background-color: white;
}

.botaoFoto {
  font-size: 15px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.botaoEnviar {
  font-size: 12px;
}

.head {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 21px 34px 19px auto;
}

a {
  color: black;
  font-size: 1.2em;
}

.card {
  width: 100%;
  height: 100%;
}

.itensReceita {
  display: flex;
  justify-content: space-between;
}

.item {
  margin: 20px;
  text-align: left;
  width: 100%;
}

.inputNumero {
  width: 100% !important;
  height: 70%;
  display: flex;
  align-items: center;
}

.input {
  background-color: #e1e1e1;
  border-radius: 7px;
  padding: 5px 20px;
  white-space: pre-line;
  width: 100%;
}

.label {
  margin-bottom: 50px;
}

.imagem {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
}

img {
  border-radius: 8px;
  width: 90%;
  height: 150px;
  aspect-ratio: 16/7;
}

.numero {
  width: 40px;
  height: 25px;
  border-radius: 18px;
  text-align: center;
}

input,
textarea,
select {
  border: none;
  outline: none;
}
</style>
