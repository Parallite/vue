<template>
  <div class="wrapper">
    <div v-if="showForm">
      <AddPaymentForm
        :showContextMenuForm="showForm"
        :activeTarget="activeTarget"
      />
    </div>
    <div v-if="showBtns">
      <div>
        <v-card elevation="2">
          <v-btn
            @click="startEditData"
            color="teal mr-2"
            dark
            elevation="2"
            small
            x-small
            >EDIT</v-btn
          >
          <v-btn
            @click="removeData"
            color="teal"
            dark
            elevation="2"
            small
            x-small
            >DELETE</v-btn
          >
        </v-card>
      </div>
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
    AddPaymentForm: () => import("../src/components/AddPaymentForm.vue"),
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
  position: absolute;
  background: #efefef;
  top: 20%;
  left: 30%;
}
</style>