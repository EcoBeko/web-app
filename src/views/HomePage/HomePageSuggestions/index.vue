<template>
  <section class="suggestions">
    <h2 class="title">People you may know</h2>
    <sug-item
      v-for="friend in friends"
      :fullname="fullName(friend)"
      :image="loadImage(friend.avatar)"
      :key="friend.phone"
    ></sug-item>
  </section>
</template>

<script>
import SugItem from "./SugItem";
import api from "@/api";

export default {
  name: "HomePageSuggestions",
  components: {
    SugItem,
  },
  methods: {
    loadImage(image) {
      return `http://localhost:3000/${image}`;
    },
    fullName(friend) {
      return `${friend.surname} ${friend.name}`;
    },
    async fetchFriends() {
      const response = await api.users.friends.recommendations(this.$store.getters.getToken);

      if (response.data.status) this.friends = response.data.users;
    },
  },
  data() {
    return {
      friends: [],
    };
  },
  created() {
    this.fetchFriends();
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/_globals.scss";

.suggestions {
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin: 1em;
    font-size: 1.1rem;
    color: $grayText;
  }
}
</style>
