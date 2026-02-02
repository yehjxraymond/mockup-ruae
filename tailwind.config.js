/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'rently-purple': '#1E0D3A',
        'rently-purple-light': '#7B3FB8',
        'rently-teal': '#00D9B0',
        'rently-dark': '#2D1552',
        'rently-darker': '#1E0D3A',
      },
      backgroundImage: {
        'rently-gradient': 'linear-gradient(180deg, #FF6B9D 0%, #00D9B0 100%)',
        'rently-gradient-alt': 'linear-gradient(135deg, #7B3FB8 0%, #00D9B0 100%)',
      },
    },
  },
  plugins: [],
}
