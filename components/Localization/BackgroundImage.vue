<template>
    <div class="background-wrapper" v-if="src !== ''">
        <img class="background-image" :src="computedSrc" :alt="alt" />

        <!-- Dark overlay behind the text -->
        <div v-if="overlay" class="background-overlay"></div>

        <div class="text-content">
            <p class="caption">{{ caption }}</p>
            <p class="credit">{{ credit }}</p>
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
            required: false,
        },
        height: {
            type: Number,
            required: false,
        },
        overlay: {
            type: Boolean,
            default: true, // Enable dark overlay by default
        },
        overlayOpacity: {
            type: Number,
            default: 0.7, // 70% opacity for overlay
        }
    },
    computed: {
        ...mapState("localization", {
            activeLanguage: (state) => state.activeLanguage,
        }),
        src() {
            if (!this.img || !this.img.img) return "";
            return this.img.img.asset;
        },
        computedSrc() {
            if (!this.src) return "";
            if (this.size || this.height) {
                return this.$urlFor(this.src).width(this.size).height(this.height);
            }
            return this.$urlFor(this.src);
        },
        alt() {
            if (!this.img?.alt) return "";
            return this.img.alt[this.activeLanguage] || this.img.alt["en"] || "";
        },
        caption() {
            if (!this.img?.caption) return "";
            return this.img.caption[this.activeLanguage] || this.img.caption["en"] || "";
        },
        credit() {
            if (!this.img?.credit) return "";
            return this.img.credit[this.activeLanguage] || this.img.credit["en"] || "";
        }
    }
};
</script>

<style lang="scss" scoped>
.background-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;

    .background-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(5px); // Optional blur effect
        position: absolute;
        z-index: -2;
    }

    /* Dark overlay that sits behind the text */
    .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        /* 70% opacity black overlay */
        z-index: -1;
        /* Ensure it's behind the text */
    }

    .text-content {
        position: absolute;
        top: 10px;
        right: 10px;
        text-align: right;
        color: white;
        font-size: 12px;
        line-height: 1.4;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

        p {
            font-size: 16px;
            line-height: 20px;
        }

        .caption {
            margin: 0;
        }

        .credit {
            margin: 0;
            text-transform: uppercase;
            font-size: 10px;
            opacity: 0.8;
        }
    }
}
</style>