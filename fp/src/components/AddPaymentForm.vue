<template>
  <v-card class="pa-8 border-table">
    <h3 class="form_title">Fill the form</h3>
    <v-select
      v-model="category"
      :items="categoryList"
      label="Payment category"
      dense
      outlined
      color="#FF844B"
    ></v-select>
    <v-text-field
      v-model.number="value"
      label="Payment amount"
      outlined
      :rules="rulesValue"
      height="50"
      color="#FF844B"
    ></v-text-field>
    <v-text-field
      v-model="date"
      label="Payment date"
      outlined
      dense
      :rules="rulesDate"
      height="50"
      color="#FF844B"
    ></v-text-field>
    <v-btn
      @click="onClickSave"
      :ripple="false"
      class="mb-12 payment_btn"
      color="#FF844B"
      dark
      >ADD<v-icon class="pl-2">{{ iconPlus }}</v-icon></v-btn
    >
  </v-card>
</template>
<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      id: 0,
      date: "",
      category: "",
      value: "",
      showEditBtn: false,
      rulesValue: [
        (value) => !!value || "Required",
        (value) =>
          (value && new RegExp(/^[0-9]+\.\d{2}$/gm).test(value)) ||
          new RegExp(/^[0-9]+$/gm).test(value) ||
          "Use '123' or '123.12' format",
      ],
      rulesDate: [
        (value) => !!value || "Required",
        (value) =>
          (value && new RegExp(/^\d{2}\.\d{2}\.\d{4}$/gm).test(value)) ||
          "Use XX.XX.XXXX date format",
      ],
      iconPlus: "mdi-plus",
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
    checkForm() {
      if (
        (new RegExp(/^[0-9]+\.\d{2}$/gm).test(this.value) ||
          new RegExp(/^[0-9]+$/gm).test(this.value)) &&
        new RegExp(/^\d{2}\.\d{2}\.\d{4}$/gm).test(this.date)
      ) {
        return true;
      } else {
        return false;
      }
    },
    onClickSave() {
      if (this.checkForm()) {
        if (this.editDataList.length === 0) {
          const data = {
            date: this.date || this.getCurrentDate,
            category: this.category,
            value: this.value,
            id: 0,
          };
          this.$store.commit("addDataToPaymentsList", data);
          this.iconPlus = "mdi-checkbox-marked-circle";
          setTimeout(() => {
            this.iconPlus = "mdi-plus";
          }, 1500);
        } else {
          let editObj = {
            date: this.date,
            category: this.category,
            value: this.value,
            id: 0,
          };
          this.$store.commit("editPaymentsListItem", editObj);
          this.iconPlus = "mdi-checkbox-marked-circle";
          setTimeout(() => {
            this.iconPlus = "mdi-plus";
          }, 1500);
        }
      } else {
        this.iconPlus = "mdi-cancel";
        setTimeout(() => {
          this.iconPlus = "mdi-plus";
        }, 1500);
      }
    },
  },
  async created() {
    await this.$store.dispatch("fetchCategoryList");
  },
};
</script>
<style scoped>
.border-table {
  border: 5px solid transparent;
  border-image: linear-gradient(
    to left top,
    #adf2f7 10%,
    transparent 30%,
    transparent 70%,
    #adf2f7 90%
  );
  border-image-slice: 1;
}
.form_title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  text-transform: uppercase;
  background: linear-gradient(-45deg, #0a0d25, #c9693c, #40667b, #0a0d25);
  background-size: 300%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text_gadient_animation 6s ease-in-out infinite;
}
.payment_btn {
  position: relative;
  transition: all 0.5s ease;
}
.payment_btn:hover {
  color: #703c24;
  transform: translateY(-5px);
  -webkit-box-shadow: 0px 15px 5px -5px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 15px 5px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 15px 5px -5px rgba(0, 0, 0, 0.2);
}
</style>