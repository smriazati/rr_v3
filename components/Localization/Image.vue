<template>
    <figure>
        <div v-if="src !== ''">
            <div v-if="size || height" class="image-wrapper">
                <img :src="$urlFor(src).width(size).height(height)" :alt="alt" />
            </div>
            <div v-else class="image-wrapper">
                <img :src="$urlFor(src)" :alt="alt" />
            </div>
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
        },
        height: {
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
        caption() {
            if (!this.img) { return "" }
            if (!this.img.caption) { return "" }
            const caption = this.img?.caption[this.activeLanguage]
            if (caption) {
                return caption
            } else {
                this.img?.caption["en"]
            }
        },
        credit() {
            if (!this.img) { return "" }
            if (!this.img.credit) { return "" }
            const credit = this.img?.credit[this.activeLanguage]
            if (credit) {
                return credit
            } else {
                this.img?.credit["en"]
            }
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
