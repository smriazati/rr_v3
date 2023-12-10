<template>
    <div :class="content.imgAlign === 'left' ? 'row content-' : 'row row-reverse'">
        <LocalizationImage :img="content.img" :height="700"></LocalizationImage>
        <div class="col text-wrapper">
            <LocalizationRte :content="content.text"></LocalizationRte>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: Object,
            required: true,
        }
    },
}
</script>

<style lang="scss">
.col p:not(:last-child) {
    margin-bottom: 30px;
}

.content-image-text {

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