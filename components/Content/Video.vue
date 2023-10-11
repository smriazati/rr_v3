<template>
    <div>
        <div v-if="content">
            <div :class="content.align === 'left' ? 'row' : 'row row-reverse'">
                <div class="vimeo-component">
                    <VimeoComponent :vidId="content.vid.id" />
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
<script>
export default {
    props: {
        content: {
            type: Object,
            required: true,
        }
    },
    computed: {
        vidCaption() {
            if (!this.content) { return null }
            if (!this.content.vid) { return null }
            if (!this.content.vid.vidCaption) { return null }
            return this.content.vid.vidCaption
        }
    }
}
</script>

<style lang="scss">
.col p:not(:last-child) {
    margin-bottom: 30px;
}

.content-video {
    .col.text-wrapper {
        flex: 0 0 45ch;
    }
}
</style>