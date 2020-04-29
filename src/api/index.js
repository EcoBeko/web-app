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
    async register({ name, surname, password, gender, phone, birthday }) {
      try {
        return await api.post("/users/register-user", {
          name,
          surname,
          password,
          gender,
          phone,
          birthday,
        });
      } catch (err) {
        return err.response;
      }
    },
    stats: {
      async add(token, trees, energy, waste) {
        try {
          return await api.put(
            "/users/stats/add",
            {
              trees,
              energy,
              waste,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (err) {
          return err.response;
        }
      },
    },
    friends: {
      async recommendations(token) {
        try {
          return await api.get("users/friends/recommendations", {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (err) {
          return err.response;
        }
      },
    },
  },
  posts: {
    async fetchPortion(token, offset) {
      try {
        return await api.get("/posts/fetch-portion/" + offset, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        return err.response;
      }
    },
    async updateLikes(post, like) {
      try {
        return await api.post("/posts/like", {
          id: post,
          like,
        });
      } catch (err) {
        return err.response;
      }
    },
    async write(title, text, image, token) {
      try {
        const form = new FormData();
        form.append("test", image);

        const fileName = (
          await api.post("/test/upload", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        ).data.fileName;

        return await api.post(
          "/posts/write",
          {
            title,
            article: text,
            image: fileName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        return err.response;
      }
    },
  },
  wastes: {
    async fetch() {
      try {
        return await api.get("points/wastes/fetch");
      } catch (err) {
        return err.response;
      }
    },
  },
};
