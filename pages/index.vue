<template>
  <div class="bg-rently-purple">
    <HeroSection />
    <HowItWorksSection />
    <ValuePropositionsSection />
    <DepositFeatureSection />
    <TrustedPartnersSection />
    <CompanyStatsSection />
    <FAQSection />
    <RentEstimationSection />
  </div>
</template>

<script setup lang="ts">
import { FAQ_DATA } from '~/utils/seo/constants'

useSEO({
  title: 'Split Annual Rent into Monthly Payments',
  description: 'Rent now, pay later. Split your annual rent into manageable monthly payments with Rently. No large upfront deposits required. Available across UAE.',
  type: 'website',
})

useOrganizationSchema()
useWebSiteSchema()
useFAQSchema(FAQ_DATA)
</script>
