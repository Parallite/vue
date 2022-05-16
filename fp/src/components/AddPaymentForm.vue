<template>
  <div class="form-wrapper">
    <select v-model="category" v-if="categoryList">
      <option v-for="(value, idx) in categoryList" :key="idx">
        {{ value }}
      </option>
    </select>
    <input v-model.number="value" placeholder="Payment amount" />
    <input v-model="date" placeholder="Payment date" />
    <button @click="onClickSave" v-if="!showContextMenuForm">ADD +</button>
    <button @click="editData" v-if="showContextMenuForm">
      Закончить редактирование
    </button>
  </div>
</template>
<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      date: "",
      category: "",
      value: "",
    };
  },
  props: {
    showContextMenuForm: Boolean,
    activeTarget: Number,
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("UTC", options).format(today);
    },
    categoryList() {
      return this.$store.getters.getCategoryList;
    },
  },
  methods: {
    onClickSave() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      };
      this.$store.commit("addDataToPaymentsList", data);
    },
    editData() {
      let editObj = {
        date: this.date,
        category: this.category,
        value: this.value,
      };
      this.$store.commit("editPaymentsListItem", [this.activeTarget, editObj]);
      this.$editContextMenu.hide("hide");
    },
  },
  async created() {
    await this.$store.dispatch("fetchCategoryList");
  },
  mounted() {
    const { category, section } = this.$route.params;
    if (!category || !section) {
      return;
    }
    this.category = category;
    const { value } = this.$route.query;
    if (!value) return;
    this.value = value;
    if (this.value && this.category) {
      this.onClickSave();
    }
  },
};
</script>
<style scoped>
</style>