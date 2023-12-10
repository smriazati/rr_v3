<template>
    <div class="row">
        <div class="col" v-if="content">
            <h2 v-if="content.title">
                <LocalizationString :string="content.title"></LocalizationString>
            </h2>
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
.content-text h2 {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}

.content-text {
    @media (max-width: $collapse-bp) {
        max-width: 90%;
        padding: 0 30px;
        margin: 0 auto;
    }
}

.col p:not(:last-child) {
    margin-bottom: 30px;
}
</style>