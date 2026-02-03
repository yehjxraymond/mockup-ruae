<template>
  <section class="py-16 bg-rently-purple">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Stats -->
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">
        Trusted by 1,000+ tenants in Dubai & Abu Dhabi
      </h2>
      <p class="text-xl text-white/90 mb-12">
        AED 120M+ in rent paid to landlords
      </p>

      <!-- Logo Carousel -->
      <div class="relative overflow-hidden">
        <div class="flex gap-8 animate-scroll-logos">
          <div
            v-for="(partner, index) in [...partners, ...partners]"
            :key="`logo-${index}`"
            class="bg-white rounded-2xl p-6 flex items-center justify-center min-w-[180px] h-24 flex-shrink-0"
          >
            <span class="text-lg font-bold text-gray-800">{{ partner.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const partners = [
  { name: 'THE WORKING CAPITOL' },
  { name: 'HABYT' },
  { name: 'BLUEGROUND' },
  { name: 'GEMS EDUCATION' },
  { name: 'CHUBB' },
]
</script>

<style scoped>
@keyframes scroll-logos {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll-logos {
  animation: scroll-logos 25s linear infinite;
}

.animate-scroll-logos:hover {
  animation-play-state: paused;
}
</style>
