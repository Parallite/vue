<template>
  <div class="wrapper">
    <div v-if="showForm">
      <AddPaymentForm
        :showContextMenuForm="showForm"
        :activeTarget="activeTarget"
      />
    </div>
    <div v-if="showBtns">
      <div><button @click="startEditData">Редактировать</button></div>
      <div><button @click="removeData">Удалить</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditContextMenu",
  props: {
    activeTarget: Number,
    default: () => Number,
  },
  data() {
    return {
      showBtns: true,
      showForm: false,
    };
  },
  components: {
    AddPaymentForm: () => import("./AddPaymentForm.vue"),
  },
  methods: {
    startEditData() {
      this.showForm = true;
      this.showBtns = false;
    },
    removeData() {
      this.$store.commit("removeItemFromPaymentsList", this.activeTarget);
      this.$editContextMenu.hide("hide");
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: absolute;
  background: #efefef;
  top: 20%;
  left: 30%;
}
</style>