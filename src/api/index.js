import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

/**
 * err.response:
 * - data
 * - status
 */
export default {
  token: {
    async validate(token) {
      try {
        return await api.post("/token/validate", { token });
      } catch (err) {
        return err.response;
      }
    },
  },
  users: {
    async fetchData(token) {
      try {
        return await api.get("/users/fetch-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        return err.response;
      }
    },
    async validate(field, value) {
      try {
        const response = await api.post("/users/validate", {
          field,
          value,
        });

        return response.data.status;
      } catch (err) {
        return false;
      }
    },
    async authenticate(phone, password) {
      try {
        return await api.post("/users/authenticate", {
          phone,
          password,
        });
      } catch (err) {
        return err.response;
      }
    },
  },
};
