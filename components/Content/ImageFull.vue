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

