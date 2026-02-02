<template>
  <section class="py-20 bg-rently-purple">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl md:text-5xl font-bold text-white text-center mb-16">
        How it works?
      </h2>

      <!-- Desktop: 4 columns, Tablet: 2x2 grid, Mobile: Stack -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
        <!-- Step 1 - Rounded Rectangle (Dark) -->
        <div class="bg-rently-purple-light/40 backdrop-blur-sm rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div class="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white mb-6">
            1
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Share details</h3>
          <p class="text-white/70 text-sm mb-1">(1 min)</p>
          <p class="text-white/80 text-sm leading-relaxed">
            Enter your rent, income and authenticate with UAE pass.
          </p>
        </div>

        <!-- Step 2 - Arch (Light) - Mobile: right arch, Tablet+: top arch -->
        <div class="bg-[#C4B5FD] rounded-r-full md:rounded-r-none md:rounded-t-full p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div class="w-12 h-12 rounded-full border-2 border-rently-purple flex items-center justify-center text-rently-purple mb-6">
            2
          </div>
          <h3 class="text-xl font-bold text-rently-purple mb-2">Upload documents</h3>
          <p class="text-rently-purple/70 text-sm mb-1">(1 min)</p>
          <p class="text-rently-purple text-sm leading-relaxed">
            Add your tenancy agreement, proof of income and credit report.
          </p>
        </div>

        <!-- Step 3 - Rounded Rectangle (Dark) -->
        <div class="bg-rently-purple-light/40 backdrop-blur-sm rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div class="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white mb-6">
            3
          </div>
          <h3 class="text-xl font-bold text-white mb-2">We check the application</h3>
          <p class="text-white/70 text-sm mb-1">(1 business day)</p>
          <p class="text-white/80 text-sm leading-relaxed">
            Then sign the contract and add your payment details, you're done!
          </p>
        </div>

        <!-- Step 4 - Arch (Light) - Mobile: right arch, Tablet+: top arch -->
        <div class="bg-[#C4B5FD] rounded-r-full md:rounded-r-none md:rounded-t-full p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div class="w-12 h-12 rounded-full border-2 border-rently-purple flex items-center justify-center text-rently-purple mb-6">
            4
          </div>
          <h3 class="text-xl font-bold text-rently-purple mb-2">We pay your landlord</h3>
          <p class="text-rently-purple/70 text-sm mb-1">(On due date)</p>
          <p class="text-rently-purple text-sm leading-relaxed">
            Your landlord receives the full rental payment on the due date.
          </p>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="text-center">
        <button class="px-12 py-4 bg-rently-teal text-white font-semibold rounded-full hover:bg-rently-teal/90 transition-all text-lg">
          Apply now
        </button>
      </div>
    </div>
  </section>
</template>
