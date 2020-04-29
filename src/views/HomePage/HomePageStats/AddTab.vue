<template>
  <div class="block-add">
    <div class="categories">
      <div class="waste" v-for="waste in wastes" :key="waste.id">
        <div class="categories-img">
          <img :src="loadImage(waste.icon)" alt="" class="waste-icon" />
        </div>
        <div class="categories-text">
          <span class="waste-text">{{ waste.title }}</span>
        </div>
        <checkbox name="selected" :value="waste.id" v-model="selected"></checkbox>
      </div>
    </div>
    <div class="selected-categories">
      <alert-box ref="box"></alert-box>
      <div class="waste" v-for="waste in selectedWastes" :key="waste.id">
        <div class="categories-img">
          <img :src="loadImage(waste.icon)" alt="" class="waste-icon" />
        </div>
        <div class="categories-text">
          <span class="waste-text">{{ waste.title }}</span>
        </div>
        <base-input type="number" v-model="waste.weight"></base-input>
      </div>
      <button class="button" @click="add">Calculate</button>
    </div>
  </div>
</template>

<script>
import checkbox from "vue-material-checkbox";
import api from "@/api";

export default {
  name: "AddStats",
  props: {
    wastes: Array,
  },
  methods: {
    loadImage(image) {
      return `http://localhost:3000/${image}`;
    },
    async add() {
      const trees =
        this.wastes.reduce((sum, waste) => {
          if (waste.type == "trees" || waste.type == "both") {
            return sum + +waste.weight;
          }
          return sum + 0;
        }, 0) / 100;
      const energy =
        this.wastes.reduce((sum, waste) => {
          if (waste.type == "energy" || waste.type == "both") {
            return sum + +waste.weight;
          }
          return sum + 0;
        }, 0) * 0.9;
      const wastes = this.wastes.reduce((sum, waste) => sum + +waste.weight, 0);

      const response = await api.users.stats.add(
        this.$store.getters.getToken,
        trees,
        energy,
        wastes
      );

      this.$refs.box.alert(response.data.message, !response.data.status);
      setTimeout(() => {
        this.$emit("close-window");
        this.$store.commit("addStats", {
          trees,
          energy,
          wastes,
        });
      }, 1000);
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  components: {
    checkbox,
  },
  computed: {
    selectedWastes() {
      return this.wastes.filter((post) => this.selected.includes(post.id));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../scss/_globals.scss";
@import "../../../scss/_base.scss";

.button {
  background-color: $accentBlue;
  align-self: center;
  margin-top: 2em;
}

.block-add {
  display: flex;
  height: 85%;
}
.categories,
.selected-categories {
  width: 50%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.waste {
  font-family: Gilroy Regular;
  color: $grayText;
  border-bottom: 1px solid $grayText;
  padding: 1em;
  display: grid;
  grid-template-columns: 0.2fr 0.4fr 0.4fr;
  align-items: center;
}
</style>
