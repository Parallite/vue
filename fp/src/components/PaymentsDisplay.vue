<template>
  <div>
    <v-data-table :headers="headers" :items="items" :items-per-page="15">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2 display_btn" @click="editModeOn(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)" class="display_btn">
          mdi-delete
        </v-icon>
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
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  border: 3px solid transparent;
  border-image: linear-gradient(
      45deg,
      #feac5e 10%,
      #c779d0 30%,
      transparent 50%,
      #4bc0c8 90%,
      #feac5e 100%
    )
    1;
}
.display_btn:hover {
  color: #feac5e;
}
</style>