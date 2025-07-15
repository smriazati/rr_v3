<template>
    <section class="stories-intro" :class="introClass">
        <div class="intro-container">
            <div class="intro-header">
                <h1 class="intro-title">
                    <String :string="title" />
                </h1>
                <div v-if="subtitle" class="intro-subtitle">
                    <String :string="subtitle" />
                </div>
            </div>

            <div v-if="description" class="intro-description">
                <Rte :rte="description" />
            </div>

            <div v-if="image" class="intro-image">
                <Image :image="image" size="large" :show-caption="true" />
            </div>

            <div v-if="features.length > 0" class="intro-features">
                <div class="features-grid">
                    <div v-for="feature in features" :key="feature.id" class="feature-card">
                        <div class="feature-icon">
                            <Icon :name="feature.icon || 'star'" />
                        </div>
                        <div class="feature-content">
                            <h3 class="feature-title">
                                <String :string="feature.title" />
                            </h3>
                            <div v-if="feature.description" class="feature-description">
                                <String :string="feature.description" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showNavigation" class="intro-navigation">
                <div class="nav-buttons">
                    <button class="nav-button primary" @click="startExploring">
                        <String :string="startButtonText" />
                    </button>
                    <button v-if="showBackButton" class="nav-button secondary" @click="goBack">
                        <String :string="backButtonText" />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Stories Intro Component
 * 
 * Core Functions:
 * - Displays introduction for story sections
 * - Handles localized content from Sanity
 * - Provides feature highlights and navigation
 * - Supports different layout variants
 * 
 * Performance Optimizations:
 * - Efficient content rendering
 * - Optimized image loading
 * - Responsive design implementation
 */

// Props definition with TypeScript
interface Feature {
    id: string
    title: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    description?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    icon?: string
}

interface ImageData {
    asset?: {
        _ref?: string
    }
    alt?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    caption?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
}

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
    image?: ImageData
    features?: Feature[]
    showNavigation?: boolean
    showBackButton?: boolean
    variant?: 'default' | 'centered' | 'minimal' | 'hero'
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    showNavigation: true,
    showBackButton: false,
    variant: 'default',
    className: '',
    features: () => []
})

// Emits definition
const emit = defineEmits<{
    'start-exploring': []
    'go-back': []
}>()

// Computed properties
const introClass = computed(() => {
    const classes = ['stories-intro']

    if (props.className) {
        classes.push(props.className)
    }

    if (props.variant) {
        classes.push(`variant-${props.variant}`)
    }

    return classes.join(' ')
})

// Localized button texts
const startButtonText = computed(() => ({
    en: 'Start Reading',
    uk: 'Почати читання',
    es: 'Comenzar a leer',
    he: 'התחל לקרוא'
}))

const backButtonText = computed(() => ({
    en: 'Go Back',
    uk: 'Назад',
    es: 'Volver',
    he: 'חזור'
}))

// Event handlers
const startExploring = () => {
    emit('start-exploring')
}

const goBack = () => {
    emit('go-back')
}
</script>

<style lang="scss" scoped>
.stories-intro {
    padding: 60px 0;
    background: #f8f9fa;

    .intro-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;

        .intro-header {
            text-align: center;
            margin-bottom: 40px;

            .intro-title {
                font-size: 48px;
                font-weight: 700;
                line-height: 1.2;
                margin-bottom: 16px;
                color: #333;

                @media (max-width: 768px) {
                    font-size: 36px;
                }
            }

            .intro-subtitle {
                font-size: 20px;
                line-height: 1.4;
                color: #666;
                max-width: 600px;
                margin: 0 auto;

                @media (max-width: 768px) {
                    font-size: 18px;
                }
            }
        }

        .intro-description {
            max-width: 800px;
            margin: 0 auto 40px;
            text-align: center;

            :deep(p) {
                font-size: 18px;
                line-height: 1.6;
                color: #666;
                margin-bottom: 20px;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        .intro-image {
            margin-bottom: 40px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .intro-features {
            margin-bottom: 40px;

            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;

                .feature-card {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    transition: transform 0.3s ease;

                    &:hover {
                        transform: translateY(-5px);
                    }

                    .feature-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(135deg, #007bff, #0056b3);
                        color: white;
                        border-radius: 50%;
                        margin-bottom: 20px;
                        font-size: 24px;
                    }

                    .feature-content {
                        .feature-title {
                            font-size: 20px;
                            font-weight: 600;
                            margin-bottom: 12px;
                            color: #333;
                        }

                        .feature-description {
                            font-size: 16px;
                            line-height: 1.5;
                            color: #666;
                        }
                    }
                }
            }
        }

        .intro-navigation {
            text-align: center;

            .nav-buttons {
                display: flex;
                gap: 16px;
                justify-content: center;
                flex-wrap: wrap;

                .nav-button {
                    padding: 16px 32px;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    min-width: 140px;

                    &.primary {
                        background: #007bff;
                        color: white;

                        &:hover {
                            background: #0056b3;
                            transform: translateY(-2px);
                        }
                    }

                    &.secondary {
                        background: transparent;
                        color: #666;
                        border: 2px solid #e0e0e0;

                        &:hover {
                            background: #f8f9fa;
                            border-color: #007bff;
                            color: #007bff;
                        }
                    }
                }
            }
        }
    }

    // Variant styles
    &.variant-centered {
        .intro-container {

            .intro-header,
            .intro-description {
                text-align: center;
            }

            .intro-features .features-grid {
                justify-items: center;
            }
        }
    }

    &.variant-minimal {
        padding: 40px 0;

        .intro-container {
            .intro-header .intro-title {
                font-size: 36px;
            }

            .intro-features {
                margin-bottom: 30px;

                .features-grid {
                    gap: 20px;

                    .feature-card {
                        padding: 20px;

                        .feature-icon {
                            width: 40px;
                            height: 40px;
                            font-size: 18px;
                            margin-bottom: 15px;
                        }
                    }
                }
            }
        }
    }

    &.variant-hero {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;

        .intro-container {
            .intro-header {
                .intro-title {
                    color: white;
                }

                .intro-subtitle {
                    color: rgba(255, 255, 255, 0.9);
                }
            }

            .intro-description :deep(p) {
                color: rgba(255, 255, 255, 0.9);
            }

            .intro-features .features-grid .feature-card {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);

                .feature-content {
                    .feature-title {
                        color: white;
                    }

                    .feature-description {
                        color: rgba(255, 255, 255, 0.8);
                    }
                }
            }
        }
    }

    // Responsive design
    @media (max-width: 768px) {
        padding: 40px 0;

        .intro-container {
            padding: 0 15px;

            .intro-features .features-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .intro-navigation .nav-buttons {
                flex-direction: column;
                align-items: center;

                .nav-button {
                    width: 100%;
                    max-width: 300px;
                }
            }
        }
    }
}
</style>