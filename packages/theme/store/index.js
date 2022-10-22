export const state = () => ({
  sortCategory: '',
});

export const getters = {};

export const mutations = {
  SET_SORT(state, payload) {
<<<<<<< Updated upstream
    state.sortCategory = payload.sortBy;
=======
    state.sortCategory = payload.company;
>>>>>>> Stashed changes
  },
};

export const actions = {};
