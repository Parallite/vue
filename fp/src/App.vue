<template>
  <v-app style="background-color: rgba(227, 237, 242)">
    <v-app-bar app flat color="rgba(78, 125, 150)">
      <v-btn plain :ripple="false" dark to="/dashboard">Dashboard</v-btn>
      <v-btn plain :ripple="false" dark to="/about">About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer color="rgba(78, 125, 150)">
      <FooterComp />
    </v-footer>
  </v-app>
</template>

<script>
import FooterComp from "./components/FooterComp.vue";
export default {
  components: { FooterComp },
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style scoped>
</style>
