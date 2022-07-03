<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5 text-sm-h3 pb-6 main-text">My personal cost</div>
        <v-dialog v-model="dialog" width="500">
          <template #activator="{ on }"
            ><v-btn v-on="on" color="#FF844B" class="mb-12" :ripple="false" dark
              >ADD NEW COST <v-icon>mdi-plus</v-icon></v-btn
            ></template
          >
          <v-card>
            <AddPaymentForm />
          </v-card>
        </v-dialog>
        <PaymentsDisplay :items="paymentsList" @editModeOn="editModeOn" />
      </v-col>
      <v-col class="d-flex flex-column justify-space-around mb-6">
        <template>
          <DoughnutChart :chartDataDonutInfo="chartDataDonutInfo" />
        </template>
        <template>
          <BarChart :chartDataBarInfo="chartDataBarInfo" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PaymentsDisplay from "@/components/PaymentsDisplay.vue";
import AddPaymentForm from "@/components/AddPaymentForm.vue";
import DoughnutChart from "@/components/DoughnutChart.vue";
import BarChart from "@/components/BarChart.vue";

export default {
  name: "DashboardView",
  components: { PaymentsDisplay, AddPaymentForm, DoughnutChart, BarChart },
  data() {
    return {
      dialog: false,
      chartDataDonutInfo: {
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
            hoverOffset: 4,
          },
        ],
      },
      chartDataBarInfo: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "",
            backgroundColor: [
              "#1480A3",
              "#7FB9D2",
              "#B7CBD2",
              "#EAF0EE",
              "#FAB509",
              "#4E9BAD",
              "#FD8402",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      activeLabelCategoryBar: "Food",
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
      const categoryList = this.chartDataDonutInfo.labels;
      for (let category of categoryList) {
        const filteredList = actualPaymentList.filter(
          (item) => item.category == category
        );
        let sum = filteredList.reduce((res, cur) => res + cur.value, 0);
        arrOfCategorySum.push(sum);
      }
      return arrOfCategorySum;
    },
    categoryListBar() {
      const actualPaymentList = this.$store.getters.getPaymentList;
      const actualCategoryList = [];
      for (let i = 0; i < actualPaymentList.length; i++) {
        if (!actualCategoryList.includes(actualPaymentList[i].category)) {
          actualCategoryList.push(actualPaymentList[i].category);
        }
      }
      return actualCategoryList;
    },
    getCategorySumBarFromMonth() {
      const objToBar = {};
      const actualPaymentList = this.$store.getters.getPaymentList;
      for (const category of this.categoryListBar) {
        objToBar[category] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const filteredCategory = actualPaymentList.filter(
          (item) => item.category === category
        );
        for (const item of filteredCategory) {
          let month = item.date.split(".");
          switch (month[1]) {
            case "01":
              objToBar[category][0] += item.value;
              break;
            case "02":
              objToBar[category][1] += item.value;
              break;
            case "03":
              objToBar[category][2] += item.value;
              break;
            case "04":
              objToBar[category][3] += item.value;
              break;
            case "05":
              objToBar[category][4] += item.value;
              break;
            case "06":
              objToBar[category][5] += item.value;
              break;
            case "07":
              objToBar[category][6] += item.value;
              break;
            case "08":
              objToBar[category][7] += item.value;
              break;
            case "09":
              objToBar[category][8] += item.value;
              break;
            case "10":
              objToBar[category][9] += item.value;
              break;
            case "11":
              objToBar[category][10] += item.value;
              break;
            case "12":
              objToBar[category][11] += item.value;
              break;
          }
        }
      }
      return objToBar;
    },
  },
  watch: {
    categoryListDoughnut() {
      this.chartDataDonutInfo.labels.push(this.categoryListDoughnut);
      if (this.categoryListDoughnut.length === 0) {
        this.chartDataDonutInfo.labels = [];
        this.chartDataDonutInfo.datasets.backgroundColor = [];
        this.chartDataDonutInfo.datasets.data = [];
      } else {
        this.chartDataDonutInfo.labels = this.categoryListDoughnut;
      }
    },
    getCategorySumDoughnut() {
      this.chartDataDonutInfo.datasets[0].data = this.getCategorySumDoughnut;
    },
    categoryListBar() {
      this.chartDataBarInfo.datasets[0].label = this.activeLabelCategoryBar;
    },
    getCategorySumBarFromMonth() {
      this.chartDataBarInfo.datasets[0].data =
        this.getCategorySumBarFromMonth[this.activeLabelCategoryBar];
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchData");
  },
};
</script>

<style scoped>
.main-text {
  color: rgb(10, 13, 37);
}
</style>