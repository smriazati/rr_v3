<template>
    <figure>
        <blockquote v-if="quote">
            <div>
                <p>
                    <LocalizationQuote :string="quote.quote"></LocalizationQuote>
                </p>
            </div>
            <figcaption>
                <LocalizationString :string="quote.attribution">
                </LocalizationString>
            </figcaption>
        </blockquote>
    </figure>
</template>

<script setup lang="ts">
import type { ContentQuote } from '../../types/sanity'

/**
 * ContentQuote Component
 * 
 * Core Functions:
 * - Displays quote content with proper semantic HTML structure
 * - Handles quote text and attribution from Sanity
 * - Provides localization support for quote content
 * - Maintains proper accessibility with blockquote element
 * 
 * Performance Optimizations:
 * - Conditional rendering to avoid unnecessary DOM elements
 * - Minimal reactivity for optimal performance
 * - Efficient prop handling
 */

// Props with TypeScript typing
interface Props {
    quote: ContentQuote
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
figcaption {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
</style>