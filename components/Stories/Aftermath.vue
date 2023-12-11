<template>
    <div class="aftermath-stories">
        <div v-if="content">
            <main ref="content" class="content">
                <div class="row section gsap-fade-in" v-for="item in content.sections" :key="item._key"
                    :class="item._type == 'contentImgFull' ? 'dark' : ''">
                    <div v-if="item._type == 'contentImgText'">
                        <ContentImageText :content="item"></ContentImageText>
                    </div>
                    <div v-if="item._type == 'contentImgFull'">
                        <ContentImageFull :content="item"></ContentImageFull>
                    </div>
                    <div v-if="item._type == 'contentText'" class="context-text-wrapper">
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
    fetchOnServer: false,
    data: () => ({
        content: '',
    }),
    props: {
        schema: {
            type: String,
            required: true,
        },
    },
    watch: {
        content() {
            if (this.content !== '') {
                this.$nextTick(() => {
                    this.setAnim();
                })
            }
        }
    },
    methods: {
        setAnim() {
            const gsap = this.$gsap;
            const content = this.$refs.content;
            if (!content) { return }
            const sections = content.querySelectorAll(".section");
            console.log(sections);
            if (!sections) { return }
            sections.forEach((panel, i) => {

                if (i === 0) {
                    gsap.set(panel, {
                        autoAlpha: 0,
                        y: 150,
                    });

                    gsap.to(panel, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 1
                    })
                } else {
                    gsap.set(panel, {
                        autoAlpha: 0,
                        y: 150,
                    });

                    gsap.to(panel, {
                        autoAlpha: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: panel,
                            start: `top+=150px bottom`,
                            end: `+=300px`,
                            scrub: 1.1,
                        },
                    });
                }
            });
        },
    }
} 
</script>

<style lang="scss">
.aftermath-stories blockquote {
    margin-bottom: 60px;

    figcaption {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
}

.aftermath-stories .content-quote {
    max-width: 55ch;
    text-align: center;
}

.aftermath-stories {
    @media (max-width: $collapse-bp) {
        .context-text-wrapper {
            padding: 0 30px;
        }
    }
}
</style>