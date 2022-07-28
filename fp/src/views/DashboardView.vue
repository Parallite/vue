<template>
  <v-container class="mt-10">
    <v-row>
      <v-col xl="6" lg="7" md="12" sm="12" xs="12">
        <h1
          class="
            text-h4 text-md-h3
            pb-6
            d-flex
            justify-center
            d-md-flex
            justify-md-start
          "
        >
          My personal cost
        </h1>
        <div class="d-flex flex-column justify-sm-space-between flex-sm-row">
          <v-dialog v-model="dialog" width="500">
            <template #activator="{ on }">
              <v-btn
                v-on="on"
                color="#FF844B"
                class="mb-12 dashboard_btn"
                :ripple="false"
                dark
                >ADD NEW COST <v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
            <v-card>
              <AddPaymentForm />
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogCategory" width="500">
            <template #activator="{ on }">
              <v-btn
                v-on="on"
                color="#FF844B"
                class="mb-12 dashboard_btn"
                :ripple="false"
                dark
                >ADD NEW CATEGORY <v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
            <v-card>
              <AddCategoryForm />
            </v-card>
          </v-dialog>
        </div>
        <PaymentsDisplay :items="paymentsList" @editModeOn="editModeOn" />
      </v-col>
      <v-col
        xl="6"
        lg="5"
        md="12"
        sm="12"
        xs="12"
        class="d-flex flex-column justify-space-around mb-12"
      >
        <template>
          <DoughnutChart
            class="douhnut"
            :chartDataDonutInfo="chartDataDonutInfo"
          />
        </template>
        <template>
          <BarChart
            :chartDataBarInfo="chartDataBarInfo"
            :categoryListBar="categoryListBar"
            @changeLabelBar="changeLabelBar"
            @getYear="getYear"
          />
          <CalendarToBar @getYear="getYear" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PaymentsDisplay from "@/components/PaymentsDisplay.vue";
import AddPaymentForm from "@/components/AddPaymentForm.vue";
import AddCategoryForm from "@/components/AddCategoryForm.vue";
import DoughnutChart from "@/components/DoughnutChart.vue";
import BarChart from "@/components/BarChart.vue";
import CalendarToBar from "@/components/CalendarToBar.vue";

export default {
  name: "DashboardView",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    AddCategoryForm,
    DoughnutChart,
    BarChart,
    CalendarToBar,
  },
  data() {
    return {
      dialog: false,
      dialogCategory: false,
      chartDataDonutInfo: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#de6600",
              "#fea02f",
              "#ebd9c8",
              "#007a7a",
              "003f5a",
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
              "#de6600",
              "#fea02f",
              "#ebd9c8",
              "#007a7a",
              "003f5a",
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
      curYear: 2022,
    };
  },
  methods: {
    mouseOver() {
      this.active = !this.active;
    },
    getYear(year) {
      this.curYear = year;
    },
    editModeOn(item) {
      this.dialog = true;
      let itemData = item;
      this.$store.commit("addDataToEditPaymentsList", itemData);
    },
    changeLabelBar(category) {
      this.activeLabelCategoryBar = category;
      this.chartDataBarInfo.datasets[0].label = this.activeLabelCategoryBar;
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
      console.log(this.activeLabelCategoryBar);
      const objToBar = {};
      const actualPaymentList = this.$store.getters.getPaymentList;
      for (const category of this.categoryListBar) {
        objToBar[category] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const regExp = new RegExp(`[0-9][0-9].[0-9][0-9].${this.curYear}`);
        const filteredPaymentYear = actualPaymentList.filter(
          (item) => regExp.test(item.date) === true
        );
        const filteredCategory = filteredPaymentYear.filter(
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
.douhnut {
  margin-bottom: 100px;
}
.dashboard_btn {
  transition: all 0.5s ease;
}
.dashboard_btn:hover {
  color: #703c24;
  transform: translateY(-5px);
  -webkit-box-shadow: 0px 15px 5px -5px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 15px 5px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 15px 5px -5px rgba(0, 0, 0, 0.2);
}
</style>