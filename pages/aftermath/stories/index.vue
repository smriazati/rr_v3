<template>
    <div class="aftermath-stories-page-wrapper">
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
    mounted() {
        const body = document.querySelector('body');
        body.style.height = 'auto'
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
    min-height: 100vh;
}

.aftermath-stories-page-wrapper {
    margin-top: 50px;
    padding: 0 30px;

    .stories-subjects-wrapper {
        padding-right: 0px;
    }
}

@media (max-height: 700px) {
    img {
        width: 300px;
    }
}
</style>
  