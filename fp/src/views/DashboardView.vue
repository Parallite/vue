<template>
  <v-container>
    <v-row
      ><v-col
        ><div class="text-h5 text-sm-h3 pb-6">My personal cost</div>
        <v-dialog v-model="dialog" width="500">
          <template #activator="{ on }"
            ><v-btn v-on="on" color="teal mb-12" :ripple="false" dark
              >ADD NEW COST <v-icon>mdi-plus</v-icon></v-btn
            ></template
          >
          <v-card>
            <AddPaymentForm />
          </v-card>
        </v-dialog>
        <PaymentsDisplay :items="paymentsList" @editModeOn="editModeOn" />
      </v-col>
      <v-col>
        <template>
          <DoughnutChart :chartDataInfo="chartDataInfo" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PaymentsDisplay from "@/components/PaymentsDisplay.vue";
import AddPaymentForm from "@/components/AddPaymentForm.vue";
import DoughnutChart from "@/components/DoughnutChart.vue";

export default {
  name: "DashboardView",
  components: { PaymentsDisplay, AddPaymentForm, DoughnutChart },
  data() {
    return {
      dialog: false,
      chartDataInfo: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "ffa500",
            ],
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    editModeOn(item) {
      this.dialog = true;
      let itemData = item;
      this.$store.commit("addDataToEditPaymentsList", itemData);
    },
  },
  computed: {
    paymentsList() {
      return this.$store.getters.getPaymentList;
    },
    categoryListDoughnut() {
      const actualPaymentList = this.$store.getters.getPaymentList;
      const actualCategoryList = [];
      for (let i = 0; i < actualPaymentList.length; i++) {
        if (!actualCategoryList.includes(actualPaymentList[i].category)) {
          actualCategoryList.push(actualPaymentList[i].category);
        }
      }
      return actualCategoryList;
    },
    getCategorySumDoughnut() {
      const actualPaymentList = this.$store.getters.getPaymentList;
      const arrOfCategorySum = [];
      const categoryList = this.chartDataInfo.labels;
      for (let category of categoryList) {
        const filteredList = actualPaymentList.filter(
          (item) => item.category == category
        );
        let sum = filteredList.reduce((res, cur) => res + cur.value, 0);
        arrOfCategorySum.push(sum);
      }
      return arrOfCategorySum;
    },
  },
  watch: {
    categoryListDoughnut() {
      this.chartDataInfo.labels.push(this.categoryListDoughnut);
      if (this.categoryListDoughnut.length === 0) {
        this.chartDataInfo.labels = [];
        this.chartDataInfo.datasets.backgroundColor = [];
        this.chartDataInfo.datasets.data = [];
      } else {
        this.chartDataInfo.labels = this.categoryListDoughnut;
      }
    },
    getCategorySumDoughnut() {
      this.chartDataInfo.datasets[0].data = this.getCategorySumDoughnut;
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchData");
  },
};
</script>