<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="15"
      class="elevation-1"
    >
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
          width: "90",
          align: "left",
        },
        {
          text: "Date",
          value: "date",
          width: "100",
          align: "left",
        },
        {
          text: "Category",
          value: "category",
          width: "100",
          align: "left",
        },
        {
          text: "Value",
          value: "value",
          width: "150",
          align: "left",
        },
        { text: "Actions", value: "actions", sortable: false },
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