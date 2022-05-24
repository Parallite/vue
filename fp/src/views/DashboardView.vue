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
      <v-col>DIAGRAMM</v-col>
    </v-row>
  </v-container>
</template>
<script>
import PaymentsDisplay from "@/components/PaymentsDisplay.vue";
import AddPaymentForm from "@/components/AddPaymentForm.vue";

export default {
  name: "DashboardView",
  components: { PaymentsDisplay, AddPaymentForm },
  data() {
    return {
      dialog: false,
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
  },
  async mounted() {
    await this.$store.dispatch("fetchData");
  },
};
</script>