<template>
  <div>
    <input v-model="text" placeholder="Add new component" />
    <button @click="AddCategory(text)">Add new category</button>
  </div>
</template>

<script>
export default {
  name: "NewCategoryForm",
  data() {
    return {
      text: "",
      newCategoryList: [],
    };
  },
  methods: {
    AddCategory(text) {
      if (text !== "") {
        this.newCategoryList.push(text);
        this.$store.commit("setNewCategory", this.newCategoryList);
        this.newCategoryList.length = 0;
      }
    },
  },
};
</script>
