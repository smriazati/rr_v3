<template>
    <div class="row">
        <LocalizationImage :img="content.img" :height="800"></LocalizationImage>
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

