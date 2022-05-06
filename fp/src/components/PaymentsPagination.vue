<template>
  <div>
    <div>
      <span>&#60;</span>
      <button
        @click="onClickPag(pagNum)"
        v-for="pagNum in paginationPages"
        :key="pagNum"
      >
        {{ pagNum }}
      </button>
      <span>&#62;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentsPagination",
  props: {
    itemsLength: {
      type: Number,
      default: () => Number,
    },
  },
  data() {
    return {
      paginationPages: 1,
    };
  },
  computed: {
    getEveryFive() {
      return this.itemsLength % 5 === 0 ? true : false;
    },
  },
  methods: {
    onClickPag(pagNum) {
      this.$emit("changePages", pagNum);
    },
  },
};
</script>

<style></style>
