<template>
    <main ref="contentRef" class="content">
        <StoryTitle :subjectId="subjectId" :sectionId="sectionId" />
        <div v-for="item in content" :key="item._key" class="row section gsap-fade-in"
            :class="{ dark: item._type === 'contentImgFull' }">
            <ContentImageText v-if="item._type === 'contentImgText'" :content="item" />
            <ContentImageFull v-else-if="item._type === 'contentImgFull'" :content="item" />
            <ContentText v-else-if="item._type === 'contentText'" :content="item" />
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


const props = defineProps<{
    subjectId: string
    sectionId: string
    content: any
}>()

const contentRef = ref<HTMLElement | null>(null)


// Animation function
function setAnim() {
    const sections = contentRef.value.querySelectorAll<HTMLElement>('.section')
    if (!sections.length) return

    sections.forEach((panel, i) => {
        gsap.set(panel, {
            autoAlpha: 0,
            y: 150,
        })

        if (i === 0) {
            gsap.to(panel, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
            })
        } else {
            gsap.to(panel, {
                autoAlpha: 1,
                y: 0,
                scrollTrigger: {
                    trigger: panel,
                    start: 'top+=150px bottom',
                    end: '+=300px',
                    scrub: 1.1,
                },
            })
        }
    })
}

onMounted(() => {
    setAnim();
})
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