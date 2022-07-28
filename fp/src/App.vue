<template>
  <v-app class="body" style="background-color: #e3edf2">
    <v-app-bar
      app
      flat
      color="#4e7d96"
      class="d-flex justify-center justify-sm-start"
    >
      <v-btn class="header_btn" plain :ripple="false" dark to="/dashboard"
        >Dashboard</v-btn
      >
      <v-btn class="header_btn" plain :ripple="false" dark to="/about"
        >About</v-btn
      >
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer color="#4e7d96">
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

<style>
@font-face {
  font-family: "Inconsolata";
  font-style: normal;
  font-weight: 400;
  src: local("Inconsolata"),
    url("./assets/fonts/Inconsolata/Inconsolata-VariableFont_wdth_wght.woff")
      format("woff");
}
.body {
  font-family: "Inconsolata";
}

.v-application .text-md-h3 {
  font-family: "Inconsolata", sans-serif !important;
  background: linear-gradient(-45deg, #0a0d25, #c9693c, #40667b, #0a0d25);
  background-size: 300%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text_gadient_animation 6s ease-in-out infinite;
}

.v-application .text-h4 {
  font-family: "Inconsolata", sans-serif !important;
  background: linear-gradient(-45deg, #0a0d25, #c9693c, #40667b, #0a0d25);
  background-size: 300%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text_gadient_animation 6s ease-in-out infinite;
}

.header_btn {
  background: #4e7d96;
  margin: 0 15px;
  transition: all 0.5s ease;
}

.header_btn:hover {
  transform: scale(1.1);
  border-radius: 9px;
  box-shadow: 5px 5px 10px #3e6478, -5px -5px 10px #5e96b4;
}

.header_btn:active {
  border-radius: 9px;
  background: linear-gradient(145deg, #467187, #5386a1);
  box-shadow: 5px 5px 10px #3e6478, -5px -5px 10px #5e96b4;
}

@keyframes text_gadient_animation {
  0% {
    background-position: 0px 50%;
    -moz-background-position: 0px 50%;
  }
  50% {
    background-position: 100% 50%;
    -moz-background-position: 100% 50%;
  }
  100% {
    background-position: 0px 50%;
    -moz-background-position: 0px 50%;
  }
}

@keyframes btn-pulse-animate {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(255, 132, 75, 0.4);
    box-shadow: 0 0 0 0 rgba(255, 132, 75, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(255, 132, 75, 0);
    box-shadow: 0 0 0 0 rgba(255, 132, 75, 0);
  }
}
</style>
