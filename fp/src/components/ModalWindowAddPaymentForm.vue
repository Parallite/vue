<template>
  <div class="wrapper">
    <div class="header">{{ settings.title }}</div>
    <div class="content">
      <component :is="settings.component" />
    </div>
    <div class="footer">
      <button @click="onCloseClick">Close</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalWindowAddPaymentForm",
  props: {
    settings: Object,
  },
  components: {
    AddPaymentForm: () => import("./AddPaymentForm.vue"),
    AuthForm: () => import("./AuthForm.vue"),
  },
  methods: {
    onCloseClick() {
      this.$modal.hide();
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 20px;
  position: absolute;
  top: 10%;
  left: 20%;
  background: #efefef;
}
</style>