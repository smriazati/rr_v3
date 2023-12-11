<template>
    <main ref="content" class="content">
        <StoryTitle :subjectId="subjectId" :sectionId="sectionId" />
        <div class="row section gsap-fade-in" v-for="item in content?.sections" :key="item._key"
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
    fetchOnServer: false,
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
            const sections = content.querySelectorAll(".section");
            console.log(content, sections)
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
        }
    },
};
</script>