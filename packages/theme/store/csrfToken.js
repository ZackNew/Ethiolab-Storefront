export const state = () => ({
  csrfToken: '',
});

export const getters = {};

export const mutations = {
  ADD_TOKEN(state, payload) {
    state.csrfToken = payload.csrf;
  },
};

export const actions = {
  addToken({ commit }, payload) {
    commit('ADD_TOKEN', payload);
  },
};
