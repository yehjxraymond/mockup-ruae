<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-br from-rently-purple to-rently-teal">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
          Rently Blog
        </h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          Insights, tips, and news about renting, real estate, and personal finance
        </p>
      </div>
    </div>

    <!-- Blog Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Search Bar -->
      <div class="mb-8">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search articles..."
          class="w-full max-w-2xl mx-auto block px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rently-purple focus:border-transparent"
        />
      </div>

      <!-- Blog Posts -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="post in filteredPosts"
          :key="post.slug"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <NuxtLink :to="`/blog/${post.slug}`">
            <div class="aspect-video bg-gradient-to-br from-rently-purple/20 to-rently-teal/20 flex items-center justify-center">
              <Icon name="heroicons:document-text" class="w-16 h-16 text-rently-purple" />
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-semibold text-rently-purple bg-rently-purple/10 px-3 py-1 rounded-full">
                  {{ post.category }}
                </span>
                <span class="text-xs text-gray-500">{{ post.date }}</span>
              </div>
              <h2 class="text-xl font-bold text-gray-900 mb-2 hover:text-rently-purple transition-colors">
                {{ post.title }}
              </h2>
              <p class="text-gray-600 text-sm">
                {{ post.excerpt }}
              </p>
            </div>
          </NuxtLink>
        </article>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPosts.length === 0" class="text-center py-12">
        <Icon name="heroicons:magnifying-glass" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-600 text-lg">No articles found matching your search.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SEO_DEFAULTS } from '~/utils/seo/constants'

useSEO({
  title: 'Renting Tips, Market Insights & Guides',
  description: 'Read the latest insights, tips, and news about renting, real estate, and personal finance in the UAE from Rently.',
  keywords: ['UAE rental', 'Dubai rent', 'renting tips', 'real estate UAE', 'property rental'],
})

useBreadcrumbSchema([
  { name: 'Home', url: SEO_DEFAULTS.siteUrl },
  { name: 'Blog', url: `${SEO_DEFAULTS.siteUrl}/blog` },
])

const searchQuery = ref('')

// Sample blog posts
const posts = ref([
  {
    slug: 'how-to-rent-without-deposit',
    title: 'How to Rent Without a Large Deposit',
    excerpt: 'Learn how flexible payment options can help you move into your dream home without breaking the bank.',
    category: 'Tips & Advice',
    date: '2 Feb 2026',
  },
  {
    slug: 'dubai-rental-market-2026',
    title: 'Dubai Rental Market Trends in 2026',
    excerpt: 'An in-depth look at the current state of the Dubai rental market and what to expect.',
    category: 'Market Insights',
    date: '28 Jan 2026',
  },
  {
    slug: 'first-time-renters-guide',
    title: 'First Time Renter\'s Guide to UAE',
    excerpt: 'Everything you need to know as a first-time renter in the United Arab Emirates.',
    category: 'Guides',
    date: '25 Jan 2026',
  },
  {
    slug: 'managing-monthly-rent-payments',
    title: 'Managing Your Monthly Rent Payments',
    excerpt: 'Tips and strategies for staying on top of your monthly rental payments.',
    category: 'Finance',
    date: '22 Jan 2026',
  },
  {
    slug: 'choosing-right-neighborhood',
    title: 'Choosing the Right Neighborhood in Dubai',
    excerpt: 'A comprehensive guide to Dubai\'s most popular residential areas.',
    category: 'Location',
    date: '18 Jan 2026',
  },
  {
    slug: 'rental-contract-tips',
    title: '10 Things to Check in Your Rental Contract',
    excerpt: 'Important clauses and terms to look for before signing your rental agreement.',
    category: 'Legal',
    date: '15 Jan 2026',
  },
])

const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value

  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query) ||
    post.category.toLowerCase().includes(query)
  )
})
</script>
