<template>
  <section class="py-20 bg-rently-purple">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        Frequently asked questions
      </h2>
      <p class="text-xl text-white/80 text-center mb-12">
        Everything you need to know about Rently
      </p>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
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
        <p class="text-white/80 mb-4">Still have questions?</p>
        <button class="px-8 py-3 bg-rently-teal text-white font-semibold rounded-full hover:bg-rently-teal/90 transition-all">
          Contact Support
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openFaq = ref<number | null>(null)

const faqs = [
  {
    question: 'Who is eligible to use Rently?',
    answer: 'Rently is available to residents and expats in the UAE with a valid Emirates ID, steady income, and good credit history. We accept salaried employees, self-employed individuals, and business owners who meet our verification criteria.'
  },
  {
    question: 'What if I need to terminate my rental agreement early?',
    answer: 'If you need to terminate your rental agreement early, please contact our support team. We work with you and your landlord to find the best solution. Early termination terms depend on your rental contract and may be subject to fees as outlined in your agreement.'
  },
  {
    question: 'Can I use Rently without paying a deposit?',
    answer: 'Yes! That\'s exactly what Rently does. We cover your security deposit upfront to the landlord, and you pay us back in manageable monthly installments over the course of your rental period. This means you don\'t need to have a large sum available upfront.'
  },
  {
    question: 'Does Rently charge any fees?',
    answer: 'Rently charges a transparent service fee for facilitating your rental payment and covering your deposit. All fees are clearly disclosed upfront during the application process, with no hidden charges. The exact fee depends on your rental amount and payment plan.'
  },
  {
    question: 'What types of properties can I rent with Rently?',
    answer: 'Rently works with a wide range of properties including apartments, villas, townhouses, and studios across the UAE. We partner with major property developers and landlords in Dubai, Abu Dhabi, and other emirates. If your desired property isn\'t already in our network, we can work with your landlord to onboard them.'
  }
]

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>
