<template>
  <section
    class="news"
    v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions }"
  >
    <news-article class="article" v-if="reading" :article="selectedArticle"></news-article>
    <news-header class="header"></news-header>
    <transition-group
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      name="staggered-fade"
      class="item-wrapper"
      v-if="!reading"
    >
      <news-item
        v-for="(post, index) in filteredPosts"
        :key="post.title"
        :post="post"
        class="item"
        :data-index="index"
        @select-article="selecteArticle"
      ></news-item>
    </transition-group>
  </section>
</template>

<script>
import NewsHeader from "./NewsHeader";
import NewsItem from "./NewsItem";
import NewsArticle from "./NewsArticle";

export default {
  name: "HomePageNews",
  components: {
    NewsHeader,
    NewsItem,
    NewsArticle,
  },
  data() {
    return {
      intersectionOptions: {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0.99,
      },
      offset: 0,
      started: false,
      selectedArticle: {},
    };
  },
  computed: {
    reading() {
      return this.$store.state.news.reading;
    },
    posts() {
      return this.$store.state.news.posts;
    },
    filteredPosts() {
      if (this.reading) return [];

      return this.posts.filter((item) => {
        return item.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
      });
    },
    query() {
      return this.$store.state.news.search;
    },
  },
  methods: {
    selecteArticle(id) {
      this.selectedArticle = this.posts.filter((post) => post.id == id)[0];
      this.$store.state.news.reading = true;
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = "scale(0)";
    },
    enter(el, done) {
      const delay = el.dataset.index * 150;
      setTimeout(() => {
        Velocity(el, { opacity: 1, transform: "scale(1)" }, { complete: done });
      }, delay);
    },
    leave(el, done) {
      const delay = el.dataset.index * 150;
      setTimeout(() => {
        Velocity(el, { opacity: 0, transform: "scale(0)" }, { complete: done });
      }, delay);
    },
    async onWaypoint({ going, direction }) {
      if (!this.started && !this.reading) {
        this.started = true;
        const before = this.posts.length;
        await this.$store.dispatch("fetchPosts", this.offset);
        const after = this.posts.length;
        if (before != after) this.offset += after - before;
        this.started = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.article {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.news {
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.085fr auto;
  gap: 30px;
}

.header,
.item-wrapper {
  grid-column: 1 / 4;
}

.item {
  margin-bottom: 30px;
  transition: all 0.3s;
}
</style>
