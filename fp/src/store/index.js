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
    let idxEl = state.paymentsList.indexOf(payload);
    state.paymentsList.splice(idxEl, 1);
  },
  addDataToEditPaymentsList(state, payload) {
    state.editDataList.push(payload);
  },
  editPaymentsListItem(state, payload) {
    if (state.editDataList.length > 1) {
      state.editDataList = state.editDataList.reverse();
    }
    let outdatedData = state.editDataList[0];
    let idxOutdatedData = state.paymentsList.indexOf(outdatedData);
    let actualData = payload;
    if (actualData.category !== "") {
      state.paymentsList[idxOutdatedData].category = actualData.category;
    }
    if (actualData.value !== "") {
      state.paymentsList[idxOutdatedData].value = actualData.value;
    }
    if (actualData.date !== "") {
      state.paymentsList[idxOutdatedData].date = actualData.date;
    }
    state.editDataList = [];
  },
};

const getters = {
  getPaymentList: (state) => state.paymentsList,
  getFullPaymentValue: (state) => {
    return state.paymentsList.reduce((res, cur) => res + cur.value, 0);
  },
  getCategoryList: (state) => state.categoryList,
  getEditDataList: (state) => state.editDataList,
};

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: [],
    paymentsListFromNotFoundView: [],
    editDataList: [],
  },
  mutations,
  actions: {
    fetchData({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = [];
          for (let i = 1; i < 10; i++) {
            items.push({
              date: "01.01.2022",
              category: "Food",
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
