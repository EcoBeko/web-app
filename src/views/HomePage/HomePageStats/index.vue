<template>
  <section class="stats">
    <alert-box :time="2000" ref="box"></alert-box>
    <h2 class="title">Recycling Statistics</h2>
    <div class="overlay" v-if="isOpen" @click="isOpen = false"></div>
    <keep-alive>
      <add-stats v-if="isOpen" @close-window="isOpen = false"></add-stats>
    </keep-alive>
    <stat-item
      image="tree.svg"
      text="Saved Trees"
      :data="stats ? stats.trees : 0"
      class="stat-item"
    ></stat-item>
    <stat-item
      image="power.svg"
      text="Energy Saved (kWH)"
      :data="stats ? stats.energy : 0"
      class="stat-item"
    ></stat-item>
    <stat-item
      image="recy.svg"
      text="Recycled Waste (kg)"
      :data="stats ? stats.waste : 0"
      class="stat-item"
    ></stat-item>
    <button class="button" @click="isOpen = true">Add</button>
  </section>
</template>

<script>
import StatItem from "./StatItem";
import AddStats from "./AddStats";

export default {
  name: "HomePageStats",
  components: {
    StatItem,
    AddStats,
  },
  data() {
    return {
      isOpen: true,
    };
  },
  created() {},
  computed: {
    stats() {
      if (this.$store.state.user) return this.$store.state.user.stats;
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../scss/_globals.scss";
@import "../../../scss/_base.scss";

.overlay {
  position: fixed;
  background-color: rgba($color: #000000, $alpha: 0.3);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.stats {
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .title {
    margin: 1em;
    font-size: 1.1rem;
    color: $grayText;
  }

  .stat-item {
    width: 100%;
  }

  .button {
    background-color: $accentBlue;
    margin: 1em;
  }
}
</style>
