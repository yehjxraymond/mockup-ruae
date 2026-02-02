<template>
  <div class="min-h-screen bg-white">
    <!-- Article Header -->
    <div class="bg-gradient-to-br from-rently-purple to-rently-teal">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
        >
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
          Back to Blog
        </NuxtLink>

        <div class="flex items-center gap-2 mb-4">
          <span class="text-sm font-semibold text-white bg-white/20 px-3 py-1 rounded-full">
            {{ article.category }}
          </span>
          <span class="text-sm text-white/80">{{ article.date }}</span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          {{ article.title }}
        </h1>

        <p class="text-xl text-white/90">
          {{ article.excerpt }}
        </p>
      </div>
    </div>

    <!-- Article Content -->
    <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="prose prose-lg max-w-none">
        <p>
          {{ article.content }}
        </p>

        <h2>Why Choose Flexible Payment Options?</h2>
        <p>
          Traditional rental payment structures often require large upfront costs that can be difficult to manage.
          With flexible payment options like those offered by Rently, you can:
        </p>

        <ul>
          <li>Preserve your savings for emergencies and investments</li>
          <li>Access better properties that might have been out of reach</li>
          <li>Improve your cash flow and financial planning</li>
          <li>Move into your new home immediately without delay</li>
        </ul>

        <h2>How It Works</h2>
        <p>
          The process is simple and straightforward. Here's what you need to do:
        </p>

        <ol>
          <li>Find the property you want to rent</li>
          <li>Apply for Rently's flexible payment plan</li>
          <li>Get approved within minutes</li>
          <li>Move in and pay monthly instead of upfront</li>
        </ol>

        <h2>Benefits for Renters</h2>
        <p>
          Flexible rental payments offer numerous advantages for modern renters who value financial flexibility
          and want to maintain control over their budget. Whether you're a young professional, a family, or
          relocating for work, these payment structures can make your life easier.
        </p>

        <blockquote>
          <p>
            "Rently transformed the way I rent. Instead of draining my savings, I can now manage my finances
            better while living in the perfect apartment." - Sarah M., Dubai
          </p>
        </blockquote>

        <h2>Getting Started</h2>
        <p>
          Ready to experience the benefits of flexible rental payments? The application process takes just
          a few minutes, and you'll know if you're approved almost instantly. Start your journey to smarter
          renting today.
        </p>
      </div>

      <!-- CTA -->
      <div class="mt-12 p-8 bg-gradient-to-br from-rently-purple/10 to-rently-teal/10 rounded-2xl text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-gray-600 mb-6">Join thousands of renters who are already enjoying flexible payments</p>
        <NuxtLink
          to="/#apply"
          class="inline-block px-8 py-4 bg-rently-gradient text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
        >
          Apply Now
        </NuxtLink>
      </div>
    </article>

    <!-- Related Articles -->
    <div class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="related in relatedArticles"
            :key="related.slug"
            :to="`/blog/${related.slug}`"
            class="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <span class="text-xs font-semibold text-rently-purple bg-rently-purple/10 px-3 py-1 rounded-full">
              {{ related.category }}
            </span>
            <h4 class="text-lg font-semibold text-gray-900 mt-3 mb-2">{{ related.title }}</h4>
            <p class="text-gray-600 text-sm">{{ related.excerpt }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SEO_DEFAULTS } from '~/utils/seo/constants'

const route = useRoute()
const slug = route.params.slug as string

// Sample article data
const article = ref({
  slug: slug,
  title: 'How to Rent Without a Large Deposit',
  excerpt: 'Learn how flexible payment options can help you move into your dream home without breaking the bank.',
  category: 'Tips & Advice',
  date: '2 Feb 2026',
  dateISO: '2026-02-02',
  content: `
    Moving into a new home is exciting, but the financial burden of large upfront deposits can be overwhelming.
    In this comprehensive guide, we'll explore how modern rental payment solutions are changing the game for
    renters across the UAE and beyond.
  `
})

const relatedArticles = [
  {
    slug: 'dubai-rental-market-2026',
    title: 'Dubai Rental Market Trends in 2026',
    excerpt: 'An in-depth look at the current state of the Dubai rental market.',
    category: 'Market Insights',
  },
  {
    slug: 'first-time-renters-guide',
    title: 'First Time Renter\'s Guide to UAE',
    excerpt: 'Everything you need to know as a first-time renter in the UAE.',
    category: 'Guides',
  },
  {
    slug: 'managing-monthly-rent-payments',
    title: 'Managing Your Monthly Rent Payments',
    excerpt: 'Tips and strategies for staying on top of your rental payments.',
    category: 'Finance',
  },
]

const articleUrl = `${SEO_DEFAULTS.siteUrl}/blog/${slug}`

useSEO({
  title: article.value.title,
  description: article.value.excerpt,
  type: 'article',
  publishedTime: article.value.dateISO,
  section: article.value.category,
})

useArticleSchema({
  title: article.value.title,
  description: article.value.excerpt,
  url: articleUrl,
  datePublished: article.value.dateISO,
  section: article.value.category,
})

useBreadcrumbSchema([
  { name: 'Home', url: SEO_DEFAULTS.siteUrl },
  { name: 'Blog', url: `${SEO_DEFAULTS.siteUrl}/blog` },
  { name: article.value.title, url: articleUrl },
])
</script>

<style scoped>
.prose {
  @apply text-gray-700;
}

.prose h2 {
  @apply text-3xl font-bold text-gray-900 mt-8 mb-4;
}

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose ul,
.prose ol {
  @apply mb-4 ml-6;
}

.prose li {
  @apply mb-2;
}

.prose blockquote {
  @apply border-l-4 border-rently-purple pl-4 italic text-gray-600 my-6;
}
</style>
