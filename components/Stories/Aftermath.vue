<template>
    <div class="aftermath-stories">
        <div v-if="content">
            <main class="content">
                <div class="row" v-for="item in content.sections" :key="item._key"
                    :class="item._type == 'contentImgFull' ? 'dark' : ''">
                    <div v-if="item._type == 'contentImgText'">
                        <ContentImageText :content="item"></ContentImageText>
                    </div>
                    <div v-if="item._type == 'contentImgFull'">
                        <ContentImageFull :content="item"></ContentImageFull>
                    </div>
                    <div v-if="item._type == 'contentText'">
                        <ContentText :content="item"></ContentText>
                    </div>
                    <div v-if="item._type == 'contentVideo'" class="content-video">
                        <ContentVideo :content="item"></ContentVideo>
                    </div>
                    <div v-if="item._type == 'contentQuote'" class="content-quote">
                        <ContentQuote :quote="item"></ContentQuote>
                    </div>
                </div>
            </main>
        </div>
    </div>
</div></template>

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
        schema: {
            type: String,
            required: true,
        },
    },
} 
</script>

<style lang="scss">
.aftermath-stories blockquote figcaption {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.aftermath-stories .content-quote {
    max-width: 55ch;
    text-align: center;
}
</style>