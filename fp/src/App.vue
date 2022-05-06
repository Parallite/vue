<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'Dashboard', params: { page: '1' } }"
        >Dashboard</router-link
      >
      | <router-link to="/about">About</router-link> |
      <router-link to="/notfound">notfound</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
