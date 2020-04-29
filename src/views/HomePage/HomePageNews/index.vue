<template>
  <section
    class="news"
    v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions }"
  >
    <news-header class="header"></news-header>
    <transition-group
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      name="staggered-fade"
      class="item-wrapper"
    >
      <news-item
        v-for="(post, index) in filteredPosts"
        :key="post.title"
        :post="post"
        class="item"
        :data-index="index"
      ></news-item>
    </transition-group>
  </section>
</template>

<script>
import NewsHeader from "./NewsHeader";
import NewsItem from "./NewsItem";

export default {
  name: "HomePageNews",
  components: {
    NewsHeader,
    NewsItem,
  },
  data() {
    return {
      intersectionOptions: {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0.95,
      },
      offset: 0,
    };
  },
  computed: {
    posts() {
      return this.$store.state.news.posts;
    },
    filteredPosts() {
      return this.posts.filter((item) => {
        return item.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
      });
    },
    query() {
      return this.$store.state.news.search;
    },
  },
  methods: {
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
      console.log(going, direction);
      const before = this.posts.length;
      await this.$store.dispatch("fetchPosts", this.offset);
      const after = this.posts.length;
      if (before != after)
        this.offset += 3;
    },
  },
};
</script>
<style lang="scss" scoped>
.news {
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
