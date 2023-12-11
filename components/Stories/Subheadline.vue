<template>
    <div>
        <h2 class="subheadline collapsed-mb">
            <LocalizationString :string="sectionTitle"></LocalizationString>
        </h2>
    </div>
</template>
  
<script>
import { groq } from '@nuxtjs/sanity'
const schema = "settings"
const query = groq`*[_type == "${schema}"]{
  "sections": siteNavLabels.sections
}[0]`

export default {
    data: () => ({
        sections: ''
    }),
    async fetch() {
        const data = await this.$sanity.fetch(query)
        if (!data) { return }
        this.sections = data.sections;
    },
    fetchOnServer: false,
    computed: {
        sectionTitle() {
            if (!this.sections) { return }
            if (!this.$route) { return }
            if (!this.$route.name) { return }
            const sections = this.sections
            const routeName = this.$route.name.slice();
            const routeKey = routeName.includes('-') ? routeName.substr(0, routeName.indexOf('-')) : routeName;
            const keys = Object.keys(sections).map(section => {
                return section
            })
            let sectionTitle;
            for (const item of keys) {
                if (item === routeKey) {
                    sectionTitle = sections[item];
                }
            }
            return sectionTitle
        }
    }
};
</script>
  