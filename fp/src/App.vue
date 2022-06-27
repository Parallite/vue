<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn plain :ripple="false" to="/dashboard">Dashboard</v-btn>
      <v-btn plain :ripple="false" to="/about">About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer>
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
