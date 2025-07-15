<template>
  <nav class="pagination" :class="paginationClass" v-if="totalPages > 1">
    <div class="pagination-container">
      <!-- Previous button -->
      <button class="pagination-button prev" @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1"
        :aria-label="prevLabel">
        <Icon name="arrow-left" />
        <span class="button-text">
          <String :string="prevText" />
        </span>
      </button>

      <!-- Page numbers -->
      <div class="page-numbers">
        <button v-for="page in visiblePages" :key="page" class="page-button" :class="{ 'active': page === currentPage }"
          @click="goToPage(page)" :aria-label="`Go to page ${page}`">
          {{ page }}
        </button>

        <!-- Ellipsis -->
        <span v-if="showStartEllipsis" class="ellipsis">...</span>
        <span v-if="showEndEllipsis" class="ellipsis">...</span>
      </div>

      <!-- Next button -->
      <button class="pagination-button next" @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages"
        :aria-label="nextLabel">
        <span class="button-text">
          <String :string="nextText" />
        </span>
        <Icon name="arrow-right" />
      </button>
    </div>

    <!-- Page info -->
    <div v-if="showPageInfo" class="page-info">
      <String :string="pageInfoText" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Pagination Component
 * 
 * Core Functions:
 * - Displays pagination controls for content navigation
 * - Handles page navigation and state management
 * - Provides accessible navigation controls
 * - Supports different pagination styles
 * 
 * Performance Optimizations:
 * - Efficient page number calculation
 * - Optimized button rendering
 * - Responsive design implementation
 */

// Props definition with TypeScript
interface Props {
  currentPage: number
  totalPages: number
  totalItems?: number
  itemsPerPage?: number
  maxVisiblePages?: number
  showPageInfo?: boolean
  variant?: 'default' | 'minimal' | 'compact'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  totalItems: 0,
  itemsPerPage: 10,
  maxVisiblePages: 5,
  showPageInfo: true,
  variant: 'default',
  className: ''
})

// Emits definition
const emit = defineEmits<{
  'page-change': [page: number]
}>()

// Computed properties
const paginationClass = computed(() => {
  const classes = ['pagination']

  if (props.className) {
    classes.push(props.className)
  }

  if (props.variant) {
    classes.push(`variant-${props.variant}`)
  }

  return classes.join(' ')
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = props.maxVisiblePages
  const current = props.currentPage
  const total = props.totalPages

  if (total <= maxVisible) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Calculate range of visible pages
    let start = Math.max(1, current - Math.floor(maxVisible / 2))
    let end = Math.min(total, start + maxVisible - 1)

    // Adjust start if end is at the limit
    if (end === total) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})

const showStartEllipsis = computed(() => {
  return visiblePages.value[0] > 1
})

const showEndEllipsis = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < props.totalPages
})

// Localized texts
const prevText = computed(() => ({
  en: 'Previous',
  uk: 'Попередня',
  es: 'Anterior',
  he: 'הקודם'
}))

const nextText = computed(() => ({
  en: 'Next',
  uk: 'Наступна',
  es: 'Siguiente',
  he: 'הבא'
}))

const prevLabel = computed(() => {
  const labels: Record<string, string> = {
    en: 'Go to previous page',
    uk: 'Перейти на попередню сторінку',
    es: 'Ir a la página anterior',
    he: 'עבור לעמוד הקודם'
  }
  return labels[useLocalization().activeLanguage.value] || labels.en
})

const nextLabel = computed(() => {
  const labels: Record<string, string> = {
    en: 'Go to next page',
    uk: 'Перейти на наступну сторінку',
    es: 'Ir a la página siguiente',
    he: 'עבור לעמוד הבא'
  }
  return labels[useLocalization().activeLanguage.value] || labels.en
})

const pageInfoText = computed(() => {
  const start = (props.currentPage - 1) * props.itemsPerPage + 1
  const end = Math.min(props.currentPage * props.itemsPerPage, props.totalItems)

  const templates: Record<string, string> = {
    en: `Showing ${start}-${end} of ${props.totalItems} items`,
    uk: `Показано ${start}-${end} з ${props.totalItems} елементів`,
    es: `Mostrando ${start}-${end} de ${props.totalItems} elementos`,
    he: `מציג ${start}-${end} מתוך ${props.totalItems} פריטים`
  }

  return templates[useLocalization().activeLanguage.value] || templates.en
})

// Event handlers
const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 40px 0;

  .pagination-container {
    display: flex;
    align-items: center;
    gap: 8px;

    .pagination-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border: 1px solid #e0e0e0;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
      font-weight: 500;

      &:hover:not(:disabled) {
        background: #f8f9fa;
        border-color: #007bff;
        color: #007bff;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .button-text {
        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    .page-numbers {
      display: flex;
      align-items: center;
      gap: 4px;

      .page-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border: 1px solid #e0e0e0;
        background: white;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;
        font-weight: 500;

        &:hover:not(.active) {
          background: #f8f9fa;
          border-color: #007bff;
          color: #007bff;
        }

        &.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }
      }

      .ellipsis {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        color: #666;
        font-size: 14px;
      }
    }
  }

  .page-info {
    font-size: 14px;
    color: #666;
    text-align: center;
  }

  // Variant styles
  &.variant-minimal {
    .pagination-container {
      .pagination-button {
        padding: 8px 12px;
        font-size: 13px;
      }

      .page-numbers .page-button {
        width: 36px;
        height: 36px;
        font-size: 13px;
      }
    }
  }

  &.variant-compact {
    .pagination-container {
      gap: 4px;

      .pagination-button {
        padding: 8px 12px;
        font-size: 12px;
      }

      .page-numbers {
        gap: 2px;

        .page-button {
          width: 32px;
          height: 32px;
          font-size: 12px;
        }

        .ellipsis {
          width: 32px;
          height: 32px;
          font-size: 12px;
        }
      }
    }

    .page-info {
      font-size: 12px;
    }
  }

  // Responsive design
  @media (max-width: 768px) {
    margin: 30px 0;

    .pagination-container {
      gap: 6px;

      .pagination-button {
        padding: 10px 12px;
        font-size: 13px;
      }

      .page-numbers {
        gap: 3px;

        .page-button {
          width: 36px;
          height: 36px;
          font-size: 13px;
        }

        .ellipsis {
          width: 36px;
          height: 36px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>