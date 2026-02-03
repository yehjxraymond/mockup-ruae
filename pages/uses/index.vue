<template>
  <div class="min-h-screen bg-white">
      <!-- Hero Section -->
      <section class="bg-rently-purple pt-20 pb-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
            Flexible Rent Payment Solutions
          </h1>
          <p class="text-xl text-white/90 max-w-3xl mx-auto">
            Discover how Rently can help you manage your rent payments. From credit card payments to loan alternatives, find the solution that works for you.
          </p>
        </div>
      </section>

      <!-- Use Cases by Category -->
      <section class="py-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            v-for="(useCases, category) in useCasesByCategory"
            :key="category"
            class="mb-16 last:mb-0"
          >
            <h2 class="text-2xl font-bold text-gray-900 mb-6 capitalize">
              {{ formatCategory(category) }}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NuxtLink
                v-for="useCase in useCases"
                :key="useCase.meta.slug"
                :to="`/uses/${useCase.meta.slug}`"
                class="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-rently-purple/30 transition-all"
              >
                <div class="flex items-start justify-between mb-4">
                  <div class="w-12 h-12 bg-rently-purple/10 rounded-xl flex items-center justify-center">
                    <Icon
                      name="heroicons:arrow-trending-up"
                      class="w-6 h-6 text-rently-purple"
                    />
                  </div>
                  <Icon
                    name="heroicons:arrow-right"
                    class="w-5 h-5 text-gray-400 group-hover:text-rently-purple group-hover:translate-x-1 transition-all"
                  />
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rently-purple transition-colors">
                  {{ useCase.meta.title }}
                </h3>

                <p class="text-gray-600 text-sm line-clamp-2">
                  {{ useCase.seo.description }}
                </p>

                <div class="mt-4 pt-4 border-t border-gray-100">
                  <span class="text-xs font-medium text-rently-purple bg-rently-purple/10 px-3 py-1 rounded-full">
                    {{ useCase.meta.keyword }}
                  </span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Empty state -->
          <div
            v-if="Object.keys(useCasesByCategory).length === 0"
            class="text-center py-16"
          >
            <Icon
              name="heroicons:document-magnifying-glass"
              class="w-16 h-16 text-gray-300 mx-auto mb-4"
            />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              No Use Cases Available
            </h3>
            <p class="text-gray-600">
              Check back soon for new content.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-gradient-to-br from-rently-purple to-rently-teal">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">
            Not Sure Which Option Is Right for You?
          </h2>
          <p class="text-white/90 mb-8">
            Our team can help you find the perfect rent payment solution for your needs.
          </p>
          <NuxtLink
            to="/#apply"
            class="inline-block px-8 py-4 bg-white text-rently-purple font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all"
          >
            Get Started
          </NuxtLink>
        </div>
      </section>
    </div>
</template>

<script setup lang="ts">
import { getUseCasesByCategory } from '~/utils/uses/use-case-data'
import { SEO_DEFAULTS } from '~/utils/seo/constants'

const useCasesByCategory = getUseCasesByCategory()

const formatCategory = (category: string): string => {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

useSEO({
  title: 'Rent Payment Solutions & Use Cases',
  description: 'Explore flexible rent payment options with Rently. Pay rent with credit card, find loan alternatives, and discover solutions for your rental needs in UAE.',
})

useBreadcrumbSchema([
  { name: 'Home', url: SEO_DEFAULTS.siteUrl },
  { name: 'Use Cases', url: `${SEO_DEFAULTS.siteUrl}/uses` },
])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
