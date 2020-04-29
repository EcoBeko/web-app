<template>
  <div class="stats-template">
    <nav class="nav">
      <router-link class="nav-item" to="/add">Add</router-link>
      <router-link class="nav-item" to="/how">How is the calculation?</router-link>
      <img
        @click="$emit('close-window')"
        :src="getImage('close.svg')"
        alt="close"
        class="close-img"
      />
    </nav>
    <router-view @close-window="$emit('close-window')" :wastes="wastes" class="block"></router-view>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "AddStats",
  data() {
    return {
      wastes: [],
    };
  },
  methods: {
    async fetchWastes() {
      const response = await api.wastes.fetch();

      if (response.data.status) {
        this.wastes = response.data.wastes.filter((waste) => {
          waste.weight = 0;
          return waste;
        });
      }
    },
    loadImage(image) {
      return `http://localhost:3000/${image}`;
    },
    getImage(image) {
      const images = require.context("@/assets/", false, /[\.png\.svg]$/);
      return images("./" + image);
    },
  },
  created() {
    this.fetchWastes();
  },
};
</script>

<style lang="scss" scoped>
$grayText: #979797;
$accentBlue: #09a2ab;
$accentWhite: #fff;
$accentGreen: #27b58e;
$blackBackground: #303030;

.stats-template {
  position: fixed;
  z-index: 2;
  width: 75%;
  height: 75%;
  background-color: $accentWhite;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.nav {
  margin: 1.5em;
  width: calc(100% - 3em);
  display: flex;
  justify-content: space-between;
}
.nav-item {
  font-family: Gilroy Medium;
  font-size: 2rem;
  color: black;
  text-decoration: none;
}
.router-link-active {
  color: $accentBlue;
  position: relative;

  &:before {
    content: "";
    width: 100%;
    position: absolute;
    height: 4px;
    background-color: $accentBlue;
    bottom: -20%;
  }
}
</style>
