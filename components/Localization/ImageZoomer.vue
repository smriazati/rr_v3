<template>
    <figure class="image-zoomer">
        <div class="image-zoomer" ref="imageZoomer">
            <img :src="$urlFor(img.img.asset).width(1200)" :alt="alt" class="gsap-fade-in" />
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
        height: {
            type: Number,
            required: false,
        },
        img: {
            type: Object,
            required: true,
        }
    },
    computed: {
        ...mapState("localization", {
            activeLanguage: (state) => state.activeLanguage,
        }),
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
            if (!this.img.caption) { return "" }
            const credit = this.img?.credit[this.activeLanguage]
            if (credit) {
                return credit
            } else {
                this.img?.credit["en"]
            }
        },
    },
    watch: {
        height() {
            this.setAnim();
        },
    },
    mounted() {
        this.setAnim();
    },
    methods: {
        setAnim() {
            // console.log("setting animation with", this.height);
            const gsap = this.$gsap;
            const img = this.$refs.imageZoomer;
            const imgEl = img.querySelector('img');
            gsap.to(imgEl, {
                autoAlpha: 1,
                duration: 3
            })

            gsap.set(img, {
                scale: 3,
                autoAlpha: 0.8,
            });

            if (this.height) {
                gsap.to(img, {
                    scale: 1,
                    autoAlpha: 1,
                    scrollTrigger: {
                        trigger: img,
                        start: "top top",
                        end: `+=${this.height}px`,
                        scrub: 1.5,
                    },
                });
            }
        },
    },
};
</script>

<style lang="scss">
.image-zoom-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;

    .image-zoomer {
        position: relative;

        &:after {
            content: "";
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 10, 0.4);
            // transform: scale(3);
            position: absolute;
            top: 0;
            left: 0;
        }

        width: 100%;
        height: 100%;
        position: relative;


        img {
            min-height: 100%;
            object-fit: cover;
        }

        figcaption {
            position: absolute;
            top: 0px;
            right: 0px;
            padding: 30px;
            text-align: right;
            flex-direction: column-reverse;
            display: flex;


            @media (max-width: $collapse-bp) {
                max-width: 30ch;
            }

            p {
                font-size: 14px;
                letter-spacing: .02px;
                line-height: 18px;

                &.credit {
                    font-size: 10px;
                    position: relative;
                    text-transform: uppercase;
                }
            }
        }

    }
}
</style>