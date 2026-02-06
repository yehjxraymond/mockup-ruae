<template>
  <nav v-if="totalPages > 1" class="flex justify-center items-center gap-1" aria-label="Pagination">
    <!-- Previous -->
    <button
      :disabled="currentPage <= 1"
      class="px-3 py-2 text-sm rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      @click="$emit('pageChange', currentPage - 1)"
    >
      <Icon name="heroicons:chevron-left" class="w-5 h-5" />
    </button>

    <!-- Page numbers -->
    <template v-for="page in visiblePages" :key="page">
      <span v-if="page === '...'" class="px-2 py-2 text-sm text-gray-400">...</span>
      <button
        v-else
        class="px-3 py-2 text-sm rounded-lg transition-colors min-w-[40px]"
        :class="
          page === currentPage
            ? 'bg-rently-purple text-white'
            : 'text-gray-700 hover:bg-gray-100'
        "
        @click="$emit('pageChange', page as number)"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next -->
    <button
      :disabled="currentPage >= totalPages"
      class="px-3 py-2 text-sm rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      @click="$emit('pageChange', currentPage + 1)"
    >
      <Icon name="heroicons:chevron-right" class="w-5 h-5" />
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  pageChange: [page: number]
}>()

const isMobile = ref(false)

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 640
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
  onUnmounted(() => window.removeEventListener('resize', checkMobile))
})

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const delta = isMobile.value ? 1 : 2
  const pages: (number | string)[] = []

  const rangeStart = Math.max(2, current - delta)
  const rangeEnd = Math.min(total - 1, current + delta)

  // Always show first page
  pages.push(1)

  // Ellipsis after first page
  if (rangeStart > 2) {
    pages.push('...')
  }

  // Middle pages
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  // Ellipsis before last page
  if (rangeEnd < total - 1) {
    pages.push('...')
  }

  // Always show last page
  if (total > 1) {
    pages.push(total)
  }

  return pages
})
</script>
