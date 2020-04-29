import Vue from "vue";
import Vuex from "vuex";
import api from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
      localStorage.setItem("token", state.token);
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    getToken({ token }) {
      if (!token) token = localStorage.getItem("token");
      return token;
    },
    getModuleRoute({ user }) {
      if (user) {
        const name = user.modules.name;
        if (name === "user") return "/";
        if (name === "admin") return "/admin-panel";
      }

      return "";
    },
  },
  actions: {
    async checkLocalToken({ getters }) {
      const localToken = getters.getToken;
      if (!localToken) return false;

      const response = await api.token.validate(localToken);
      return response.data.status;
    },
    async fetchUser({ commit, getters }) {
      const localToken = getters.getToken;
      const response = await api.users.fetchData(localToken);

      if (response.data.status) {
        commit("setUser", response.data.user);
      }
      return response.data;
    },
    async authenticate({ commit }, payload) {
      const response = await api.users.authenticate(payload.phone, payload.password);

      if (response.data.status) {
        commit("setToken", response.data.token);
      }

      return response.data;
    },
    async registerUser({ commit }, payload) {
      const response = await api.users.register(payload);

      return response.data;
    }
  },
});
