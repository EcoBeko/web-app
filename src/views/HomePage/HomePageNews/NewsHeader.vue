<template>
  <header class="header" v-if="!reading">
    <alert-box ref="box" class="alert"></alert-box>
    <div class="title">
      <icon-text image="pen.svg" size="22px" class="item"></icon-text>
      <input @focus="open = true" type="text" placeholder="Write" v-model="post.title" />
    </div>
    <div class="title" v-if="open">
      <textarea wrap="hard" placeholder="Description" class="text" v-model="post.text"></textarea>
    </div>
    <div class="files" v-if="open">
      <input type="file" ref="file" @change="post.image = $refs.file.files[0]" />
      <button class="button" @click="send">Send</button>
    </div>
  </header>
</template>

<script>
import api from "@/api";
export default {
  name: "NewsHeader",
  components: {},
  computed: {
    reading() {
      return this.$store.state.news.reading;
    },
  },
  data() {
    return {
      editing: false,
      post: {
        title: "",
        text: "",
        image: File,
      },
      open: false,
    };
  },
  methods: {
    async send() {
      this.open = false;
      const response = await api.posts.write(
        this.post.title,
        this.post.text,
        this.post.image,
        this.$store.getters.getToken
      );

      this.$refs.box.alert(response.data.message, !response.data.status);
      if (response.data.status) {
        this.$store.dispatch("fetchPosts", 0);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../scss/_globals.scss";
@import "../../../scss/_base.scss";

.header {
  background-color: white;
  height: 100%;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.title {
  display: flex;
  margin: 0.5em;
  align-items: center;
}

.text {
  margin-top: 1.5em;
  width: 100%;
  min-height: 200px;
}

.files {
  display: flex;
  justify-content: space-between;
  margin: 0.5em;
  margin-top: 1em;
  align-items: center;
}

.button {
  background-color: $accentBlue;
}
</style>
