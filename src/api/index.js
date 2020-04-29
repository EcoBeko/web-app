import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default {
  token: {
    async validate(token) {
      return api.post("/token/validate", { token });
    },
  },
  users: {
    async fetchData(token) {
      return api.post("/users/fetch-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
  },
};
