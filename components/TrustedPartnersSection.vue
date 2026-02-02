<template>
  <section class="py-20 bg-rently-purple">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Desktop Layout: Logos Left, Text Right -->
      <div class="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column - Scrolling Logos -->
        <div class="relative overflow-hidden">
          <div class="flex gap-6 animate-scroll-horizontal">
            <div
              v-for="(partner, index) in [...partners, ...partners]"
              :key="`desktop-${index}`"
              class="bg-white rounded-2xl p-6 flex items-center justify-center min-w-[200px] h-32 flex-shrink-0"
            >
              <span class="text-xl font-bold text-gray-800">{{ partner.name }}</span>
            </div>
          </div>
        </div>

        <!-- Right Column - Text -->
        <div>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
            Our trusted partners
          </h2>
          <p class="text-xl text-white/90 leading-relaxed">
            Rently is established in Singapore and UAE, partnering with Public and Private entities such as Habyt (SG) and GEMS (UAE).
          </p>
        </div>
      </div>

      <!-- Mobile/Tablet Layout: Centered -->
      <div class="lg:hidden text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Our trusted partners
        </h2>
        <p class="text-lg text-white/90 leading-relaxed mb-12 max-w-3xl mx-auto">
          Rently is established in Singapore and UAE, partnering with Public and Private entities such as Habyt (SG) and GEMS (UAE).
        </p>

        <!-- Partner Logos Row -->
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="(partner, index) in partners"
            :key="`mobile-${index}`"
            class="bg-white rounded-2xl p-4 flex items-center justify-center w-32 h-20"
          >
            <span class="text-sm font-bold text-gray-800">{{ partner.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const partners = [
  { name: 'BLUEGROUND' },
  { name: 'CHUBB' },
  { name: 'GEMS EDUCATION' },
  { name: 'AIG' },
  { name: 'HABYT' }
]
</script>

<style scoped>
@keyframes scroll-horizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll-horizontal {
  animation: scroll-horizontal 20s linear infinite;
}

.animate-scroll-horizontal:hover {
  animation-play-state: paused;
}
</style>
