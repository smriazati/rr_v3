<template>
    <figure>
        <blockquote v-if="quote">
            <div>
                <p>
                    <LocalizationQuote :string="quote.quote"></LocalizationQuote>
                </p>
            </div>
            <figcaption>
                <LocalizationString :string="quote.attr">
                </LocalizationString>
            </figcaption>
        </blockquote>
    </figure>
</template>

<script>

export default {
    props: {
        quote: {
            type: Object,
            required: true,
        }
    },
};
</script>

<style lang="scss" scoped>
figcaption {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
</style>