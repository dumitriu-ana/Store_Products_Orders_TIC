
import { createStore } from "vuex";

export default createStore({
  state: {
    user: null, // Initialize user state
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    currentUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    // Optional: actions for login/logout
    login({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("setUser", null);
    },
  },
  modules: {
    // If you have other modules
  },
});