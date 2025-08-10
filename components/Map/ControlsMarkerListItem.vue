<template>
  <li :id="`marker-${index}`">
    <span class="hover-cursor" :class="isViewed ? 'viewed-marker' : ''" @click="openStory" v-if="item">
      <span class="icon"></span>
      <LocalizationString :string="item.title"></LocalizationString>
    </span>
  </li>
</template>

<script setup>
import { computed } from 'vue'

// Define props
const props = defineProps({
  item: Object,
  index: Number,
})

const occupationStore = useOccupationStore()

const viewedStories = computed(() => occupationStore.viewedStories)

const isViewed = computed(() => {
  if (!viewedStories.value) return null
  return viewedStories.value.includes(props.index)
})

function openStory() {
  occupationStore.setActiveStory(props.index)
}

</script>
