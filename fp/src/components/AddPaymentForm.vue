<template>
  <div class="form-wrapper">
    <NewCategoryForm />
    <select v-model="category" v-if="categoryList">
      <option v-for="(value, idx) in categoryList" :key="idx">
        {{ value }}
      </option>
    </select>
    <input v-model.number="value" placeholder="Payment amount" />
    <input v-model="date" placeholder="Payment date" />
    <button @click="onClickSave">ADD +</button>
  </div>
</template>
<script>
import NewCategoryForm from "@/components/NewCategoryForm.vue";

export default {
  components: {
    NewCategoryForm,
  },
  name: "AddPaymentForm",
  data() {
    return {
      date: "",
      category: "",
      value: "",
    };
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
    newCategoryList() {
      return this.$store.getters.newCategoryList;
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
  },
  async created() {
    await this.$store.dispatch("fetchCategoryList");
  },
};
</script>
<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>