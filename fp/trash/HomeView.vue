<template>
  <div class="home">
    <header>
      <div class="title">My personal costs</div>
      <div>Total price = {{ getFullPaymentValue }}</div>
    </header>
    <main>
      <button @click="openModalForm">Show</button>
      <PaymentsDisplay :items="currentElements" :curPage="cur" />
      <MyPagination
        :cur="cur"
        :length="getPaymentList.length"
        :n="n"
        @changePage="changePage"
      />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./PaymentsDisplayOld.vue";
import MyPagination from "./MyPagination.vue";
import { mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    PaymentsDisplay,
    MyPagination,
  },
  data() {
    return {
      cur: 1,
      n: 5,
    };
  },
  computed: {
    ...mapGetters(["getFullPaymentValue", "getPaymentList"]),
    currentElements() {
      return this.getPaymentList.slice(
        this.n * (this.cur - 1),
        this.n * (this.cur - 1) + this.n
      );
    },
  },
  methods: {
    addPaymentData(data) {
      this.paymentsList.push(data);
    },
    changePage(p) {
      this.cur = p;
    },
    openModalForm() {
      this.$modal.show("addform", {
        title: "Add New Payment",
        component: "AddPaymentForm",
      });
    },
  },
  created() {
    this.$store.dispatch("fetchData");
  },
  mounted() {},
};
</script>

<style scoped>
</style>