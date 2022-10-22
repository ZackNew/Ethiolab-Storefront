export const state = () => ({
  companyInformation: 2,
});

export const getters = {};

export const mutations = {
  SET_COMPANY_INFORMATION(state, payload) {
    state.companyInformation = payload.company;
  },
};

export const actions = {
  setInfo: ({ commit }, payload) => {
    commit('SET_COMPANY_INFORMATION', payload);
  },
};
