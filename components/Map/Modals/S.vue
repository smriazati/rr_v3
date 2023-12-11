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

<script>
import { groq } from '@nuxtjs/sanity'

export default {
    async fetch() {
        const data = await this.$sanity.fetch(groq`*[_id == "marker${this.activeStoryId + 1}"][0]`)
        if (!data) { return }
        if (!data.content) { return }
        this.content = data.content
    },
    fetchOnServer: false,
    data: () => ({
        content: '',
    }),
    props: {
        activeStoryId: {
            type: Number,
            required: true,
        },
    },
}
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