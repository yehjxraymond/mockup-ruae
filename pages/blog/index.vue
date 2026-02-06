<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-rently-purple">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
          Renting in the UAE
        </h1>
        <p class="text-xl text-white/90">
          Your go-to resource for everything related to renting in the United Arab Emirates with the latest data and updates on evolving laws.
        </p>
      </div>
    </div>

    <!-- Blog Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Tag Filter -->
      <div class="mb-8">
        <BlogTagFilter :active-tag="currentTag" @tag-change="onTagChange" />
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-rently-purple border-t-transparent" />
      </div>

      <!-- Blog Posts -->
      <template v-else-if="data && data.posts.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogPostCard
            v-for="post in data.posts"
            :key="post.id"
            :post="post"
          />
        </div>

        <!-- Pagination -->
        <div class="mt-12">
          <BlogPagination
            :current-page="currentPage"
            :total-pages="data.pagination.totalPages"
            @page-change="onPageChange"
          />
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <Icon name="heroicons:document-text" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-600 text-lg">No articles found.</p>
        <button
          v-if="currentTag"
          class="mt-4 text-rently-purple hover:underline"
          @click="onTagChange(null)"
        >
          View all articles
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SEO_DEFAULTS } from '~/utils/seo/constants'
import { wisp } from '~/utils/blog/wisp'
import { POSTS_PER_PAGE } from '~/utils/blog/config'

useSEO({
  title: 'Renting Tips, Market Insights & Guides',
  description: 'Read the latest insights, tips, and news about renting, real estate, and personal finance in the UAE from Rently.',
  keywords: ['UAE rental', 'Dubai rent', 'renting tips', 'real estate UAE', 'property rental'],
})

useBreadcrumbSchema([
  { name: 'Home', url: SEO_DEFAULTS.siteUrl },
  { name: 'Blog', url: `${SEO_DEFAULTS.siteUrl}/blog` },
])

const route = useRoute()
const router = useRouter()

const currentTag = computed(() => {
  const tag = route.query.tag
  return typeof tag === 'string' ? tag : null
})

const currentPage = computed(() => {
  const page = Number(route.query.page)
  return page > 0 ? page : 1
})

const { data, pending } = useAsyncData(
  () => `blog-posts-${currentTag.value}-${currentPage.value}`,
  () =>
    wisp.getPosts({
      page: currentPage.value,
      limit: POSTS_PER_PAGE,
      ...(currentTag.value ? { tags: [currentTag.value] } : {}),
    }),
  {
    watch: [currentTag, currentPage],
  }
)

const onTagChange = (tag: string | null) => {
  const query: Record<string, string> = {}
  if (tag) query.tag = tag
  router.push({ path: '/blog', query })
}

const onPageChange = (page: number) => {
  const query: Record<string, string> = {}
  if (currentTag.value) query.tag = currentTag.value
  if (page > 1) query.page = String(page)
  router.push({ path: '/blog', query })
}
</script>
