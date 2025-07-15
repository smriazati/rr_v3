<template>
  <nav class="exhibit-nav" :class="navClass">
    <div class="nav-container">
      <div class="nav-brand">
        <Logo />
      </div>

      <div class="nav-menu">
        <ul class="nav-list">
          <li v-for="item in navItems" :key="item.id" class="nav-item">
            <NuxtLink :to="item.path" class="nav-link" :class="{ 'active': isActive(item.path) }">
              <String :string="item.label" />
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="nav-actions">
        <LanguagePicker />
        <NavToggleButton @toggle="toggleMobileMenu" />
      </div>
    </div>

    <!-- Mobile menu overlay -->
    <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu">
      <div class="mobile-menu" @click.stop>
        <ul class="mobile-nav-list">
          <li v-for="item in navItems" :key="item.id" class="mobile-nav-item">
            <NuxtLink :to="item.path" class="mobile-nav-link" :class="{ 'active': isActive(item.path) }"
              @click="closeMobileMenu">
              <String :string="item.label" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Exhibit Navigation Component
 * 
 * Core Functions:
 * - Displays main navigation for the exhibit
 * - Handles mobile menu toggle and responsive design
 * - Manages active navigation states
 * - Integrates language picker and logo
 * 
 * Performance Optimizations:
 * - Efficient route matching for active states
 * - Optimized mobile menu interactions
 * - Proper event cleanup
 */

// Props definition with TypeScript
interface Props {
  className?: string
  variant?: 'default' | 'transparent' | 'solid'
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  variant: 'default'
})

// Router for navigation
const route = useRoute()

// Reactive state
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

// Navigation items configuration
const navItems = [
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
  },
  {
    id: 'conclusion',
    path: '/conclusion',
    label: {
      en: 'Conclusion',
      uk: 'Висновок',
      es: 'Conclusión',
      he: 'סיכום'
    }
  }
]

// Generate navigation classes
const navClass = computed(() => {
  const classes = ['exhibit-nav']

  if (props.className) {
    classes.push(props.className)
  }

  if (props.variant) {
    classes.push(`variant-${props.variant}`)
  }

  if (isScrolled.value) {
    classes.push('scrolled')
  }

  if (isMobileMenuOpen.value) {
    classes.push('mobile-open')
  }

  return classes.join(' ')
})

// Check if navigation item is active
const isActive = (path: string) => {
  return route.path.startsWith(path)
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Handle scroll events
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Initialize component
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('keydown', handleKeydown)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
.exhibit-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 70px;

    .nav-brand {
      flex-shrink: 0;
    }

    .nav-menu {
      display: flex;
      align-items: center;

      .nav-list {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 30px;

        .nav-item {
          .nav-link {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            font-size: 16px;
            transition: color 0.3s ease;

            &:hover {
              color: #666;
            }

            &.active {
              color: #000;
              font-weight: 600;
            }
          }
        }
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 15px;
    }
  }

  // Mobile menu overlay
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1001;

    .mobile-menu {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      background: white;
      padding: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

      .mobile-nav-list {
        list-style: none;
        margin: 0;
        padding: 0;

        .mobile-nav-item {
          border-bottom: 1px solid #eee;

          &:last-child {
            border-bottom: none;
          }

          .mobile-nav-link {
            display: block;
            padding: 15px 0;
            text-decoration: none;
            color: #333;
            font-size: 18px;
            font-weight: 500;

            &.active {
              color: #000;
              font-weight: 600;
            }
          }
        }
      }
    }
  }

  // Responsive design
  @media (max-width: 768px) {
    .nav-container {
      .nav-menu {
        display: none;
      }
    }
  }

  // Variant styles
  &.variant-transparent {
    background: transparent;

    &.scrolled {
      background: rgba(255, 255, 255, 0.95);
    }
  }

  &.variant-solid {
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
