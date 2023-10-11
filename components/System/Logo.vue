<template>
  <figure ref="logo" class="exhibit-logo">
    <img
      src="/images/logo.png"
      alt="A logo that says Roots of Resistance, with the symbol of a tree. The tree  shows both its branches and roots. "
    />
  </figure>
</template>
<script>
export default {
  props: {
    animate: {
      type: Boolean,
    },
  },
};
</script>


<style lang="scss">
.exhibit-logo {
  max-width: 100%;
}
</style>