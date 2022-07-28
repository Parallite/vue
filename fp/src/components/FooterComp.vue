<template>
  <v-footer dark padless>
    <v-card
      flat
      tile
      class="white--text text-center"
      color="rgba(78, 125, 150)"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text social-btn"
          icon
          plain
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
        vel ut orci. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComp",
  data() {
    return {
      icons: ["mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
};
</script>

<style scoped>
.social-btn {
  transition: all 1.5s ease;
}

.social-btn:hover {
  transform: scale(1.4) rotate(360deg);
  -webkit-box-shadow: 0px 0px 1px 1px #e3edf2;
  box-shadow: 0px 0px 1px 1px #e3edf2;
}

.social-btn:nth-child(1):hover {
  background-color: #1da1f2;
}

.social-btn:nth-child(2):hover {
  background-color: #0e76a8;
}

.social-btn:nth-child(3):hover {
  background: #d6249f;
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
}
</style>
