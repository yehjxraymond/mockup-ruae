<template>
  <nav class="bg-rently-purple border-b border-white/10 sticky top-0 z-50 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="text-2xl font-bold text-white">
            Rently
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/blog" class="text-white hover:text-rently-teal transition-colors">
            Articles
          </NuxtLink>

          <NuxtLink to="/#solutions" class="text-white hover:text-rently-teal transition-colors">
            Solutions
          </NuxtLink>

          <button class="px-6 py-2 bg-rently-teal text-white rounded-full hover:bg-rently-teal/90 transition-colors">
            Log in
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-white"
        >
          <Icon :name="showMobileMenu ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="showMobileMenu"
        class="md:hidden border-t border-white/10 py-4 space-y-4"
      >
        <NuxtLink
          to="/blog"
          class="block text-white hover:text-rently-teal transition-colors"
          @click="closeMobileMenu"
        >
          Articles
        </NuxtLink>

        <NuxtLink
          to="/#solutions"
          class="block text-white hover:text-rently-teal transition-colors"
          @click="closeMobileMenu"
        >
          Solutions
        </NuxtLink>

        <button class="w-full px-6 py-2 bg-rently-teal text-white rounded-full hover:bg-rently-teal/90 transition-colors">
          Log in
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}
</script>
