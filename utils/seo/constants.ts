export const SEO_DEFAULTS = {
  siteName: 'Rently UAE',
  siteUrl: 'https://www.rently-uae.com',
  defaultTitle: 'Split Annual Rent into Monthly Payments | Rently UAE',
  defaultDescription: 'Rent now, pay later. Split your annual rent into manageable monthly payments with Rently. No large upfront deposits required. Available across UAE.',
  defaultImage: 'https://www.rently-uae.com/og-image.jpg',
  twitterHandle: '@rentlyuae',
  locale: 'en_AE',
}

export const ORGANIZATION_SCHEMA = {
  name: 'Rently UAE',
  legalName: 'Prime Refin Real Estate L.L.C',
  url: 'https://www.rently-uae.com',
  logo: 'https://www.rently-uae.com/logo.png',
  description: 'Rently helps UAE residents split their annual rent into monthly payments, eliminating the need for large upfront deposits.',
  foundingDate: '2024',
  tradeLicense: 'TL: 1381941',
  sameAs: [
    'https://www.linkedin.com/company/rentlyhome/',
    'https://www.instagram.com/rentlyuae/',
    'https://www.facebook.com/p/Rently-UAE-61568632090962/',
    'https://www.youtube.com/@rentlystories',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'sales@rently-uae.com',
    areaServed: 'AE',
    availableLanguage: ['English', 'Arabic'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Alsafi 1 #204-52, Al Marrer',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    addressCountry: 'AE',
  },
}

export const STATIC_PAGES = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 },
  { loc: '/blog', changefreq: 'daily', priority: 0.8 },
]

export const FAQ_DATA = [
  {
    question: 'Who is eligible to use Rently?',
    answer: 'Rently is available to residents and expats in the UAE with a valid Emirates ID, steady income, and good credit history. We accept salaried employees, self-employed individuals, and business owners who meet our verification criteria.',
  },
  {
    question: 'What if I need to terminate my rental agreement early?',
    answer: 'If you need to terminate your rental agreement early, please contact our support team. We work with you and your landlord to find the best solution. Early termination terms depend on your rental contract and may be subject to fees as outlined in your agreement.',
  },
  {
    question: 'Can I use Rently without paying a deposit?',
    answer: "Yes! That's exactly what Rently does. We cover your security deposit upfront to the landlord, and you pay us back in manageable monthly installments over the course of your rental period. This means you don't need to have a large sum available upfront.",
  },
  {
    question: 'Does Rently charge any fees?',
    answer: 'Rently charges a transparent service fee for facilitating your rental payment and covering your deposit. All fees are clearly disclosed upfront during the application process, with no hidden charges. The exact fee depends on your rental amount and payment plan.',
  },
  {
    question: 'What types of properties can I rent with Rently?',
    answer: "Rently works with a wide range of properties including apartments, villas, townhouses, and studios across the UAE. We partner with major property developers and landlords in Dubai, Abu Dhabi, and other emirates. If your desired property isn't already in our network, we can work with your landlord to onboard them.",
  },
]
