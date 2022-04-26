import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const mutations = {
  setPaymentsListData(state, payload) {
    state.paymentsList = payload;
  },
  addDataToPaymentsList(state, payload) {
    state.paymentsList.push(payload);
  },
  setCategories(state, payload) {
    state.categoryList = payload;
  },
  // editPaymentsListFirstElement(state, payload) {
  //   Vue.set(state.paymentsList, 0, payload);
  // },
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
        }, 3000);
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
