<template>
  <div class="containerWrapper">
    <div class="container">
      <div class="card">
        <div class="head">
          <a href="#">X</a>
        </div>
        <hr />
        <div class="itensReceita">
          <div class="item">
            <div class="label">
              <p>Nome da receita</p>
              <p class="conteudo">{{ dados.nome }}</p>
            </div>
            <div class="label">
              <p>Ingredientes</p>
              <p class="conteudo">
                {{ dados.ingredientes }}
              </p>
            </div>
            <div class="label">
              <p>Modo de preparo</p>
              <p class="conteudo">
                {{ dados.modoPreparo }}
              </p>
            </div>
          </div>
          <div class="item">
            <div class="label imagem">
              <img
                :src="require(`../../../backend/src/images/${dados.foto}`)"
              />
            </div>
            <div class="label">
              <p>Categoria</p>
              <p class="conteudo">{{ dados.categoria }}</p>
            </div>
            <div style="display: flex;">
              <div class="label" style=" margin: 5px;">
                <p>Tempo de preparo</p>
                <p class="conteudo" style="padding: 15px">
                  <span class="numero">{{ dados.tempoPreparo }}</span> Minutos
                </p>
              </div>
              <div class="label" style=" margin: 5px">
                <p>Porções</p>
                <p class="conteudo" style="padding: 15px">
                  <span class="numero">{{ dados.qtdPorcoes }}</span> Porções
                </p>
              </div>
            </div>
            <div class="label">
              <p>Colaborador</p>
              <p class="conteudo">{{ dados.nomeCriador }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getReceita } from "@/services/api/Receita.js";
export default {
  name: "ModalVerMais",
  props: {
    idReceita: {
      type: String
    }
  },
  data() {
    return {
      dados: {}
    };
  },

  mounted() {
    getReceita(this.idReceita)
      .then((res) => {
        this.dados = res.data;
        if (!this.dados.foto) {
          this.dados.foto = "placeholder.png";
        }
      })
      .catch((error) => console.log(error.response));
  }
};
</script>

<style scoped lang="scss">
.containerWrapper {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
}
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
  border: 0;
}

hr {
  color: rgba(0, 0, 0, 0.5);
  margin: 0px;
  margin-bottom: 10px;
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

.conteudo {
  background-color: #e1e1e1;
  border-radius: 7px;
  padding: 5px 20px;
  white-space: pre-line;
}

.label {
  margin-bottom: 50px;
}

.imagem {
  display: flex;
  justify-content: center;
}

img {
  border-radius: 8px;
  width: 90%;
  height: 150px;
  aspect-ratio: 16/7;
}

.numero {
  background-color: white;
  padding: 5px;
  border-radius: 50%;
}
</style>
