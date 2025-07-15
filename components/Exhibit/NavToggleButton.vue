<template>
    <button class="nav-toggle-button" :class="{ 'active': isActive }" @click="toggleMenu" :aria-label="ariaLabel"
        :aria-expanded="isActive">
        <div class="hamburger-icon">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
        </div>
    </button>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

/**
 * NavToggleButton Component
 * 
 * Core Functions:
 * - Provides hamburger menu toggle for mobile navigation
 * - Handles accessibility attributes
 * - Emits toggle events to parent components
 * - Provides smooth animation transitions
 * 
 * Performance Optimizations:
 * - Efficient click handling
 * - Optimized CSS animations
 * - Proper accessibility support
 */

// Props definition with TypeScript
interface Props {
    isOpen?: boolean
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    isOpen: false,
    className: ''
})

// Emits definition
const emit = defineEmits<{
    toggle: [value: boolean]
}>()

// Reactive state
const isActive = ref(props.isOpen)

// Generate aria label based on state
const ariaLabel = computed(() => {
    return isActive.value ? 'Close navigation menu' : 'Open navigation menu'
})

// Toggle menu state
const toggleMenu = () => {
    isActive.value = !isActive.value
    emit('toggle', isActive.value)
}

// Watch for prop changes
watch(() => props.isOpen, (newValue: boolean) => {
    isActive.value = newValue
})
</script>

<style lang="scss" scoped>
.nav-toggle-button {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.8;
    }

    &:focus {
        outline: 2px solid #007bff;
        outline-offset: 2px;
    }

    .hamburger-icon {
        position: relative;
        width: 24px;
        height: 18px;

        .line {
            position: absolute;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #333;
            transition: all 0.3s ease;
            transform-origin: center;

            &.line-1 {
                top: 0;
            }

            &.line-2 {
                top: 8px;
            }

            &.line-3 {
                top: 16px;
            }
        }
    }

    // Active state animations
    &.active {
        .hamburger-icon {
            .line-1 {
                transform: rotate(45deg) translate(6px, 6px);
            }

            .line-2 {
                opacity: 0;
                transform: scaleX(0);
            }

            .line-3 {
                transform: rotate(-45deg) translate(6px, -6px);
            }
        }
    }

    // Show on mobile devices
    @media (max-width: 768px) {
        display: flex;
    }
}
</style>
