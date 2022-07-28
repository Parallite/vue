<template>
  <v-toolbar dense flat color="transparent" class="mt-8">
    <v-btn outlined :ripple="false" plain class="mr-4 btn_today" @click="today"
      >Today</v-btn
    >
    <v-btn
      :ripple="false"
      plain
      text
      medium
      class="btn_previous"
      @click="prevYear"
    >
      <v-icon small> mdi-chevron-left </v-icon>
    </v-btn>
    <v-toolbar-title>
      {{ year }}
    </v-toolbar-title>
    <v-btn :ripple="false" plain text medium class="btn_next" @click="nextYear">
      <v-icon small> mdi-chevron-right </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "CalendarToBar",
  data: () => ({
    year: 2022,
  }),
  mounted() {},
  methods: {
    today() {
      this.year = new Date().getFullYear();
      this.$emit("getYear", this.year);
    },
    prevYear() {
      this.year -= 1;
      this.$emit("getYear", this.year);
    },
    nextYear() {
      this.year += 1;
      this.$emit("getYear", this.year);
    },
  },
};
</script>

<style scoped>
.btn_today {
  width: 80px;
  transition: all 1s ease;
}

.btn_today:hover {
  letter-spacing: 4px;
  color: #ff844b;
}
.btn_previous {
  color: #0a0d25;
  transition: all 1s ease;
}
.btn_previous:hover {
  transform: scale(1.8) translateX(-5px);
  color: #ff844b;
}

.btn_next {
  color: #0a0d25;
  transition: all 1s ease;
}

.btn_next:hover {
  transform: scale(1.8) translateX(5px);
  color: #ff844b;
}
</style>
