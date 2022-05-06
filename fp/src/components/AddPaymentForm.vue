<template>
  <div class="form-wrapper">
    <input v-model="category" placeholder="Payment description" />
    <input v-model="value" placeholder="Payment amount" />
    <input v-model="date" placeholder="Payment date" />
    <button @click="onClickSave">ADD +</button>
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
  },
  methods: {
    onClickSave() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      };
      this.$emit("addNewPayment", data);
      console.log(data);
    },
  },
};
</script>
<style scoped>
</style>