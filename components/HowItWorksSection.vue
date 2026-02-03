<template>
  <section class="py-20 bg-rently-purple">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          {{ props.title }}
        </h2>
        <p v-if="props.subtitle" class="text-lg text-white/80 max-w-2xl mx-auto">
          {{ props.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
        <div
          v-for="(step, index) in steps"
          :key="step.stepNumber"
          :class="[
            index % 2 === 0
              ? 'bg-rently-purple-light/40 backdrop-blur-sm rounded-3xl'
              : 'bg-[#C4B5FD] rounded-r-full md:rounded-r-none md:rounded-t-full',
            'p-8 flex flex-row md:flex-col items-center gap-4 md:justify-center md:text-center min-h-[300px]'
          ]"
        >
          <div
            :class="[
              'w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-lg md:mb-2',
              index % 2 === 0 ? 'border-white/50 text-white' : 'border-rently-purple text-rently-purple'
            ]"
          >
            {{ step.stepNumber }}
          </div>
          <div>
            <h3
              :class="[
                'text-xl font-bold mb-2',
                index % 2 === 0 ? 'text-white' : 'text-rently-purple'
              ]"
            >
              {{ step.title }}
            </h3>
            <p
              :class="[
                'text-sm leading-relaxed',
                index % 2 === 0 ? 'text-white/80' : 'text-rently-purple/80'
              ]"
            >
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div v-if="props.showCta" class="text-center">
        <button class="px-12 py-4 bg-rently-teal text-white font-semibold rounded-full hover:bg-rently-teal/90 transition-all text-lg">
          Apply now
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { stepNumber: 1, title: 'Share details (1min)', description: 'Enter your rent, income and authenticate with UAE pass.' },
  { stepNumber: 2, title: 'Upload documents (2min)', description: 'Add your tenancy agreement, proof of income and credit report.' },
  { stepNumber: 3, title: 'We review (1 day)', description: 'We check your application, then you sign the contract and add payment details.' },
  { stepNumber: 4, title: 'We pay your landlord', description: 'Your landlord receives the full rental payment on the due date.' },
]

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    showCta?: boolean
  }>(),
  {
    title: 'How it works?',
    subtitle: undefined,
    showCta: true,
  }
)
</script>
