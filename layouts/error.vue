<template>
  <div class="error-layout">
    <h1 v-if="error.statusCode === 404">Oops, there&rsquo;s nothing here!</h1>
    <h1 v-else>An error occurred</h1>
    <button>
      <NuxtLink to="/">Go to the exhibit</NuxtLink>
    </button>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};
</script>

<style lang="scss">
.error-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  h1 {
    margin-bottom: 30px;
  }
}
</style>