<template>
  <li :id="`marker-${index}`">
    <span class="hover-cursor" :class="isViewed ? 'viewed-marker' : ''" @click="setActiveStory" v-if="item">
      <span class="icon"></span>
      <LocalizationString :string="item.title"></LocalizationString>
    </span>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  computed: {
    ...mapState("occupation", {
      viewedStories: (state) => state.viewedStories,
    }),
    isViewed() {
      if (!this.viewedStories) {
        return null;
      }
      if (this.viewedStories.includes(this.index)) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    setActiveStory() {
      this.$store.commit("occupation/setActiveStory", this.index);
    },
  },
};
</script>
