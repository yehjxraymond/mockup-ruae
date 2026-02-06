<template>
  <div class="flex flex-wrap gap-2">
    <button
      class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
      :class="
        activeTag === null
          ? 'text-rently-purple border-b-2 border-rently-teal bg-rently-purple/5'
          : 'text-gray-600 hover:text-rently-purple hover:bg-gray-100'
      "
      @click="$emit('tagChange', null)"
    >
      Latest
    </button>
    <button
      v-for="tag in HIGHLIGHTED_TAGS"
      :key="tag.value"
      class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
      :class="
        activeTag === tag.value
          ? 'text-rently-purple border-b-2 border-rently-teal bg-rently-purple/5'
          : 'text-gray-600 hover:text-rently-purple hover:bg-gray-100'
      "
      :title="tag.description"
      @click="$emit('tagChange', tag.value)"
    >
      {{ tag.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { HIGHLIGHTED_TAGS } from '~/utils/blog/config'

defineProps<{
  activeTag: string | null
}>()

defineEmits<{
  tagChange: [tag: string | null]
}>()
</script>
