<template>
    <div>
        <div v-if="content">
            <div v-if="activeLanguage == 'en'">
                <SanityContent :blocks="content?.en?.rte" />
            </div>
            <div v-if="activeLanguage == 'uk'">
                <SanityContent :blocks="content?.uk?.rte" />
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
    },
}
</script>