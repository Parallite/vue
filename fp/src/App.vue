<template>
  <v-app>
    <v-app-bar app flat color="background">
      <v-btn plain :ripple="false" to="/dashboard">Dashboard</v-btn>
      <v-btn plain :ripple="false" to="/about">About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer color="color">
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
.color {
  background: rgb(0, 150, 136);
  background: linear-gradient(
    0deg,
    rgba(0, 150, 136, 1) 0%,
    rgba(226, 246, 246, 1) 100%
  );
}
.background {
  background: rgb(77, 182, 172);
  background: linear-gradient(
    180deg,
    rgba(77, 182, 172, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>
