<template>
  <section class="relative bg-rently-purple pt-20 pb-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column - Content -->
        <div class="text-left order-2 lg:order-1">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span class="text-rently-teal">Rent now,</span>
            <br>
            <span class="text-white">pay later.</span>
          </h1>

          <p class="text-xl text-white/90 mb-8 max-w-lg">
            Convert your annual rental payment into monthly instalments, while the property owner receives the rent upfront.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button class="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              I'm interested
            </button>
            <button class="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Icon name="heroicons:arrow-down" class="w-5 h-5" />
              How it works?
            </button>
          </div>
        </div>

        <!-- Right Column - Arch Image -->
        <div class="flex justify-center lg:justify-end order-1 lg:order-2">
          <div class="w-80 h-96 rounded-t-full overflow-hidden bg-gray-200 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop"
              alt="Moving into new home"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
