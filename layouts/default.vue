<template>
  <div class="default-layout" :class="`route-${page}`">
    <ExhibitNav />
    <LocalizationLanguagePicker></LocalizationLanguagePicker>
    <nuxt :key="$route.fullPath" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      page: this.$route.name,
    };
  },
  scrollToTop: true,
  mounted() {
    this.hideNavInIntroduction();
  },
  watch: {
    $route: function (value) {
      this.page = value.name;
      this.hideNavInIntroduction();
    },
  },
  computed: {
    ...mapState("exhibitNav", {
      isExhibitNavVisible: (state) => state.isExhibitNavVisible,
    }),
  },
  methods: {
    hideNavInIntroduction() {
      if (this.page === "1" || this.page === "index") {
        this.$store.commit("exhibitNav/hideExhibitNav");
      } else {
        if (!this.isExhibitNavVisible) {
          this.$store.commit("exhibitNav/showExhibitNav");
        }
      }
    },
  },
};
</script>


<style lang="scss">
.default-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 100vw;
  overflow-x: hidden;
}

.route-index,
.route-1 {
  .exhibit-nav {
    opacity: 0;
  }
}
</style>