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

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Requirements -->
        <div>
          <h3 class="text-xl font-semibold text-white mb-6">Requirements</h3>
          <div class="space-y-4">
            <div
              v-for="req in requirements"
              :key="req.title"
              class="flex items-start gap-4 bg-rently-purple-light/40 backdrop-blur-sm p-5 rounded-xl"
            >
              <div class="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Icon
                  :name="req.icon"
                  class="w-6 h-6 text-rently-teal"
                />
              </div>
              <div>
                <h4 class="font-semibold text-white mb-1">{{ req.title }}</h4>
                <p class="text-white/70 text-sm">{{ req.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Documents -->
        <div>
          <h3 class="text-xl font-semibold text-white mb-6">Documents Needed</h3>
          <div class="bg-rently-purple-light/40 backdrop-blur-sm p-6 rounded-xl">
            <ul class="space-y-3">
              <li
                v-for="doc in documents"
                :key="doc"
                class="flex items-center gap-3"
              >
                <Icon
                  name="heroicons:document-check"
                  class="w-5 h-5 text-rently-teal flex-shrink-0"
                />
                <span class="text-white/90">{{ doc }}</span>
              </li>
            </ul>
          </div>

          <!-- Quick Tip -->
          <div class="mt-6 bg-rently-teal/20 border border-rently-teal/30 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <Icon
                name="heroicons:light-bulb"
                class="w-5 h-5 text-rently-teal flex-shrink-0 mt-0.5"
              />
              <p class="text-sm text-white/90">
                <span class="font-semibold">Tip:</span> Have digital copies of these documents ready to speed up your application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()

// Static requirements
const requirements = [
  {
    icon: 'heroicons:identification',
    title: 'UAE Resident',
    description: 'Valid Emirates ID and residency visa'
  },
  {
    icon: 'heroicons:briefcase',
    title: 'Employed in UAE',
    description: 'Salaried employee or self-employed with verifiable income'
  },
  {
    icon: 'heroicons:home',
    title: 'Rental Property',
    description: 'Signed tenancy contract for residential property'
  },
  {
    icon: 'heroicons:chart-bar',
    title: 'Good Credit Standing',
    description: 'No major defaults or active bankruptcy'
  }
]

// Static documents
const documents = [
  'Emirates ID',
  'Employment Contract or Payslips',
  'Tenancy Contract',
  'Bank Statements (3 months)'
]
</script>
