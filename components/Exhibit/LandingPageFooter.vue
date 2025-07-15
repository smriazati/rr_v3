<template>
    <footer class="landing-page-footer" :class="footerClass">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <Logo />
                    </div>
                    <div class="footer-description">
                        <String :string="description" />
                    </div>
                </div>

                <div class="footer-section">
                    <h3 class="footer-title">
                        <String :string="title" />
                    </h3>
                    <div class="footer-links">
                        <ul class="links-list">
                            <li v-for="link in footerLinks" :key="link.id" class="link-item">
                                <NuxtLink :to="link.path" class="footer-link">
                                    <String :string="link.label" />
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="footer-section">
                    <h3 class="footer-title">
                        <String :string="contactTitle" />
                    </h3>
                    <div class="contact-info">
                        <p v-if="contactEmail" class="contact-item">
                            <a :href="`mailto:${contactEmail}`" class="contact-link">
                                {{ contactEmail }}
                            </a>
                        </p>
                        <p v-if="contactPhone" class="contact-item">
                            <a :href="`tel:${contactPhone}`" class="contact-link">
                                {{ contactPhone }}
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="copyright">
                    <String :string="copyright" />
                </div>
                <div class="footer-actions">
                    <LanguagePicker />
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * LandingPageFooter Component
 * 
 * Core Functions:
 * - Displays comprehensive footer for landing pages
 * - Handles localized footer content from Sanity
 * - Provides navigation links and contact information
 * - Integrates language picker and logo
 * 
 * Performance Optimizations:
 * - Efficient content rendering
 * - Optimized link handling
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
    description?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    contactTitle?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    contactEmail?: string
    contactPhone?: string
    copyright?: {
        en?: string
        uk?: string
        es?: string
        he?: string
    }
    links?: Array<{
        id: string
        path: string
        label: {
            en?: string
            uk?: string
            es?: string
            he?: string
        }
    }>
    variant?: 'default' | 'dark' | 'minimal'
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    className: '',
    links: () => []
})

// Default footer links
const defaultLinks = [
    {
        id: 'intro',
        path: '/intro',
        label: {
            en: 'Introduction',
            uk: 'Вступ',
            es: 'Introducción',
            he: 'הקדמה'
        }
    },
    {
        id: 'occupation',
        path: '/occupation',
        label: {
            en: 'Occupation',
            uk: 'Окупація',
            es: 'Ocupación',
            he: 'כיבוש'
        }
    },
    {
        id: 'resistance',
        path: '/resistance',
        label: {
            en: 'Resistance',
            uk: 'Опір',
            es: 'Resistencia',
            he: 'התנגדות'
        }
    },
    {
        id: 'aftermath',
        path: '/aftermath',
        label: {
            en: 'Aftermath',
            uk: 'Наслідки',
            es: 'Consecuencias',
            he: 'השלכות'
        }
    }
]

// Use provided links or defaults
const footerLinks = computed(() => {
    return props.links.length > 0 ? props.links : defaultLinks
})

// Generate footer classes
const footerClass = computed(() => {
    const classes = ['landing-page-footer']

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
.landing-page-footer {
    background: #f8f9fa;
    padding: 60px 0 30px;
    margin-top: 80px;

    .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-bottom: 40px;

            .footer-section {
                .footer-logo {
                    margin-bottom: 20px;
                }

                .footer-description {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #666;
                    margin-bottom: 20px;
                }

                .footer-title {
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    color: #333;
                }

                .footer-links {
                    .links-list {
                        list-style: none;
                        margin: 0;
                        padding: 0;

                        .link-item {
                            margin-bottom: 12px;

                            .footer-link {
                                text-decoration: none;
                                color: #666;
                                font-size: 16px;
                                transition: color 0.3s ease;

                                &:hover {
                                    color: #333;
                                }
                            }
                        }
                    }
                }

                .contact-info {
                    .contact-item {
                        margin-bottom: 12px;

                        .contact-link {
                            text-decoration: none;
                            color: #666;
                            font-size: 16px;
                            transition: color 0.3s ease;

                            &:hover {
                                color: #333;
                            }
                        }
                    }
                }
            }
        }

        .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 30px;
            border-top: 1px solid #e9ecef;

            .copyright {
                font-size: 14px;
                color: #999;
            }

            .footer-actions {
                display: flex;
                align-items: center;
                gap: 20px;
            }
        }
    }

    // Variant styles
    &.variant-dark {
        background: #333;
        color: white;

        .footer-container {
            .footer-content {
                .footer-section {
                    .footer-title {
                        color: white;
                    }

                    .footer-description,
                    .footer-links .links-list .link-item .footer-link,
                    .contact-info .contact-item .contact-link {
                        color: #ccc;

                        &:hover {
                            color: white;
                        }
                    }
                }
            }

            .footer-bottom {
                border-top-color: #555;

                .copyright {
                    color: #ccc;
                }
            }
        }
    }

    &.variant-minimal {
        background: transparent;
        padding: 40px 0 20px;

        .footer-container {
            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 20px;
            }

            .footer-bottom {
                justify-content: center;
                flex-direction: column;
                gap: 20px;
            }
        }
    }

    // Responsive design
    @media (max-width: 768px) {
        padding: 40px 0 20px;

        .footer-container {
            .footer-content {
                grid-template-columns: 1fr;
                gap: 30px;
            }

            .footer-bottom {
                flex-direction: column;
                gap: 20px;
                text-align: center;
            }
        }
    }
}
</style>