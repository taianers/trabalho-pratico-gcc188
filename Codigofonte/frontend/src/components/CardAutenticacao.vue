<template>
  <div class="container">
    <input />
    <input />
    <div class="container-linha">
      <p>
        Esqueceu a senha?
      </p>
      <a>Clique aqui</a>
    </div>
    <button>Entrar</button>
    <div class="container-linha">
      <p>
        É novo por aqui?
      </p>
      <button>Crie uma conta</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardAutenticacao"
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
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  color: #ffffff;
  p {
    margin-bottom: 0;
  }
}

.container-linha {
  display: flex;
  font-weight: 300px;
  font-size: 16px;
  gap: 4px;
  justify-content: center;
}
</style>
