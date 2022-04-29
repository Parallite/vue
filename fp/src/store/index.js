import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const localDB = {
  page1: [
    { id: 1, date: "20.03.2020", category: "Food", value: 169 },
    { id: 2, date: "21.03.2020", category: "Navigation", value: 50 },
    { id: 3, date: "22.03.2020", category: "Sport", value: 450 },
  ],
  page2: [
    { id: 4, date: "23.03.2020", category: "Entertaiment", value: 969 },
    { id: 5, date: "24.03.2020", category: "Education", value: 1500 },
    { id: 6, date: "25.03.2020", category: "Food", value: 200 },
  ],
  page3: [
    { id: 7, date: "23.03.2020", category: "Entertaiment", value: 969 },
    { id: 8, date: "24.03.2020", category: "Education", value: 1500 },
    { id: 9, date: "25.03.2020", category: "Food", value: 200 },
  ],
  page4: [
    { id: 10, date: "23.03.2020", category: "Entertaiment", value: 969 },
    { id: 11, date: "24.03.2020", category: "Education", value: 1500 },
    { id: 12, date: "25.03.2020", category: "Food", value: 200 },
  ],
};

const mutations = {
  setPaymentsListData(state, payload) {
    const newUniqIdsObs = payload.filter((item) => {
      return state.paymentsListIds.indexOf(item.id) < 0;
    });
    const uniqIds = newUniqIdsObs.map((obj) => obj.id);
    state.paymentsListIds.push(...uniqIds);
    state.paymentsList.push(...newUniqIdsObs);
  },
  addDataToPaymentsList(state, payload) {
    state.paymentsList.push(payload);
  },
  setCategories(state, payload) {
    state.categoryList = payload;
  },
  setNewCategory(state, payload) {
    const newCategoryArr = payload;
    // state.newCategoryList = payload;
    state.categoryList.push(...newCategoryArr);
  },
};

const getters = {
  getPaymentList: (state) => state.paymentsList,
  getFullPaymentValue: (state) => {
    return state.paymentsList.reduce((res, cur) => res + cur.value, 0);
  },
  getCategoryList: (state) => state.categoryList,
  // getNewCategoryList: (state) => state.newCategoryList,
};

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: [],
    paymentsListIds: [],
    // newCategoryList: [],
  },
  mutations,
  actions: {
    fetchData({ commit }, page) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = localDB[`page${page}`];
          resolve(items);
        }, 500);
      }).then((res) => commit("setPaymentsListData", res));
    },
    // fetchData({ commit }) {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       const items = [];
    //       for (let i = 1; i < 50; i++) {
    //         items.push({
    //           date: "23.12.2022",
    //           category: "Sport",
    //           value: i,
    //           id: Math.floor(
    //             Math.random() * Math.floor(Math.random() * Date.now() + i)
    //           ),
    //         });
    //       }
    //       resolve(items);
    //     }, 3000);
    //   }).then((res) => {
    //     commit("setPaymentsListData", res);
    //   });
    // },
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
