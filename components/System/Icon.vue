<template>
  <span class="icon" :class="`${type} ${color}`">
    <img
      :src="`/icons/${type}.svg`"
      :alt="`${type} icon`"
      :width="width"
      :height="width"
    />
  </span>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
    },
    color: {
      type: String,
    },
    width: {
      type: Number,
    },
  },
};
</script>

<style lang="scss">
.icon {
  &.light {
    filter: invert(1);
  }
}
</style>
