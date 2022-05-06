<template>
  <div class="paymentsList">
    <div class="paymentItem" v-for="(item, index) in items" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script scope>
export default {
  name: "PaymentsDisplay",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.paymentsList {
  margin-top: 20px;
}

.paymentsItem {
  margin-top: 10px;
}
</style>
