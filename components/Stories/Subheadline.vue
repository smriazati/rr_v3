<template>
    <div class="stories-subheadline" :class="subheadlineClass">
        <div class="subheadline-container">
            <h2 class="subheadline-title">
                <String :string="title" />
            </h2>
            <div v-if="subtitle" class="subheadline-subtitle">
                <String :string="subtitle" />
            </div>
            <div v-if="description" class="subheadline-description">
                <Rte :rte="description" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Stories Subheadline Component
 * 
 * Core Functions:
 * - Displays subheadlines for story sections
 * - Handles localized content from Sanity
 * - Supports different styling variants
 * - Provides consistent typography hierarchy
 * 
 * Performance Optimizations:
 * - Efficient content rendering
 * - Optimized typography scaling
 * - Responsive design implementation
 */

// Props definition with TypeScript
interface Props {
    title?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    subtitle?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    description?: {
        en?: any[]
        uk?: any[]
        es?: any[]
        he?: any[]
    }
    variant?: 'default' | 'large' | 'small' | 'centered' | 'minimal'
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    className: ''
})

// Computed properties
const subheadlineClass = computed(() => {
    const classes = ['stories-subheadline']

    if (props.className) {
        classes.push(props.className)
    }

    if (props.variant) {
        classes.push(`variant-${props.variant}`)
    }

    return classes.join(' ')
})
</script>

<style lang="scss" scoped>
.stories-subheadline {
    padding: 40px 0;

    .subheadline-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 20px;

        .subheadline-title {
            font-size: 32px;
            font-weight: 600;
            line-height: 1.3;
            margin-bottom: 16px;
            color: #333;

            @media (max-width: 768px) {
                font-size: 28px;
            }
        }

        .subheadline-subtitle {
            font-size: 18px;
            line-height: 1.4;
            color: #666;
            margin-bottom: 20px;

            @media (max-width: 768px) {
                font-size: 16px;
            }
        }

        .subheadline-description {
            :deep(p) {
                font-size: 16px;
                line-height: 1.6;
                color: #666;
                margin-bottom: 16px;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }

    // Variant styles
    &.variant-large {
        .subheadline-container {
            .subheadline-title {
                font-size: 40px;

                @media (max-width: 768px) {
                    font-size: 32px;
                }
            }

            .subheadline-subtitle {
                font-size: 20px;

                @media (max-width: 768px) {
                    font-size: 18px;
                }
            }
        }
    }

    &.variant-small {
        padding: 30px 0;

        .subheadline-container {
            .subheadline-title {
                font-size: 24px;

                @media (max-width: 768px) {
                    font-size: 22px;
                }
            }

            .subheadline-subtitle {
                font-size: 16px;

                @media (max-width: 768px) {
                    font-size: 15px;
                }
            }
        }
    }

    &.variant-centered {
        .subheadline-container {
            text-align: center;
        }
    }

    &.variant-minimal {
        padding: 20px 0;

        .subheadline-container {
            .subheadline-title {
                font-size: 20px;
                margin-bottom: 8px;
            }

            .subheadline-subtitle {
                font-size: 14px;
                margin-bottom: 12px;
            }

            .subheadline-description :deep(p) {
                font-size: 14px;
            }
        }
    }

    // Responsive design
    @media (max-width: 768px) {
        padding: 30px 0;

        .subheadline-container {
            padding: 0 15px;
        }
    }
}
</style>