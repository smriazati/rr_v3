<template>
    <div>
        <div v-if="content">
            <div :class="content.align === 'left' ? 'row' : 'row row-reverse'">
                <div class="vimeo-component">
                    <VimeoComponent :vidId="content.vid.id" @on-vid-playing="setPlayState"
                        @on-vid-pausing="setPlayState" ref="vid" />
                    <p class="caption" v-if="vidCaption">
                        <LocalizationString :string="vidCaption"></LocalizationString>
                    </p>
                </div>
                <div class="col text-wrapper">
                    <LocalizationRte :content="content.text"></LocalizationRte>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    content: any
}>()

const vidCaption = computed(() => {
    if (!props.content.value) { return null }
    if (!props.content.value.vid) { return null }
    if (!props.content.value.vid.vidCaption) { return null }
    return props.content.value.vid.vidCaption
})

const isPlaying = ref(false);
function setPlayState(payload: any) {
    isPlaying.value = payload
}



</script>




<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.col p:not(:last-child) {
    margin-bottom: 30px;
}

.content-video {

    .col.text-wrapper {
        @media (min-width: $collapse-bp) {

            flex: 0 0 45ch;
        }

        @media (max-width: $collapse-bp) {
            margin-top: 30px;
        }
    }

    .caption {
        @media (max-width: $collapse-bp) {
            text-align: center;

            span {
                justify-content: center;
            }
        }
    }
}
</style>