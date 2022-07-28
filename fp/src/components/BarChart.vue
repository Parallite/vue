<template>
  <div class="bar-wrp">
    <div>
      <h2 class="text-h5 mt-10 mb-10 d-flex justify-center text">
        Monthly spending by category
      </h2>
      <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
      <v-card>
        <v-tabs
          center-active
          background-color="#E3EDF2"
          slider-color="#FF844B"
          color="rgba(78, 125, 150)"
          slider-size="5"
          centered
          class="mt-10 tabstabs"
        >
          <v-tab
            v-for="category in this.categoryListBar"
            :key="category"
            @click="changeActiveLabel(category)"
            :ripple="false"
            class="bar_btn-slider"
          >
            {{ category }}</v-tab
          >
        </v-tabs>
      </v-card>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartDataBarInfo: Object,
    default: () => {},
    categoryListBar: Array,
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 450,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: this.chartDataBarInfo,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  methods: {
    changeActiveLabel(category) {
      this.$emit("changeLabelBar", category);
    },
  },
};
</script>

<style scoped>
.bar-wrp {
  background: rgba(255, 255, 255, 0);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.6px);
  -webkit-backdrop-filter: blur(8.6px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 15px 10px 15px;
}

.bar_btn-slider {
  margin: 0 3px;
  letter-spacing: 0;
  transition: letter-spacing 1s ease;
}

.bar_btn-slider:hover {
  letter-spacing: 3px;
}
</style>