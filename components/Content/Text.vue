<template>
    <div class="text-content" :class="contentClass">
        <div v-if="title" class="title">
            <String :string="title" />
        </div>
        <div v-if="content" class="content">
            <Rte :rte="content" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Text Component
 * 
 * Core Functions:
 * - Displays localized text content from Sanity
 * - Handles title and content rendering with proper components
 * - Supports custom styling classes
 * - Provides responsive text layout
 * 
 * Performance Optimizations:
 * - Computed properties for efficient class generation
 * - Conditional rendering to avoid unnecessary DOM elements
 * - Optimized text processing and display
 */

// Props definition with TypeScript
interface Props {
    title?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    content?: {
        en?: any[]
        uk?: any[]
        es?: any[]
        he?: any[]
    }
    className?: string
    variant?: 'default' | 'large' | 'small' | 'quote'
}

const props = withDefaults(defineProps<Props>(), {
    className: '',
    variant: 'default'
})

// Generate content classes based on props
const contentClass = computed(() => {
    const classes = ['text-content']

    if (props.className) {
        classes.push(props.className)
    }

    if (props.variant) {
        classes.push(`variant-${props.variant}`)
    }

    return classes.join(' ')
})

// Check if content exists
const hasContent = computed(() => {
    return props.title || props.content
})
</script>

<style lang="scss" scoped>
.text-content {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;

    .title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 16px;
        line-height: 1.3;

        @media (max-width: 768px) {
            font-size: 20px;
        }
    }

    .content {
        font-size: 16px;
        line-height: 1.6;
        color: #333;

        :deep(p) {
            margin-bottom: 16px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        :deep(h1, h2, h3, h4, h5, h6) {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
        }

        :deep(ul, ol) {
            margin-bottom: 16px;
            padding-left: 20px;
        }

        :deep(li) {
            margin-bottom: 8px;
        }
    }

    // Variant styles
    &.variant-large {
        .title {
            font-size: 32px;

            @media (max-width: 768px) {
                font-size: 28px;
            }
        }

        .content {
            font-size: 18px;
        }
    }

    &.variant-small {
        .title {
            font-size: 18px;
        }

        .content {
            font-size: 14px;
        }
    }

    &.variant-quote {
        .content {
            font-style: italic;
            font-size: 18px;
            color: #666;
            border-left: 4px solid #ddd;
            padding-left: 20px;
        }
    }
}
</style>