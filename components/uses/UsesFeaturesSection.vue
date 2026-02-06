<template>
  <section class="py-16 bg-rently-purple">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-lg text-white/80 max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <!-- Mobile: Single card carousel -->
      <div
        ref="mobileCarouselRef"
        class="flex md:hidden gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
        @scroll="onMobileScroll"
      >
        <div
          v-for="feature in orderedFeatures"
          :key="feature.id"
          class="bg-rently-purple-light/40 backdrop-blur-sm rounded-3xl p-6 flex flex-col flex-shrink-0 w-[85vw] snap-center"
        >
          <h3 class="text-xl font-bold text-white mb-4 text-center">{{ feature.title }}</h3>
          <div class="relative w-full rounded-2xl mb-4 overflow-hidden bg-rently-purple-light/60" style="aspect-ratio: 9/11;">
            <img
              v-if="feature.image"
              :src="feature.image"
              :alt="feature.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div v-else class="absolute inset-0 flex items-center justify-center">
              <Icon
                :name="feature.icon || 'heroicons:sparkles'"
                class="w-16 h-16 text-white/30"
              />
            </div>
          </div>
          <p class="text-white/80 text-sm leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Mobile dots -->
      <div class="flex justify-center gap-2 mt-6 md:hidden">
        <button
          v-for="(_, index) in orderedFeatures"
          :key="index"
          :class="[
            'w-2 h-2 rounded-full transition-colors',
            mobileIndex === index ? 'bg-rently-teal' : 'bg-white/30'
          ]"
          @click="scrollToMobileIndex(index)"
        />
      </div>

      <!-- Desktop/Tablet: 3 cards at a time with swipe -->
      <div
        ref="desktopCarouselRef"
        class="hidden md:flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        @scroll="onDesktopScroll"
      >
        <div
          v-for="(page, pageIndex) in featurePages"
          :key="pageIndex"
          class="grid grid-cols-3 gap-6 flex-shrink-0 w-full snap-center"
        >
          <div
            v-for="feature in page"
            :key="feature.id"
            class="bg-rently-purple-light/40 backdrop-blur-sm rounded-3xl p-6 flex flex-col"
          >
            <h3 class="text-xl font-bold text-white mb-4 text-center">{{ feature.title }}</h3>
            <div class="relative w-full rounded-2xl mb-4 overflow-hidden bg-rently-purple-light/60" style="aspect-ratio: 9/11;">
              <img
                v-if="feature.image"
                :src="feature.image"
                :alt="feature.title"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div v-else class="absolute inset-0 flex items-center justify-center">
                <Icon
                  :name="feature.icon || 'heroicons:sparkles'"
                  class="w-16 h-16 text-white/30"
                />
              </div>
            </div>
            <p class="text-white/80 text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- Desktop/Tablet dots -->
      <div v-if="featurePages.length > 1" class="hidden md:flex justify-center gap-2 mt-6">
        <button
          v-for="(_, index) in featurePages"
          :key="index"
          :class="[
            'w-2 h-2 rounded-full transition-colors',
            desktopIndex === index ? 'bg-rently-teal' : 'bg-white/30'
          ]"
          @click="scrollToDesktopIndex(index)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  subtitle?: string
  featureIds: string[]
}>()

const mobileCarouselRef = ref<HTMLElement | null>(null)
const desktopCarouselRef = ref<HTMLElement | null>(null)
const mobileIndex = ref(0)
const desktopIndex = ref(0)

// Hardcoded feature definitions
const allFeatures: Record<string, {
  id: string
  title: string
  description: string
  image?: string
  icon?: string
}> = {
  'move-in-immediately': {
    id: 'move-in-immediately',
    title: 'Move in immediately',
    description: "Secure your new home quickly without waiting to save up for a full year's rent.",
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=500&fit=crop',
  },
  'new-to-uae': {
    id: 'new-to-uae',
    title: 'New to the UAE?',
    description: "We help expats who have not built a long credit history yet.",
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=500&fit=crop',
  },
  'security-deposit': {
    id: 'security-deposit',
    title: 'Security deposit assistance',
    description: "You can decide that Rently also pays for your security deposit, to save cash for your other moving-costs such as furniture.",
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=500&fit=crop',
  },
  'sharia-compliant': {
    id: 'sharia-compliant',
    title: 'Sharia-compliant model',
    description: "We charge a transparent, flat, monthly fee rather than variable interest rates.",
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=500&fit=crop',
  },
  'property-pre-approval': {
    id: 'property-pre-approval',
    title: 'Property pre-approval',
    description: "Haven't found a place yet? Get pre-approved for a budget so you can hunt with confidence.",
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=500&fit=crop',
  },
  'choose-payment-method': {
    id: 'choose-payment-method',
    title: 'You choose how you pay rent',
    description: "Pay by bank transfer or use any credit card to pay your rent and generate rewards and miles.",
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=500&fit=crop',
  },
  'no-bank-account': {
    id: 'no-bank-account',
    title: "Don't have a bank account yet?",
    description: "You just arrived to the UAE and don't have a bank account? No problem, as long as you can provide proof of income.",
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=400&h=500&fit=crop',
  },
  'rent-increase-renewal': {
    id: 'rent-increase-renewal',
    title: 'Your landlord is increasing your rent upon renewal?',
    description: "Rently covers your upfront payment so that you don't get out-priced by the heavy lump sum payment at your lease renewal.",
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=500&fit=crop',
  },
  'earn-rewards': {
    id: 'earn-rewards',
    title: 'Earn rewards on each rental payment',
    description: "You can pay for your rent with any credit cards and cumulate rewards on your largest recurring expense: your rent.",
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=500&fit=crop',
  },
}

// Show all features: featureIds first, then remaining features
const orderedFeatures = computed(() => {
  const prioritized = props.featureIds
    .map(id => allFeatures[id])
    .filter(Boolean)

  const prioritizedIds = new Set(props.featureIds)
  const remaining = Object.values(allFeatures)
    .filter(f => !prioritizedIds.has(f.id))

  return [...prioritized, ...remaining]
})

// Group features into pages of 3 for desktop
const featurePages = computed(() => {
  const pages: typeof orderedFeatures.value[] = []
  for (let i = 0; i < orderedFeatures.value.length; i += 3) {
    pages.push(orderedFeatures.value.slice(i, i + 3))
  }
  return pages
})

// Mobile scroll handlers
const onMobileScroll = () => {
  if (!mobileCarouselRef.value) return
  const scrollLeft = mobileCarouselRef.value.scrollLeft
  const cardWidth = mobileCarouselRef.value.scrollWidth / orderedFeatures.value.length
  mobileIndex.value = Math.round(scrollLeft / cardWidth)
}

const scrollToMobileIndex = (index: number) => {
  if (!mobileCarouselRef.value) return
  const cardWidth = mobileCarouselRef.value.scrollWidth / orderedFeatures.value.length
  mobileCarouselRef.value.scrollTo({
    left: cardWidth * index,
    behavior: 'smooth'
  })
}

// Desktop scroll handlers
const onDesktopScroll = () => {
  if (!desktopCarouselRef.value) return
  const scrollLeft = desktopCarouselRef.value.scrollLeft
  const pageWidth = desktopCarouselRef.value.scrollWidth / featurePages.value.length
  desktopIndex.value = Math.round(scrollLeft / pageWidth)
}

const scrollToDesktopIndex = (index: number) => {
  if (!desktopCarouselRef.value) return
  const pageWidth = desktopCarouselRef.value.scrollWidth / featurePages.value.length
  desktopCarouselRef.value.scrollTo({
    left: pageWidth * index,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
