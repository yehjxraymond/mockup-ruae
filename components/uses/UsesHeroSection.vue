<template>
  <section class="relative bg-rently-purple pt-20 pb-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column - Content -->
        <div class="text-left order-2 lg:order-1">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {{ hero.title }}
          </h1>

          <p class="text-xl text-white/90 mb-8 max-w-lg">
            {{ hero.subtitle }}
          </p>

          <NuxtLink
            to="#calculator"
            class="block w-full sm:inline-block sm:w-auto px-8 py-4 bg-rently-teal text-white font-semibold rounded-full hover:bg-rently-teal/90 transition-all text-lg text-center"
          >
            {{ hero.ctaText }}
          </NuxtLink>
        </div>

        <!-- Right Column - Arch Image -->
        <div class="flex justify-center lg:justify-end order-1 lg:order-2">
          <div class="w-80 h-96 rounded-t-full overflow-hidden bg-gray-200 shadow-2xl">
            <img
              v-if="hero.heroImage"
              :src="hero.heroImage"
              :alt="hero.title"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-rently-purple-light to-rently-teal flex items-center justify-center"
            >
              <Icon name="heroicons:home" class="w-24 h-24 text-white/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { UseCaseHero } from '~/utils/uses/types'

defineProps<{
  hero: UseCaseHero
}>()
</script>
