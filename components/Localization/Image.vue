<template>
    <figure>
        <div v-if="src !== '' && !size" class="image-wrapper">
            <img :src="$urlFor(src)" :alt="alt" />
        </div>
        <div v-if="src !== '' && size" class="image-wrapper">
            <img :src="$urlFor(src).width(size)" :alt="alt" />
        </div>
        <figcaption>
            <p class="caption">{{ caption }}</p>
            <p class="credit">{{ credit }}</p>
        </figcaption>
    </figure>
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
            return this.img?.alt[this.activeLanguage]
        },
        caption() {
            if (!this.img) { return "" }
            if (!this.img.caption) { return "" }
            return this.img?.caption[this.activeLanguage]
        },
        credit() {
            if (!this.img) { return "" }
            if (!this.img.credit) { return "" }
            return this.img?.credit[this.activeLanguage]
        }
    }
};
</script>
<style lang="scss" scoped>
figure {
    display: flex;
    flex-direction: column;

    >div {
        display: flex;
        flex-direction: column;
    }

    figcaption {
        display: flex;
        flex-direction: column-reverse;

        .credit {
            text-align: right;
            margin-top: 4px;
            text-transform: uppercase;
            font-size: 10px;
        }
    }
}
</style>
