<template>
    <div class="stories-page-wrapper">
        <StoriesSubjects :title="title" :subtitle="subhead" :subjectCTA="subjectCTA" route="aftermath" />
    </div>
</template>

</template>
  
<script>
import { groq } from '@nuxtjs/sanity'
const schema = "intro4"
const query = groq`*[_type == "${schema}"][0]`

export default {
    asyncData({ $sanity }) {
        const content = $sanity.fetch(query)
        return content
    },
    data() {
        return {
            name: "aftermath-stories",
        };
    },
    head() {
        return {
            title: this.$setPageTitle(this.pageMetadata)
        }
    },
};
</script>
  
  
<style lang="scss">
.route-aftermath-stories .stories-subjects-wrapper {
    padding-top: 100px;
}

.aftermath-stories {
    @media (max-width: $collapse-bp) {
        padding-top: 60px;
    }

    position: relative;



    .text-wrapper {
        padding: 30px;
        max-width: 60ch;
        /* margin-bottom: 60px; */

        >*:last-child {
            margin-bottom: 0px;
        }
    }
}
</style>
  