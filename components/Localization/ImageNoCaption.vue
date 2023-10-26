<template>
    <div>
        <div v-if="src !== '' && !size">
            <img :src="$urlFor(src)" :alt="alt" />
        </div>
        <div v-if="src !== '' && size">
            <img :src="$urlFor(src).width(size)" :alt="alt" />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: {
        img: {
            type: Object,
            required: true,
        },
        size: {
            type: Number,
            required: false
        }
    },
    computed: {
        ...mapState("localization", {
            activeLanguage: (state) => state.activeLanguage,
        }),
        src() {
            if (!this.img) { return "" }
            if (!this.img.img) { return "" }
            return this.img.img.asset
        },
        alt() {
            if (!this.img) { return "" }
            if (!this.img.alt) { return "" }
            const alt = this.img?.alt[this.activeLanguage]
            if (alt) {
                return alt
            } else {
                this.img?.alt["en"]
            }
        },
    }
};
</script>
