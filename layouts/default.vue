<template>
  <div class="default-layout" :class="`route-${page}`">
    <ExhibitNav />
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
  scrollToTop: true
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
</style>