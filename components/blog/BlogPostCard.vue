<template>
  <article class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    <NuxtLink :to="`/blog/${post.slug}`">
      <div class="aspect-video overflow-hidden">
        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          v-else
          class="w-full h-full bg-gradient-to-br from-rently-purple/20 to-rently-teal/20 flex items-center justify-center"
        >
          <Icon name="heroicons:document-text" class="w-16 h-16 text-rently-purple" />
        </div>
      </div>
    </NuxtLink>

    <div class="p-6">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <NuxtLink
          v-for="tag in post.tags"
          :key="tag.id"
          :to="{ path: '/blog', query: { tag: tag.name } }"
          class="text-xs font-semibold text-rently-purple bg-rently-purple/10 px-3 py-1 rounded-full hover:bg-rently-purple/20 transition-colors"
        >
          {{ tag.name }}
        </NuxtLink>
        <span class="text-xs text-gray-500">{{ formattedDate }}</span>
      </div>

      <NuxtLink :to="`/blog/${post.slug}`">
        <h2 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-rently-purple transition-colors">
          {{ post.title }}
        </h2>
      </NuxtLink>

      <p class="text-gray-600 text-sm line-clamp-3">
        {{ post.description }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Tag {
  id: string
  name: string
}

interface Post {
  slug: string
  title: string
  description: string | null
  image: string | null
  publishedAt: Date | null
  tags: Tag[]
}

const props = defineProps<{
  post: Post
}>()

const formattedDate = computed(() => {
  if (!props.post.publishedAt) return ''
  return new Date(props.post.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
})
</script>
