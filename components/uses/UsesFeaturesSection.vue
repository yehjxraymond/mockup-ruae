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

      <!-- Feature Cards Carousel (Mobile) / Grid (Desktop) -->
      <div
        ref="carouselRef"
        class="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
        @scroll="onScroll"
      >
        <div
          v-for="feature in selectedFeatures"
          :key="feature.id"
          class="bg-rently-purple-light/40 backdrop-blur-sm rounded-3xl p-6 flex flex-col flex-shrink-0 w-[85vw] md:w-auto snap-center"
        >
          <h3 class="text-xl font-bold text-white mb-4 text-center">{{ feature.title }}</h3>

          <!-- Feature Visual with fixed 4:3 aspect ratio -->
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

      <!-- Carousel Dots (mobile only) -->
      <div class="flex justify-center gap-2 mt-6 md:hidden">
        <button
          v-for="(_, index) in selectedFeatures"
          :key="index"
          :class="[
            'w-2 h-2 rounded-full transition-colors',
            currentIndex === index ? 'bg-rently-teal' : 'bg-white/30'
          ]"
          @click="scrollToIndex(index)"
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

const carouselRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)

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
    description: "We help expats who have not built a long credit history yet. Rently works with properties that come from any landlord, agent or rental platform.",
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=500&fit=crop',
  },
  'new-to-uae-calendar': {
    id: 'new-to-uae-calendar',
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

const selectedFeatures = computed(() => {
  return props.featureIds
    .map(id => allFeatures[id])
    .filter(Boolean)
})

const onScroll = () => {
  if (!carouselRef.value) return
  const scrollLeft = carouselRef.value.scrollLeft
  const cardWidth = carouselRef.value.scrollWidth / selectedFeatures.value.length
  currentIndex.value = Math.round(scrollLeft / cardWidth)
}

const scrollToIndex = (index: number) => {
  if (!carouselRef.value) return
  const cardWidth = carouselRef.value.scrollWidth / selectedFeatures.value.length
  carouselRef.value.scrollTo({
    left: cardWidth * index,
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
