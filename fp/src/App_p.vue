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
    <transition name="fade">
      <ModalWindowAddPaymentForm :settings="settings" v-if="modalShow" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalShow: false,
      settings: {},
    };
  },
  methods: {
    goToAboutPage() {
      this.$router.push({
        name: "Dashboard",
      });
    },
    onShow(data) {
      this.modalShow = true;
      this.settings = data;
    },
    onHide() {
      this.settings = {};
      this.modalShow = false;
    },
  },
  mounted() {
    this.$modal.EventBus.$on("show", this.onShow);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("show", this.onShow);
    this.$modal.EventBus.$off("hide", this.onHide);
  },
  components: {
    ModalWindowAddPaymentForm: () =>
      import("./components/ModalWindowAddPaymentForm.vue"),
  },
};
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
