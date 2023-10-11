<template>
  <div class="admin-layout" :class="`route-${page}`">
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: this.$route.name,
    };
  },
};
</script>

<style lang="scss">
.admin-layout {
  background: white;
  color: black;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>