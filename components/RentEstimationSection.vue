<template>
  <section id="calculator" class="py-20 bg-rently-purple">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-400 rounded-3xl p-8 md:p-12">
        <h2 class="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Your rent estimation
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Annual Rent -->
          <div>
            <label class="block text-white font-semibold mb-2">Annual rent</label>
            <p class="text-white/80 text-sm mb-3">Enter the total rent amount that is due to the landlord.</p>
            <div class="relative">
              <input
                v-model.number="formData.annualRent"
                @input="calculateMonthlyRent"
                type="number"
                class="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="100000"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">AED</span>
            </div>
          </div>

          <!-- Number of Cheques -->
          <div>
            <label class="block text-white font-semibold mb-2">Number of cheques</label>
            <p class="text-white/80 text-sm mb-3">Select how many cheques Rently will pay to the landlord.</p>
            <div class="flex gap-3">
              <button
                v-for="num in [1, 2, 3, 4, 6]"
                :key="num"
                type="button"
                @click="selectCheques(num)"
                :class="[
                  'flex-1 py-4 rounded-xl font-semibold transition-all',
                  formData.cheque === num
                    ? 'bg-white text-purple-600'
                    : 'bg-purple-700/50 text-white hover:bg-purple-700'
                ]"
              >
                {{ num }}
              </button>
            </div>
          </div>

          <!-- Est. Monthly Rent -->
          <div>
            <label class="block text-white font-semibold mb-2">Est. monthly rent</label>
            <p class="text-white/80 text-sm mb-3">Incl. service fee</p>
            <div class="relative">
              <input
                :value="estimatedRent ? estimatedRent.toFixed(2) : ''"
                type="text"
                readonly
                class="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 font-semibold"
                placeholder="0"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">AED</span>
            </div>
          </div>

          <!-- Lease Duration -->
          <div>
            <label class="block text-white font-semibold mb-2">Lease duration (in months)</label>
            <div class="relative">
              <input
                v-model.number="formData.leaseDuration"
                type="number"
                class="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter lease duration"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">Months</span>
            </div>
          </div>

          <!-- Security Deposit Payer -->
          <div>
            <label class="block text-white font-semibold mb-2">Who will pay the security deposit?</label>
            <select
              v-model="formData.depositPayer"
              class="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white appearance-none"
            >
              <option value="">Select the payer</option>
              <option value="rently">Rently</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>

          <!-- Income Question -->
          <div>
            <label class="block text-white font-semibold mb-2">Do you earn at least AED 7,000 a month?</label>
            <p class="text-white/80 text-sm mb-3">We currently require a minimum monthly income to proceed with an application.</p>
            <div class="flex gap-4">
              <button
                type="button"
                @click="formData.hasIncome = true"
                :class="[
                  'flex-1 py-4 rounded-xl font-semibold transition-all',
                  formData.hasIncome === true
                    ? 'bg-white text-purple-600'
                    : 'bg-purple-700/50 text-white hover:bg-purple-700'
                ]"
              >
                Yes
              </button>
              <button
                type="button"
                @click="formData.hasIncome = false"
                :class="[
                  'flex-1 py-4 rounded-xl font-semibold transition-all',
                  formData.hasIncome === false
                    ? 'bg-white text-purple-600'
                    : 'bg-purple-700/50 text-white hover:bg-purple-700'
                ]"
              >
                No
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-white/30 pt-8">
            <h3 class="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Enter your details
            </h3>
          </div>

          <!-- First Name -->
          <div>
            <label class="block text-white font-semibold mb-2">First Name</label>
            <input
              v-model="formData.firstName"
              type="text"
              required
              class="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter first name"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label class="block text-white font-semibold mb-2">Last Name</label>
            <input
              v-model="formData.lastName"
              type="text"
              required
              class="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter last name"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-white font-semibold mb-2">Email address</label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter email address"
            />
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block text-white font-semibold mb-2">Phone number</label>
            <div class="flex gap-2">
              <select class="px-4 py-4 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white">
                <option value="+971">🇦🇪 +971</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+65">🇸🇬 +65</option>
              </select>
              <input
                v-model="formData.phone"
                type="tel"
                required
                class="flex-1 px-4 py-4 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-white font-semibold mb-2">Location of the unit</label>
            <p class="text-white/80 text-sm mb-3">In which city is the property you want to rent.</p>
            <select
              v-model="formData.location"
              class="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white appearance-none"
            >
              <option value="">Select city</option>
              <option value="dubai">Dubai</option>
              <option value="abu-dhabi">Abu Dhabi</option>
              <option value="sharjah">Sharjah</option>
              <option value="ajman">Ajman</option>
            </select>
          </div>

          <!-- Move-in Date -->
          <div>
            <label class="block text-white font-semibold mb-2">Move-in date</label>
            <p class="text-white/80 text-sm mb-3">Indicate your expected move-in date or renewal date.</p>
            <input
              v-model="formData.moveInDate"
              type="date"
              class="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <p class="text-white/80 text-center text-sm">All information can be changed later.</p>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-5 bg-rently-teal text-white font-bold text-lg rounded-xl hover:bg-rently-teal/90 transition-all"
          >
            Submit my details
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const formData = ref({
  annualRent: 100000,
  cheque: 1,
  leaseDuration: null as number | null,
  depositPayer: '',
  hasIncome: null as boolean | null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  moveInDate: ''
})

const estimatedRent = ref<number | null>(null)
const isCalculating = ref(false)

const selectCheques = (num: number) => {
  formData.value.cheque = num
  calculateMonthlyRent()
}

const calculateMonthlyRent = async () => {
  if (!formData.value.annualRent || formData.value.annualRent < 1) {
    estimatedRent.value = null
    return
  }

  isCalculating.value = true

  try {
    const result = await $fetch('/api/calculate-rent', {
      method: 'POST',
      body: {
        annualRent: formData.value.annualRent,
        cheque: formData.value.cheque
      }
    })

    estimatedRent.value = Number(result)
  } catch (error) {
    console.error('Failed to calculate rent:', error)
    estimatedRent.value = null
  } finally {
    isCalculating.value = false
  }
}

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  alert('Application submitted successfully!')
}

// Calculate initial rent on mount
onMounted(() => {
  calculateMonthlyRent()
})
</script>
