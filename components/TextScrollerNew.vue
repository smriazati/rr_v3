<template>
    <div class="story-scroller" ref="container">
        <div class="background" ref="bg" />
        <div class="background-image-meta">
            <div class="background-caption">
                <LocalizationString :string="props.bgImg.caption" />
            </div>
            <div class="background-credit">
                <LocalizationString :string="props.bgImg.credit" />
            </div>
        </div>

        <div class="panels">
            <section v-for="(block, index) in blocks" :key="index" :class="`panel ${index === 0 && 'active'}`">
                <p class="panel-text">{{ block[currentLocale] }}</p>
            </section>
        </div>

        <button class="scroller-arrow-button scroller-arrow-up flat" v-if="!isFirstPanel" @click="scrollToPrev">
            ↑
        </button>

        <button class="scroller-arrow-button scroller-arrow-down flat" v-if="!isLastPanel" @click="scrollToNext">
            ↓
        </button>

        <div class="progress-bar">
            <div class="fill" :style="{ height: scrollPercent + '%' }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { LocalizedString } from '~/types/sanity';
const { $urlFor } = useNuxtApp()





const emit = defineEmits<{
    (e: 'scrolled-to-end'): void
}>()

const props = defineProps<{
    blocks: LocalizedString[],
    bgImg: any
}>()

console.log('props', props)
const { activeLanguage } = useLocalization();
const currentLocale = computed(() => activeLanguage.value)

const container = ref<HTMLElement | null>(null)
const bg = ref<HTMLElement | null>(null)
const scrollPercent = ref(0)
const panelRefs = ref<HTMLElement[]>([])

const currentPanelIndex = ref(0)

const isFirstPanel = computed(() => currentPanelIndex.value === 0)
const isLastPanel = computed(
    () => currentPanelIndex.value === props.blocks.length - 1
)

function scrollToPanel(index: number) {
    const panel = panelRefs.value[index]
    if (panel) {
        panel.scrollIntoView({ behavior: 'smooth' })
    }
}

function scrollToNext() {
    if (currentPanelIndex.value < props.blocks.length - 1) {
        scrollToPanel(currentPanelIndex.value + 1)
    }
}

function scrollToPrev() {
    if (currentPanelIndex.value > 0) {
        scrollToPanel(currentPanelIndex.value - 1)
    }
}

function updateCurrentPanel() {
    const scrollY = window.scrollY
    const panelPositions = panelRefs.value.map((panel) =>
        panel.getBoundingClientRect().top + window.scrollY
    )

    const viewportCenter = scrollY + window.innerHeight / 2
    let closest = 0
    let minDist = Infinity

    panelPositions.forEach((pos, idx) => {
        const dist = Math.abs(pos - viewportCenter)
        if (dist < minDist) {
            minDist = dist
            closest = idx
        }
    })

    currentPanelIndex.value = closest

    // Set active class on current panel
    panelRefs.value.forEach((el, i) => {
        if (i === closest) {
            el.classList.add('active')
        } else {
            el.classList.remove('active')
        }
    })
}

onMounted(() => {
    if (!container.value || !bg.value) return


    const windowWidth = window.innerWidth;
    bg.value.style.backgroundImage = `url('${$urlFor(props.bgImg.img).width(windowWidth).blur(15).format('webp').url()}')`

    panelRefs.value = Array.from(
        container.value.querySelectorAll('.panel')
    ) as HTMLElement[]

    gsap.to(bg.value, {
        scale: 1.2,
        ease: 'none',
        scrollTrigger: {
            trigger: container.value,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    })

    ScrollTrigger.create({
        trigger: container.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: self => {
            scrollPercent.value = self.progress * 100
            updateCurrentPanel()
        },
        onLeave: () => emit('scrolled-to-end')
    })

    window.addEventListener('scroll', updateCurrentPanel)
})
</script>

<style lang="scss" scoped>
@use '~/assets/sass/imports/imports.scss' as *;

.story-scroller {
    position: relative;
    overflow-x: hidden;
}




// arrows 

.scroller-arrow-button {
    position: fixed;
    background: transparent;
    z-index: 11;
    left: 50%;
    width: 44px;
    height: 44px;
    font-size: 2rem;
    margin: 0;
    color: white;
}

.scroller-arrow-up {
    top: 30vh;
}

.scroller-arrow-down {
    bottom: 30vh;
}

.progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 10px;
    height: 100vh;
    background: color-mix(in oklab, $forest 50%, black);
    z-index: 9;
}

.fill {
    width: 100%;
    background: $sage;
    height: 0%;
    transition: height 0.2s ease;
}

// panels 

.panels {
    position: relative;
    z-index: 1;
}

.panel {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-size: 1.5rem;
    text-align: center;
    line-height: 1.6;
}

.panel {
    opacity: 0.2;
    filter: blur(4px);
    transition: opacity 0.4s ease, filter 0.4s ease;
}

.panel :deep(p) {
    line-height: 1.2;
}

.panel.active {
    opacity: 1;
    filter: blur(0px);
}

// 
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    z-index: -1;
    transform: scale(1);
    opacity: 0.5;
}


.background-image-meta {
    position: fixed;
    top: 30px;
    right: 30px;
    text-align: right;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 4px;
    opacity: 0.8;
}

.background-caption {
    font-size: 14px;
    letter-spacing: .02px;
    line-height: 1;
}

.background-credit {
    font-size: 10px;
    line-height: 1;
    text-transform: uppercase;
}
</style>