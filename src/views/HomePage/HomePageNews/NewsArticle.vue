<template>
  <article class="news-item">
    <div class="back-button" @click="close">
      <div>Back</div>
    </div>
    <img :src="loadImage(article.owner.avatar)" alt="author-image" class="author-image" />
    <div class="content">
      <header class="heading">
        <div class="author-wrapper">
          <span class="author">{{ fullName }}</span>
        </div>
        <div class="status-wrapper">
          <span class="time">{{ fixedTime }}</span>
        </div>
      </header>
      <div class="content-wrapper">
        <h3 class="post-title">
          {{ article.title }}
        </h3>
        <div class="post-image">
          <img :src="loadImage(article.image)" alt="post-image" />
        </div>
        <div class="post-text">
          {{ article.article }}
        </div>
      </div>
      <div class="post-items-wrapper">
        <icon-text image="like.svg" size="16px" @click="like">
          {{ article.likes }}
        </icon-text>
      </div>
    </div>
  </article>
</template>

<script>
import api from "@/api";

export default {
  name: "NewsArticle",
  props: {
    article: Object,
  },
  data() {
    return {
      liked: false,
    };
  },
  methods: {
    loadImage(image) {
      return `http://localhost:3000/${image}`;
    },
    like() {
      if (!this.liked) this.article.likes++;
      else this.article.likes--;

      this.liked = !this.liked;
    },
    close() {
      this.$store.state.news.reading = false;
    },
  },
  computed: {
    fixedTime() {
      const date = new Date(Date.parse(this.article.time));
      return date.toLocaleString();
    },
    fullName() {
      return this.article.owner.surname + " " + this.article.owner.name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../scss/_globals.scss";
@import "../../../scss/_base.scss";

.back-button {
  position: fixed;
  left: 0px;
  top: 140px;
  background-color: rgba($color: #000000, $alpha: 0.02);
  width: 100px;
  text-align: center;
  height: 100%;
  transition: 0.3s;

  div {
    font-size: 1.5rem;
    margin-top: 4em;
  }

  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.05);
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  @include pos(1, 2 3, 3);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: 0;
  animation: fade-in 1s 0s ease-in-out forwards;
}

.news-item {
  @extend .row;
  align-items: flex-start;
  position: relative;
  padding: 1em;

  .author-image {
    width: 60px;
    margin-right: 1em;
    padding: 0.5em;
  }

  .content {
    background-color: white;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 0.1fr 0.5fr 0.1fr;
    gap: 20px;

    .heading {
      @include pos(1, 1, 3, 1);
      @extend .row;
      justify-content: space-between;
      border-bottom: 2px solid lightgray;
      padding: 1em;

      .author-wrapper,
      .status-wrapper {
        @extend .row;

        .author {
          margin-right: 1em;
          font-size: 1.1rem;
          color: $accentBlue;
        }

        .time {
          color: $grayText;
          margin-left: 1em;
        }
      }
    }

    .post-image {
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: fit;
      }
      border-radius: 5px;
    }

    .post-title {
      font-size: 2rem;
      margin: 0.5em;
      margin-bottom: 1em;
    }

    .post-text {
      font-size: 1.5rem;
      margin: 2em 1em 1em 1em;

      .more {
        margin: 1em 0em;
        display: block;
        color: $accentBlue;
        background-color: transparent;
        opacity: 0.8;
        transition: opacity 0.3s;
        cursor: pointer;
        font-size: 1.1rem;

        &:hover {
          opacity: 1;
        }
      }
    }

    .post-items-wrapper {
      @include pos(1, 4, 3, 4);
      @extend .row;
      justify-content: flex-end;
      color: $grayText;

      *:hover {
        cursor: pointer;
        color: black;
        transition: color 0.3s;
      }
    }
  }
}
@media screen and (max-width: 450px) {
  .news-item {
    .author-image {
      display: none;
    }

    .content {
      grid-template-columns: 1fr;
      grid-template-rows: 0.1fr 1fr 0.2fr 0.4fr 0.1fr;

      .heading {
        @include pos(1, 1, 3, 1);
        flex-direction: column;
        align-items: flex-start;

        .author-wrapper,
        .status-wrapper {
          .author {
            margin-right: 1em;
            font-size: 1rem;
          }

          .time {
            color: $grayText;
            margin-left: 1em;
            font-size: 0.8rem;
            margin-top: 0.1em;
          }
        }

        .status-wrapper {
          margin-top: 0.5em;
        }
      }

      .post-image {
        @include pos(1, 2);
      }

      .post-title {
        @include pos(1, 3);
      }

      .post-text {
        @include pos(1, 4);
      }

      .post-items-wrapper {
        @include pos(1, 5);
      }
    }
  }
}
</style>
