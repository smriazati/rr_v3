<template>
    <div>
        <div v-if="content">
            <div v-if="activeString">
                <SanityContent :blocks="activeString?.rte" />
            </div>
            <div v-else>
                <SanityContent :blocks="content?.en?.rte" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: {
        content: {
            type: Object,
            required: false,
        },
    },
    computed: {
        ...mapState("localization", {
            activeLanguage: (state) => state.activeLanguage,
        }),
        activeString() {
            if (!this.activeLanguage) { return "" }
            if (!this.content) { return "" }
            return this.content[this.activeLanguage]
        }
    },
}
</script>