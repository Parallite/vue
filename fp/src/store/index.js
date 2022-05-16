import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const mutations = {
  setPaymentsListData(state, payload) {
    if (state.paymentsList.length == 0) {
      state.paymentsList = payload;
    } else {
      state.paymentsListFromNotFoundView = state.paymentsList;
      state.paymentsList = payload;
      state.paymentsList.push(...state.paymentsListFromNotFoundView);
    }
  },
  addDataToPaymentsList(state, payload) {
    state.paymentsList.push(payload);
  },
  setCategories(state, payload) {
    state.categoryList = payload;
  },
  setPaymentsListDataFromNotFoundView(state, payload) {
    state.paymentsListFromNotFoundView.push(payload);
  },
  removeItemFromPaymentsList(state, payload) {
    state.paymentsList.splice(payload, 1);
  },
  editPaymentsListItem(state, payload) {
    let idx = payload[0];
    let obj = payload[1];
    if (payload[1].category !== "") {
      state.paymentsList[idx].category = obj.category;
    }
    if (payload[1].value !== "") {
      state.paymentsList[idx].value = obj.value;
    }
    if (payload[1].date !== "") {
      state.paymentsList[idx].date = obj.date;
    }
  },
};

const getters = {
  getPaymentList: (state) => state.paymentsList,
  getFullPaymentValue: (state) => {
    return state.paymentsList.reduce((res, cur) => res + cur.value, 0);
  },
  getCategoryList: (state) => state.categoryList,
};

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: [],
    paymentsListFromNotFoundView: [],
  },
  mutations,
  actions: {
    fetchData({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = [];
          for (let i = 1; i < 50; i++) {
            items.push({
              date: "23.12.2022",
              category: "Sport",
              value: i,
              id: Math.floor(
                Math.random() * Math.floor(Math.random() * Date.now() + i)
              ),
            });
          }
          resolve(items);
        }, 1000);
      }).then((res) => {
        commit("setPaymentsListData", res);
      });
    },
    fetchCategoryList({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(["Food", "Transport", "Education", "Entertainment"]);
        }),
          1000;
      }).then((res) => {
        commit("setCategories", res);
      });
    },
  },
  getters,
});
