<template>
  <div class="home">
    <header>
      <div class="title">My personal costs</div>
      <div>Total price = {{ getFullPaymentValue }}</div>
    </header>
    <main>
      <button @click="showForm = !showForm">Add new cost +</button>
      <AddPaymentForm v-if="showForm" />
      <PaymentsDisplay :items="currentElements"/>
      <MyPagination :cur="cur" :length="getPaymentList.length" :n="n" @changePage="changePage"/>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "@/components/PaymentsDisplay.vue";
import AddPaymentForm from "@/components/AddPaymentForm.vue";
import MyPagination from "@/components/MyPagination.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    MyPagination
  },
  data() {
    return {
      showForm: false,
      cur: 1,
      n: 5,
    };
  },
  computed: {
    ...mapGetters(["getFullPaymentValue", "getPaymentList"]),
    currentElements() {
      return this.getPaymentList.slice(this.n * (this.cur - 1), this.n * (this.cur - 1) + this.n)
    }
  },
  methods: {
    addPaymentData(data) {
      this.paymentsList.push(data);
    },
    changePage(p) {
      this.cur = p;
    }
  },
  created() {
    this.$store.dispatch("fetchData");
  },
  mounted() {},
};
</script>

<style scoped>
</style>
