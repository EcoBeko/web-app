<template>
  <div class="sug-item">
    <img :src="image" :alt="fullname" />
    <span>{{ fullname }}</span>
  </div>
</template>

<script>
export default {
  name: "SugItem",
  props: {
    fullname: String,
    image: String
  },
  methods: {
    getImage(image) {
      const images = require.context("@/assets/", false, /\.png$/);
      return images("./" + image);
    }
  }
};
</script>

<style lang="scss" scoped>
.sug-item {
  margin: 0.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;


  img {
    width: 42px;
  }

  span {
    margin: 1em;
    font-size: 1.2rem;
  }

  cursor: pointer;
}
</style>
