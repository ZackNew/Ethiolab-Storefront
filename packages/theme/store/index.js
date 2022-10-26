export const state = () => ({
  sortCategory: 'NNN',
});

export const getters = {};

export const mutations = {
  SET_SORT(state, payload) {
    state.sortCategory = payload.sortBy;
  },
};

export const actions = {};
