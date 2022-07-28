<template>
  <v-card class="pa-8 border-form">
    <h3 class="form_title">Fill the form</h3>
    <v-text-field
      class="mt-5"
      v-model="category"
      label="New category name"
      outlined
      dense
      :rules="rulesCategory"
      height="50"
      color="#FF844B"
    ></v-text-field>
    <div class="d-flex justify-space-between">
      <v-btn
        @click="onClickSave"
        :ripple="false"
        class="mb-12 category-form_btn"
        color="#FF844B"
        dark
        >ADD<v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        @click="onClickDelete"
        :ripple="false"
        class="mb-12 category-form_btn"
        color="#BF360C"
        dark
        >DELETE<v-icon class="pl-2">mdi-delete</v-icon>
      </v-btn>
    </div>
    <div v-if="warning" class="d-flex justify-center red pt-2 pb-2">
      You have already this category
    </div>
  </v-card>
</template>
<script>
export default {
  name: "AddCategoryForm",
  data() {
    return {
      category: "",
      warning: false,
      rulesCategory: [
        (value) => !!value || "Required",
        (value) =>
          (value && new RegExp(/^[a-z]+$/gim).test(value)) ||
          "Use alphabetical format",
      ],
    };
  },
  props: {},
  computed: {
    categoryList() {
      return this.$store.getters.getCategoryList;
    },
  },
  methods: {
    checkForm() {
      if (new RegExp(/^[a-z]+$/gim).test(this.category)) {
        return true;
      } else {
        return false;
      }
    },
    onClickSave() {
      if (this.checkForm()) {
        const oldCategory = this.categoryList;
        if (!oldCategory.includes(this.category) && this.category !== "") {
          const newCategory = this.category;
          this.$store.commit("addNewCategory", newCategory);
          this.warning = false;
        } else {
          this.warning = true;
        }
      }
    },
    onClickDelete() {
      const oldCategory = this.categoryList;
      if (oldCategory.includes(this.category)) {
        const categoryDelete = this.category;
        this.$store.commit("deleteCategory", categoryDelete);
      }
    },
  },
  mounted() {},
  async created() {
    await this.$store.dispatch("fetchCategoryList");
  },
};
</script>
<style scoped>
.border-form {
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
  font-size: 12px;
  background: linear-gradient(-45deg, #0a0d25, #c9693c, #40667b, #0a0d25);
  background-size: 300%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text_gadient_animation 6s ease-in-out infinite;
}

.category-form_btn {
  transition: all 0.5s ease;
}
.category-form_btn:hover {
  color: #703c24;
  transform: translateY(-5px);
  -webkit-box-shadow: 0px 15px 5px -5px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 15px 5px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 15px 5px -5px rgba(0, 0, 0, 0.2);
}
</style>