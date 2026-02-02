<template>
  <section class="py-20 bg-rently-purple">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        Pay your rent monthly
      </h2>
      <p class="text-lg text-white/90 text-center mb-16 max-w-4xl mx-auto">
        Rently pays your annual rent upfront, and you repay in easy monthly installments with a small service fee. Enjoy maximum flexibility and financial ease in your new home.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        <!-- Card 1 - Financial stability and comfort -->
        <div class="bg-rently-purple-light/40 backdrop-blur-sm rounded-3xl p-6 flex flex-col">
          <h3 class="text-2xl font-bold text-white mb-6">
            Financial stability<br>and comfort
          </h3>

          <!-- Calendar Widget -->
          <div class="bg-white rounded-2xl p-4 mb-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-gray-700 font-semibold">September 2024 ></span>
              <div class="flex gap-2">
                <button class="text-gray-500 hover:text-gray-700">
                  <Icon name="heroicons:chevron-left" class="w-5 h-5" />
                </button>
                <button class="text-gray-500 hover:text-gray-700">
                  <Icon name="heroicons:chevron-right" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              <div class="text-gray-400 font-medium">SUN</div>
              <div class="text-gray-400 font-medium">MON</div>
              <div class="text-gray-400 font-medium">TUE</div>
              <div class="text-gray-400 font-medium">WED</div>
              <div class="text-gray-400 font-medium">THU</div>
              <div class="text-gray-400 font-medium">FRI</div>
              <div class="text-gray-400 font-medium">SAT</div>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-sm">
              <div class="p-2 text-gray-700">1</div>
              <div class="p-2 text-gray-700">2</div>
              <div class="p-2 text-gray-700">3</div>
              <div class="p-2 text-gray-700">4</div>
              <div class="p-2 text-gray-700">5</div>
              <div class="p-2"></div>
              <div class="p-2"></div>
              <div class="p-2 text-gray-700">6</div>
              <div class="p-2 bg-rently-purple text-white rounded-full font-bold">7</div>
              <div class="p-2 text-gray-700">8</div>
              <div class="p-2 text-gray-700">9</div>
              <div class="p-2 text-gray-700">10</div>
              <div class="p-2 text-gray-700">11</div>
              <div class="p-2 text-gray-700">12</div>
              <div class="p-2 text-gray-700">13</div>
              <div class="p-2 text-gray-700">14</div>
              <div class="p-2 text-gray-700">15</div>
              <div class="p-2 text-gray-700">16</div>
              <div class="p-2 text-gray-700">17</div>
              <div class="p-2 text-gray-700">18</div>
              <div class="p-2 text-gray-700">19</div>
              <div class="p-2 text-gray-700">20</div>
              <div class="p-2 text-gray-700">21</div>
              <div class="p-2 text-gray-700">22</div>
              <div class="p-2 text-gray-700">23</div>
              <div class="p-2 text-gray-700">24</div>
              <div class="p-2 text-gray-700">25</div>
              <div class="p-2 text-gray-700">26</div>
              <div class="p-2 text-gray-700">27</div>
              <div class="p-2 text-gray-700">28</div>
              <div class="p-2 text-gray-700">29</div>
              <div class="p-2 text-gray-700">30</div>
            </div>
          </div>

          <p class="text-white/90 leading-relaxed mt-auto">
            Enjoy smooth and comfortable monthly installments that you can easily manage.
          </p>
        </div>

        <!-- Card 2 - Expand your options -->
        <div class="bg-rently-purple-light/40 backdrop-blur-sm rounded-3xl p-6 flex flex-col">
          <h3 class="text-2xl font-bold text-white mb-6">
            Expand your<br>options
          </h3>

          <!-- Property Image with Logos -->
          <div class="bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl mb-6 h-64 flex items-center justify-center relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
              alt="Luxury property"
              class="w-full h-full object-cover absolute inset-0"
            />
            <!-- Logo overlays -->
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/20">
              <div class="bg-white px-6 py-3 rounded-lg shadow-lg">
                <span class="font-bold text-gray-800 text-lg">dubizzle</span>
              </div>
              <div class="bg-white px-6 py-3 rounded-lg shadow-lg">
                <span class="font-bold text-teal-600 text-lg">bayut</span>
              </div>
              <div class="bg-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
                <span class="text-red-500 text-xl">▶</span>
                <span class="font-bold text-gray-800">Property<br>Finder</span>
              </div>
            </div>
          </div>

          <p class="text-white/90 leading-relaxed mt-auto">
            You can rent monthly with properties that come from any landlord, agent or rental platform.
          </p>
        </div>

        <!-- Card 3 - Move in immediately -->
        <div class="bg-rently-purple-light/40 backdrop-blur-sm rounded-3xl p-6 flex flex-col">
          <h3 class="text-2xl font-bold text-white mb-6">
            Move in<br>immediately
          </h3>

          <!-- Couple Image -->
          <div class="rounded-2xl mb-6 h-64 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"
              alt="Happy couple in new home"
              class="w-full h-full object-cover"
            />
          </div>

          <p class="text-white/90 leading-relaxed mt-auto">
            Secure your new home quickly without waiting to save up for a full year's rent.
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
