<template>
  <div
    class="notfound_container"
    :style="{ backgroundImage: 'url(' + notFoundSvg + ')' }"
  >
    <div class="notfound_btn-wrp">
      <v-btn
        :ripple="false"
        class="notfound_btn"
        width="200px"
        color="#FF844B"
        dark
        to="/dashboard"
        large
        >Go back home<v-icon class="pl-5">mdi-home</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import notFoundSvg from "@/assets/img/404.svg";

export default {
  name: "NotFound",
  data() {
    return {
      notFoundSvg: notFoundSvg,
    };
  },
  methods: {},
};
</script>

<style>
.notfound_container {
  height: 90%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.notfound_btn-wrp {
  position: absolute;
  left: 50%;
  top: 90%;
  transform: translate(-50%, -50%);
}

.notfound_btn {
  animation: btn-pulse-animate 2s ease-in-out infinite;
}
</style>