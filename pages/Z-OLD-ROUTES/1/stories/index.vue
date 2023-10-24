<template>
    <div :class="name" class="stories-landing-page">
        <div class="main-row flex-row">
            <div class="text-wrapper green-bg">
                <div class="call-out">
                    <h1 class="center">
                        <LocalizationString :string="title"></LocalizationString>
                    </h1>
                    <LocalizationRte :content="mainText"></LocalizationRte>
                </div>
            </div>
            <div class="story-lp-images-wrapper">
                <StoryLandingPageImages :sectionIndex="1" :title="subhead" :subtitle="subheadText" />
            </div>
        </div>
    </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
const schema = "intro1"
const query = groq`*[_type == "${schema}"][0]`

export default {
    asyncData({ $sanity }) {
        const content = $sanity.fetch(query)
        return content
    },

    data() {
        return {
            name: "introduction-stories",
        };
    },
    head() {
        return {
            title: this.name
                .replace(/-/g, " ")
                .split(" ")
                .map((word) => {
                    return word[0].toUpperCase() + word.substring(1);
                })
                .join(" "),
        };
    },
};
</script>

