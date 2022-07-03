<template>
  <v-card class="pa-8">
    <v-select
      v-model="category"
      :items="categoryList"
      label="Payment category"
      dense
      outlined
    ></v-select>
    <v-text-field
      v-model.number="value"
      label="Payment amount"
      outlined
      dense
    ></v-text-field>
    <v-text-field
      v-model="date"
      label="Payment date"
      outlined
      dense
    ></v-text-field>
    <v-btn
      @click="onClickSave"
      :ripple="false"
      class="mb-12"
      color="#FF844B"
      dark
      >ADD<v-icon>mdi-plus</v-icon></v-btn
    >
  </v-card>
</template>
<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      date: "",
      category: "",
      value: "",
      showEditBtn: false,
    };
  },
  props: {},
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
    editDataList() {
      return this.$store.getters.getEditDataList;
    },
  },
  methods: {
    onClickSave() {
      if (this.editDataList.length === 0) {
        const data = {
          date: this.date || this.getCurrentDate,
          category: this.category,
          value: this.value,
        };
        this.$store.commit("addDataToPaymentsList", data);
      } else {
        let editObj = {
          date: this.date,
          category: this.category,
          value: this.value,
        };
        this.$store.commit("editPaymentsListItem", editObj);
      }
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