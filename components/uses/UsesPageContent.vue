<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <UsesHeroSection :hero="data.hero" />

    <!-- Social Proof Section (always show) -->
    <UsesSocialProofSection />

    <!-- Comparison Table -->
    <UsesComparisonTable
      v-if="data.comparison"
      :title="data.comparison.title"
    />

    <!-- How It Works -->
    <HowItWorksSection
      v-if="data.howItWorks"
      :title="data.howItWorks.title"
      :subtitle="data.howItWorks.subtitle"
      :show-cta="false"
    />

    <!-- Eligibility Section -->
    <UsesEligibilitySection
      v-if="data.eligibility"
      :title="data.eligibility.title"
      :subtitle="data.eligibility.subtitle"
    />

    <!-- Features -->
    <UsesFeaturesSection
      v-if="data.features"
      :title="data.features.title"
      :subtitle="data.features.subtitle"
      :feature-ids="data.features.featureIds"
    />

    <!-- Rent Calculator -->
    <RentEstimationSection />

    <!-- FAQ Section -->
    <FAQSection
      v-if="data.faqs && data.faqs.length > 0"
      :faqs="data.faqs"
      title="Frequently Asked Questions"
      :subtitle="`Common questions about ${data.meta.keyword}`"
    />

    <!-- CTA Section -->
    <UsesCTASection :cta="data.cta" />
  </div>
</template>

<script setup lang="ts">
import type { UseCasePageData } from '~/utils/uses/types'

defineProps<{
  data: UseCasePageData
}>()
</script>
