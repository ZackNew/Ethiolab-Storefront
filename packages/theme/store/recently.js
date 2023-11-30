export const state = () => ({
    recently: [],
  });
  export const mutations = {
    SET_RECENTLY_VIEWD(state, product) {   
      state.recently = product;  
    },
  };
  export const getters = {
  };
  export const actions = {
    setRecentlyViewd({ commit }, product) {
      commit('SET_RECENTLY_VIEWD', product);
    },
  };
  