export const state = () => ({
  sortCategory: '',
});

export const getters = {};

export const mutations = {
  SET_SORT(state, payload) {
    state.sortCategory = payload.sortBy;
    console.log('i commited again', state.sortCategory);
  },
};

export const actions = {};
