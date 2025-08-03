<template>
    <div class="row">
        <LocalizationImage :img="content.img" :height="800"></LocalizationImage>
    </div>
</template>
<script setup lang="ts">

const props = defineProps<{
    content: any
}>()

</script>



<style lang="scss">
@use '~/assets/sass/imports/imports.scss' as *;

.content-image {

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
