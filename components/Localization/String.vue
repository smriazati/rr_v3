<template>
    <span>
        <span v-if="activeString">
            {{ activeString }}
        </span>
    </span>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: {
        string: {
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
            if (!this.string) { return "" }
            return this.string[this.activeLanguage]
        }
    },
}
</script>

<style lang="scss" scoped>
span {
    display: flex;
}
</style>