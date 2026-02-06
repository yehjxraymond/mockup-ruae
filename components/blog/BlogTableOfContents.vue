<template>
  <nav v-if="items.length > 0" class="sticky top-8">
    <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
      Table of Contents
    </h3>
    <ul class="space-y-2 border-l-2 border-gray-200">
      <li
        v-for="item in items"
        :key="item.id"
        :style="{ paddingLeft: `${(item.level - 1) * 12}px` }"
      >
        <a
          :href="`#${item.id}`"
          class="block py-1 pl-4 text-sm border-l-2 -ml-[2px] transition-colors"
          :class="
            activeId === item.id
              ? 'border-rently-teal text-rently-purple font-medium'
              : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
          "
          @click.prevent="scrollTo(item.id)"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface TOCItem {
  id: string
  text: string
  level: number
}

defineProps<{
  items: TOCItem[]
}>()

const activeId = ref('')

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    {
      rootMargin: '-120px 0px -60% 0px',
      threshold: 0,
    }
  )

  const headings = document.querySelectorAll('article h1[id], article h2[id], article h3[id], article h4[id]')
  headings.forEach((heading) => observer.observe(heading))

  onUnmounted(() => observer.disconnect())
})
</script>
