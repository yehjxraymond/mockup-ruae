<template>
  <section class="py-20 bg-rently-purple">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        {{ props.title }}
      </h2>
      <p class="text-xl text-white/80 text-center mb-12">
        {{ props.subtitle }}
      </p>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in props.faqs"
          :key="index"
          class="bg-rently-purple-light/40 backdrop-blur-sm rounded-2xl overflow-hidden"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
          >
            <span class="font-semibold text-white pr-8">{{ faq.question }}</span>
            <Icon
              name="heroicons:chevron-down"
              class="w-5 h-5 text-white/70 transition-transform flex-shrink-0"
              :class="{ 'rotate-180': openFaq === index }"
            />
          </button>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="openFaq === index" class="px-6 pb-5">
              <p class="text-white/80 leading-relaxed">{{ faq.answer }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 text-center">
        <p class="text-white/80">
          Still have questions?
          <a href="mailto:sales@rently-uae.com" class="text-rently-teal hover:underline">Contact us</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FAQ_DATA } from '~/utils/seo/constants'
import type { FAQItem } from '~/utils/uses/types'

const props = withDefaults(
  defineProps<{
    faqs?: FAQItem[]
    title?: string
    subtitle?: string
  }>(),
  {
    faqs: () => FAQ_DATA,
    title: 'Frequently asked questions',
    subtitle: 'Everything you need to know about Rently',
  }
)

const openFaq = ref<number | null>(null)

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>
