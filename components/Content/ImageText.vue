<template>
    <div :class="content.imgAlign === 'left' ? 'row content-' : 'row row-reverse'">
        <LocalizationImage :img="content.img" :height="700"></LocalizationImage>
        <div class="col text-wrapper">
            <LocalizationRte :content="content.text"></LocalizationRte>
        </div>
    </div>
</template>


<script setup lang="ts">

const props = defineProps<{
    content: any
}>()

</script>



<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.col p:not(:last-child) {
    margin-bottom: 30px;
}

.content-image-text {
    figure {
        padding: 20px;
    }

    .image-wrapper,
    figure {
        display: flex;
        justify-content: center;

        figcaption {
            @media (max-width: $collapse-bp) {
                align-items: center;
                margin-top: 5px;
            }
        }
    }
}
</style>