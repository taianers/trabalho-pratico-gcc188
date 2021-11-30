<template>
  <div id="app">
    <div id="nav">
      <div></div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
*,
*:after,
*:before {
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 15px;
}
a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
