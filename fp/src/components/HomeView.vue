<template>
  <div class="home">
    <header>
      <div class="title">My personal costs</div>
    </header>
    <main>
      <button @click="showForm = !showForm">Add new cost +</button>
      <AddPaymentForm v-if="showForm" @addNewPayment="addPaymentData" />
      <PaymentsDisplay :items="paymentsList" />
      <PaymentsPagination
        :itemsLength="paymentsList.length"
        @changePages="changePages"
      />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "@/components/PaymentsDisplay.vue";
import AddPaymentForm from "@/components/AddPaymentForm.vue";
import PaymentsPagination from "@/components/PaymentsPagination.vue";
export default {
  name: "HomeView",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    PaymentsPagination,
  },
  data() {
    return {
      showForm: false,
      paymentsList: [],
      activePages: 1,
    };
  },
  methods: {
    addPaymentData(data) {
      this.paymentsList.push(data);
    },
    changePages(pagNum) {
      this.activePages = pagNum;
    },
    fetchData() {
      return [
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
      ];
    },
  },
  created() {
    this.paymentsList = this.fetchData();
  },
  mounted() {},
};
</script>

<style scoped>
</style>
