<template>
  <div>
    <v-data-table :headers="headers" :items="items" :items-per-page="15">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editModeOn(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>



<script>
export default {
  name: "PaymentsDisplay",
  data() {
    return {};
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "#",
          value: "id",
          width: "20%",
          align: "left",
        },
        {
          text: "Date",
          value: "date",
          width: "20%",
          align: "left",
        },
        {
          text: "Category",
          value: "category",
          width: "20%",
          align: "left",
        },
        {
          text: "Value",
          value: "value",
          width: "25%",
          align: "left",
        },
        { text: "Actions", value: "actions", sortable: false, width: "15%" },
      ];
    },
  },
  methods: {
    editModeOn(item) {
      this.$emit("editModeOn", item);
    },
    deleteItem(item) {
      this.$store.commit("removeItemFromPaymentsList", item);
    },
  },
};
</script>

<style scoped>
.theme--light.v-data-table {
  color: rgb(10, 13, 37);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
}
</style>