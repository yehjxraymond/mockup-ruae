<template>
  <footer class="bg-rently-purple text-white pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top Section with Illustration and Links -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <!-- Left - 3D Building Illustration -->
        <div class="flex justify-center md:justify-start">
          <div class="w-64 h-64">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop"
              alt="City buildings"
              class="w-full h-full object-cover rounded-full opacity-80"
            />
          </div>
        </div>

        <!-- Middle - About Column -->
        <div>
          <h3 class="text-xl font-bold mb-6">About</h3>
          <ul class="space-y-4">
            <li>
              <a href="#" class="text-white/80 hover:text-white transition-colors">Careers</a>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-white/80 hover:text-white transition-colors">Blog</NuxtLink>
            </li>
            <li>
              <a href="#" class="text-white/80 hover:text-white transition-colors">Newsroom</a>
            </li>
          </ul>
        </div>

        <!-- Right - Solutions Column -->
        <div>
          <h3 class="text-xl font-bold mb-6">Solutions</h3>
          <ul class="space-y-4">
            <li>
              <a href="#" class="text-white/80 hover:text-white transition-colors">Tenants</a>
            </li>
            <li>
              <a href="#" class="text-white/80 hover:text-white transition-colors">Agents</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Middle Section - Logo and Company Info -->
      <div class="text-center mb-8">
        <!-- Logo -->
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-teal-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span class="text-2xl font-bold text-white">R</span>
          </div>
          <div class="text-4xl font-bold">Rently</div>
        </div>

        <!-- Company Info -->
        <div class="space-y-2 text-white/80 mb-6">
          <p>Prime Refin Real Estate L.L.C (TL: 1381941)</p>
          <p>Alsafi 1 #204-52, Al Marrer, Dubai, UAE</p>
          <p>Email: <a href="mailto:sales@rently-uae.com" class="text-white hover:underline">sales@rently-uae.com</a></p>
        </div>

        <!-- Social Media Icons -->
        <div class="flex justify-center gap-4 mb-8">
          <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <Icon name="mdi:instagram" class="w-5 h-5" />
          </a>
          <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <Icon name="mdi:facebook" class="w-5 h-5" />
          </a>
          <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <Icon name="mdi:linkedin" class="w-5 h-5" />
          </a>
          <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <Icon name="mdi:youtube" class="w-5 h-5" />
          </a>
        </div>
      </div>

      <!-- Bottom Section - Legal Links and Country Selector -->
      <div class="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-white/80 border-t border-white/10 pt-6">
        <a href="#" class="hover:text-white transition-colors underline">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors underline">Terms & Conditions</a>

        <!-- Country Selector -->
        <div class="flex items-center gap-2">
          <span class="text-2xl">🇦🇪</span>
          <span class="font-semibold">UAE</span>
          <Icon name="heroicons:chevron-down" class="w-4 h-4" />
        </div>
      </div>
    </div>
  </footer>
</template>
