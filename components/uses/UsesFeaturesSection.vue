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
    image: 'https://images.unsplash.com/photo-1529551739587-e242c564f727?w=400&h=300&fit=crop',
  },
  'new-to-uae': {
    id: 'new-to-uae',
    title: 'New to the UAE?',
    description: "We help expats who have not built a long credit history yet. Rently works with properties that come from any landlord, agent or rental platform.",
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
  },
  'security-deposit': {
    id: 'security-deposit',
    title: 'Security deposit assistance',
    description: "You can decide that Rently also pays for your security deposit, to save cash for your other moving-costs such as furniture.",
    icon: 'heroicons:currency-dollar',
  },
  'flexible-payments': {
    id: 'flexible-payments',
    title: 'Flexible payment dates',
    description: "Choose payment dates that align with your salary. We work around your schedule, not the other way around.",
    icon: 'heroicons:calendar-days',
  },
  'no-hidden-fees': {
    id: 'no-hidden-fees',
    title: 'No hidden fees',
    description: "Transparent pricing with no surprises. Know exactly what you pay upfront with our simple fee structure.",
    icon: 'heroicons:eye',
  },
  'fast-approval': {
    id: 'fast-approval',
    title: 'Fast approval process',
    description: "Get approved within 24 hours. Our streamlined process means you can secure your home faster.",
    icon: 'heroicons:bolt',
  },
  'credit-card-rewards': {
    id: 'credit-card-rewards',
    title: 'Earn credit card rewards',
    description: "Pay your rent with a credit card and earn rewards points on your largest monthly expense.",
    icon: 'heroicons:credit-card',
  },
  'landlord-guarantee': {
    id: 'landlord-guarantee',
    title: 'Landlord gets paid on time',
    description: "Your landlord receives guaranteed on-time payments. We handle the transfer so you never miss a due date.",
    icon: 'heroicons:shield-check',
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
