<template>
  <section class="py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-400">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
        {{ cta.title }}
      </h2>

      <NuxtLink
        to="#calculator"
        class="inline-block px-10 py-4 bg-white text-rently-purple font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all text-lg"
      >
        {{ cta.buttonText || 'Get Instant Quote' }}
      </NuxtLink>

      <p class="mt-6 text-white/80 text-sm">
        No hidden fees. Transparent pricing. Cancel anytime.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { UseCaseCTA } from '~/utils/uses/types'

defineProps<{
  cta: UseCaseCTA
}>()
</script>
