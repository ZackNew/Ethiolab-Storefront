export const state = () => ({
  productsToCompare: [],
});

export const getters = {};

export const mutations = {
  ADD_TO_COMPARE_LIST(state, payload) {
    state.productsToCompare.push(payload.product);
  },
  REMOVE_FROM_COMPARE_LIST(state, payload) {
    state.productsToCompare = state.productsToCompare.filter(function (obj) {
      return obj.variantID !== payload.Vid;
    });

    console.log('lsit', state.productsToCompare);
    console.log('id', payload.Vid);
  },
};

export const actions = {
  addToCompareList({ commit }, payload) {
    commit('ADD_TO_COMPARE_LIST', payload);
  },
  removeCompareList({ commit }, payload) {
    commit('REMOVE_FROM_COMPARE_LIST', payload);
  },
};
