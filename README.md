# Rently Homepage Clone

A complete clone of the Rently UAE homepage built with Nuxt 3, showcasing modern rental payment solutions with a component-based architecture.

## Features

- 🎨 Beautiful gradient design (Purple #753ac3 to Teal #40d9b0)
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast performance with Nuxt 3
- 🎯 SEO-ready with metadata composables
- 🧩 Component-based architecture
- 📝 Blog functionality with dynamic routes
- 🎨 Tailwind CSS for styling
- 🔍 Search functionality for blog posts

## Project Structure

```
rently-mock/
├── components/
│   ├── NavigationBar.vue          # Header with country selector
│   ├── FooterComponent.vue        # Footer with links and social
│   ├── HeroSection.vue            # Hero with CTA
│   ├── HowItWorksSection.vue      # 4-step process
│   ├── ValuePropositionsSection.vue # 3 value props
│   ├── PaymentFlexibilitySection.vue # Payment feature
│   ├── DepositFeatureSection.vue  # Deposit coverage
│   ├── TrustedPartnersSection.vue # Partner logos
│   ├── CompanyStatsSection.vue    # Company stats
│   ├── FAQSection.vue             # Accordion FAQ
│   └── ApplicationFormSection.vue # Rent calculator form
├── pages/
│   ├── index.vue                  # Homepage
│   └── blog/
│       ├── index.vue              # Blog listing
│       └── [slug].vue             # Blog post detail
├── composables/
│   └── useSEO.ts                  # SEO metadata utility
├── layouts/
│   └── default.vue                # Default layout
└── assets/css/
    └── main.css                   # Global styles

```

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Visit http://localhost:3000 to see the homepage.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Generate Static Site

```bash
# Generate static site
npm run generate
```

## Routes

- `/` - Homepage with all sections
- `/blog` - Blog listing page with search
- `/blog/[slug]` - Individual blog post pages

## Key Technologies

- **Nuxt 3** - Vue.js framework
- **Vue 3** - Progressive JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Nuxt Icon** - Icon library integration
- **TypeScript** - Type safety

## Color Palette

- **Primary Purple**: `#753ac3`
- **Primary Teal**: `#40d9b0`
- **Dark Background**: `#1a1a2e`
- **Gradient**: Linear gradient from purple to teal

## Components Overview

### Navigation & Layout
- **NavigationBar**: Sticky header with country selector, menu links, and mobile hamburger menu
- **FooterComponent**: Four-column footer with company info, resources, legal links, and newsletter signup

### Homepage Sections
- **HeroSection**: Eye-catching hero with gradient background and CTA buttons
- **HowItWorksSection**: 4-card grid explaining the rental process
- **ValuePropositionsSection**: 3 value proposition cards highlighting key benefits
- **PaymentFlexibilitySection**: Split layout showcasing payment flexibility
- **DepositFeatureSection**: Reverse split layout explaining deposit coverage
- **TrustedPartnersSection**: Partner logos and trust indicators
- **CompanyStatsSection**: Company statistics with gradient background
- **FAQSection**: Accordion-style FAQ with smooth animations
- **ApplicationFormSection**: Rent calculator and contact form

## SEO Features

- Meta tags configured with `useSEO` composable
- Open Graph tags for social sharing
- Twitter Card metadata
- Proper heading hierarchy
- Descriptive alt text for images

## Programmatic SEO Foundation

The component structure is designed to support programmatic SEO landing pages:

1. All components accept props for dynamic content
2. Centralized SEO composable for metadata generation
3. Can easily create location-based pages like:
   - `/rent-in-dubai`
   - `/rent-in-abu-dhabi`
   - `/properties-in-[area]`

## Customization

### Adding New Sections

1. Create a new component in `components/`
2. Import and add to `pages/index.vue`
3. Use Tailwind classes for styling

### Modifying Colors

Update `tailwind.config.js` with new color values:

```js
theme: {
  extend: {
    colors: {
      'rently-purple': '#753ac3',
      'rently-teal': '#40d9b0',
      'rently-dark': '#1a1a2e',
    }
  }
}
```

### Adding Blog Posts

Edit `pages/blog/index.vue` to add more posts to the `posts` array:

```js
const posts = ref([
  {
    slug: 'your-post-slug',
    title: 'Your Post Title',
    excerpt: 'Post description...',
    category: 'Category',
    date: 'Date',
  },
])
```

## Future Enhancements

- [ ] Connect application form to backend API
- [ ] Add real images and content
- [ ] Implement CMS integration
- [ ] Create programmatic SEO landing pages
- [ ] Add analytics tracking
- [ ] Implement user authentication
- [ ] Add animation on scroll
- [ ] Optimize images with Nuxt Image

## License

This is a demonstration project for showcasing Nuxt 3 capabilities.

## Credits

Built with Nuxt 3 and Tailwind CSS
