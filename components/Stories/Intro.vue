<template>
    <main ref="content" class="content">
        <StoryTitle :subjectId="subjectId" :sectionId="sectionId" />
        <div class="row" v-for="item in content?.sections" :key="item._key"
            :class="item._type == 'contentImgFull' ? 'dark' : ''">
            <div class="content-image-text" v-if="item._type == 'contentImgText'">
                <ContentImageText :content="item"></ContentImageText>
            </div>
            <div class="content-image" v-if="item._type == 'contentImgFull'">
                <ContentImageFull :content="item"></ContentImageFull>
            </div>
            <div class="content-text" v-if="item._type == 'contentText'">
                <ContentText :content="item"></ContentText>
            </div>
        </div>
    </main>
</template>

<script>

import { groq } from '@nuxtjs/sanity'

export default {
    async fetch() {
        this.content = await this.$sanity.fetch(groq`*[_id == "${this.schema}"][0]{
            "sections": content.sections
        }`)
    },
    data: () => ({
        content: '',
    }),
    props: {
        sectionId: {
            type: String,
            required: true,
        },
        subjectId: {
            type: String,
            required: true,
        },
        schema: {
            type: String,
            required: true,
        },
    },
    methods: {
        onScrollEnd() {
            this.$emit("on-scroll-end");
        },
    },
};
</script>