<template>
  <section class="py-20 bg-gradient-to-b from-pink-400 via-purple-400 to-teal-400">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
          Request an application
        </h2>
        <p class="text-xl text-gray-600 text-center mb-8">
          Get started in minutes
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name and Email -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                placeholder="John Doe"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rently-purple focus:border-transparent bg-white"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="john@example.com"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rently-purple focus:border-transparent bg-white"
              />
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              placeholder="+971 50 123 4567"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rently-purple focus:border-transparent bg-white"
            />
          </div>

          <!-- Rent and Property Type -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="rent" class="block text-sm font-semibold text-gray-700 mb-2">
                Annual Rent (AED) *
              </label>
              <input
                id="rent"
                v-model="formData.rent"
                type="number"
                placeholder="50000"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rently-purple focus:border-transparent bg-white"
              />
              <p v-if="monthlyPayment" class="mt-2 text-sm text-gray-600">
                Monthly: <span class="font-bold text-rently-purple">AED {{ monthlyPayment }}</span>
              </p>
            </div>

            <div>
              <label for="propertyType" class="block text-sm font-semibold text-gray-700 mb-2">
                Property Type *
              </label>
              <select
                id="propertyType"
                v-model="formData.propertyType"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rently-purple focus:border-transparent bg-white"
              >
                <option value="">Select type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="studio">Studio</option>
              </select>
            </div>
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-semibold text-gray-700 mb-2">
              Property Location
            </label>
            <input
              id="location"
              v-model="formData.location"
              type="text"
              placeholder="Dubai Marina"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rently-purple focus:border-transparent bg-white"
            />
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              rows="4"
              placeholder="Tell us more about your requirements..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rently-purple focus:border-transparent bg-white"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              class="w-full px-8 py-4 bg-rently-teal text-white font-semibold rounded-full hover:bg-rently-teal/90 transform hover:scale-[1.02] transition-all"
            >
              Submit Application
            </button>
          </div>

          <!-- Terms -->
          <p class="text-sm text-gray-500 text-center">
            By submitting, you agree to our
            <a href="#" class="text-rently-purple hover:underline">Terms of Service</a>
            and
            <a href="#" class="text-rently-purple hover:underline">Privacy Policy</a>
          </p>
        </form>

        <!-- Success Message -->
        <div
          v-if="submitted"
          class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center"
        >
          <Icon name="heroicons:check-circle" class="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p class="text-green-700 font-semibold">Application submitted successfully!</p>
          <p class="text-green-600 text-sm mt-1">We'll get back to you within 24 hours.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const formData = ref({
  rent: '',
  name: '',
  email: '',
  phone: '',
  propertyType: '',
  location: '',
  message: ''
})

const submitted = ref(false)

const monthlyPayment = computed(() => {
  if (!formData.value.rent || isNaN(Number(formData.value.rent))) return null
  return Math.round(Number(formData.value.rent) / 12).toLocaleString()
})

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  submitted.value = true

  setTimeout(() => {
    submitted.value = false
    formData.value = {
      rent: '',
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      location: '',
      message: ''
    }
  }, 5000)
}
</script>
