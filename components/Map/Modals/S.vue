<template>
    <div>
        <main class="content storymap-modal-content" v-if="content">
            <div class="row title center">
                <h1>
                    <LocalizationString :string="content.title"></LocalizationString>
                </h1>
            </div>
            <div class="row" v-for="item in content.sections" :key="item._key"
                :class="item._type == 'contentImgFull' ? 'dark' : ''">
                <div v-if="item._type == 'contentImgText'" class="image-text">
                    <ContentImageText :content="item"></ContentImageText>
                </div>
                <div v-if="item._type == 'contentImgFull'">
                    <ContentImageFull :content="item"></ContentImageFull>
                </div>
                <div v-if="item._type == 'contentText'">
                    <ContentText :content="item"></ContentText>
                </div>
                <div v-if="item._type == 'contentQuote'">
                    <ContentQuote :quote="item"></ContentQuote>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import groq from 'groq'

// Props
interface Props {
    activeStoryId: number
}
const props = defineProps<Props>()

const query = computed(() => groq`*[_id == "marker${props.activeStoryId + 1}"][0]`)
const { data: content } = useSanityQuery<any>(query)
</script>
<style lang="scss">
.storymap-modal-content .title h1 {
    display: flex;
    justify-content: center;
}

.storymap-modal-content blockquote figcaption span {
    justify-content: center;
}

.storymap-modal-content .image-text {
    .col-text {
        flex: 100%;
    }
}
</style>