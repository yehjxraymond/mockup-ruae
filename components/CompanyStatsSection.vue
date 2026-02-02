<template>
  <section class="py-20 bg-rently-purple">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl md:text-5xl font-bold text-white text-center mb-16">
        What is Rently?
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <!-- Left Column - Team Photo -->
        <div>
          <div class="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              alt="Rently team"
              class="w-full h-auto"
            />
          </div>
          <div class="flex justify-between items-center mt-4 text-white/70 text-sm">
            <span>Rently, Singapore</span>
            <span>© John Salvador</span>
          </div>
        </div>

        <!-- Right Column - Stats -->
        <div class="flex flex-col justify-center space-y-8">
          <!-- Stat 1 -->
          <div class="border-b border-white/20 pb-8">
            <h3 class="text-5xl md:text-6xl font-bold text-white mb-4">40+</h3>
            <p class="text-lg text-white/90 leading-relaxed">
              Dedicated people across UAE, Singapore, Stockholm and Turkey, aiming to make renting easier.
            </p>
          </div>

          <!-- Stat 2 -->
          <div class="border-b border-white/20 pb-8">
            <h3 class="text-5xl md:text-6xl font-bold text-white mb-4">$20M+</h3>
            <p class="text-lg text-white/90 leading-relaxed">
              Over two millions dollars of deposit money was paid by Rently, lowering the barrier for renting.
            </p>
          </div>

          <!-- Stat 3 -->
          <div class="pb-8">
            <h3 class="text-5xl md:text-6xl font-bold text-white mb-4">3</h3>
            <p class="text-lg text-white/90 leading-relaxed">
              We're present in 3 countries. Already well established in Singapore and expanding to Hong Kong and UAE now.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="text-center">
        <button class="px-12 py-4 bg-rently-teal text-white font-semibold rounded-full hover:bg-rently-teal/90 transition-all text-lg">
          Rent Now Pay Later
        </button>
      </div>
    </div>
  </section>
</template>
