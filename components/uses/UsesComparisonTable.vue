<template>
  <section class="py-16 bg-rently-purple">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        {{ title }}
      </h2>

      <!-- Desktop Table -->
      <div class="hidden md:block overflow-hidden rounded-2xl">
        <table class="w-full table-fixed">
          <thead>
            <tr class="bg-rently-purple-light/60">
              <th
                v-for="(header, index) in headers"
                :key="header"
                :class="[
                  'px-6 py-4 text-left text-white font-semibold',
                  index === 0 ? 'w-1/4' : 'w-[37.5%]'
                ]"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="row.feature"
              :class="index % 2 === 0 ? 'bg-rently-purple-light/30' : 'bg-rently-purple-light/20'"
            >
              <td class="px-6 py-4 font-medium text-white">
                {{ row.feature }}
              </td>
              <td
                v-for="(value, valueIndex) in row.values"
                :key="valueIndex"
                :class="[
                  'px-6 py-4',
                  valueIndex === row.values.length - 1
                    ? 'text-rently-teal font-semibold'
                    : 'text-white/80'
                ]"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="md:hidden space-y-3">
        <div
          v-for="(row, index) in rows"
          :key="row.feature"
          :class="[
            'p-5 rounded-2xl',
            index % 2 === 0 ? 'bg-rently-purple-light/40' : 'bg-rently-purple-light/25'
          ]"
        >
          <h3 class="font-bold text-white mb-3">{{ row.feature }}</h3>
          <div class="space-y-2">
            <p class="text-sm">
              <span class="text-rently-teal text-xs uppercase tracking-wide font-semibold">With Rently: </span>
              <span class="text-rently-teal font-medium">{{ row.values[1] }}</span>
            </p>
            <p class="text-sm">
              <span class="text-white/50 text-xs uppercase tracking-wide">Traditional: </span>
              <span class="text-white/60">{{ row.values[0] }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const headers = ['', 'Traditional Way', 'With Rently']

const rows = [
  { feature: 'Upfront Cash', values: ['25% - 50% of annual salary', 'Just your first month\'s rent'] },
  { feature: 'Security Deposit', values: ['Paid upfront in full', 'We can split it up for you'] },
  { feature: 'Landlord Relation', values: ['Stressful cheque negotiations', 'Landlord gets 1-6 cheques without negotiation stress'] },
  { feature: 'Financial Health', values: ['Drains your savings', 'Keep your savings intact'] },
  { feature: 'Rental Options', values: ['Limited to flexible landlords', 'Rent from any landlord you want'] },
]

defineProps<{
  title: string
}>()
</script>
