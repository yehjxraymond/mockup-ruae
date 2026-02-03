<template>
  <div>
    <UsesPageContent v-if="pageData" :data="pageData" />

    <!-- 404 fallback -->
    <div v-else class="min-h-screen bg-white flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p class="text-gray-600 mb-8">The use case you're looking for doesn't exist.</p>
        <NuxtLink
          to="/uses"
          class="px-6 py-3 bg-rently-purple text-white font-semibold rounded-full hover:bg-rently-purple/90 transition-all"
        >
          View All Use Cases
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUseCaseData } from '~/utils/uses/use-case-data'
import { SEO_DEFAULTS } from '~/utils/seo/constants'
import { useUseCaseSchema } from '~/composables/useUseCaseSchema'

const route = useRoute()
const slug = route.params.slug as string

const pageData = getUseCaseData(slug)

if (pageData) {
  const pageUrl = `${SEO_DEFAULTS.siteUrl}/uses/${slug}`

  useSEO({
    title: pageData.seo.title,
    description: pageData.seo.description,
    keywords: [pageData.meta.keyword, 'rent payment', 'UAE', 'Dubai'],
  })

  useBreadcrumbSchema([
    { name: 'Home', url: SEO_DEFAULTS.siteUrl },
    { name: 'Use Cases', url: `${SEO_DEFAULTS.siteUrl}/uses` },
    { name: pageData.meta.title, url: pageUrl },
  ])

  useFAQSchema(pageData.faqs)

  useUseCaseSchema({
    title: pageData.seo.title,
    description: pageData.seo.description,
    url: pageUrl,
    keyword: pageData.meta.keyword,
    includeHowTo: !!pageData.howItWorks,
  })
}
</script>
