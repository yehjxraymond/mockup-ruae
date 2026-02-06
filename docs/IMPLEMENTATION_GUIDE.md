# Programmatic SEO Landing Pages - Implementation Guide

This guide provides step-by-step instructions for implementing programmatic SEO (pSEO) landing pages on the production Rently website. This is based on a prototype implementation that demonstrates the required patterns and features.

## Goal

Implement the pSEO system and make the following 4 pages live:
- `/uses/12-cheque-rent`
- `/uses/rent-assistance`
- `/uses/rent-emi`
- `/uses/rent-loan-alternative-dubai`

**After implementation, please notify Raymond for review.**

---

## Quick Implementation Checklist

Use this checklist to track progress:

### Core Implementation
- [ ] Create `data/uses/` folder with JSON data files
- [ ] Create `utils/uses/types.ts` with TypeScript interfaces
- [ ] Create `utils/uses/use-case-data.ts` with data loader (auto-discovery)
- [ ] Create `pages/uses/[slug].vue` dynamic page template
- [ ] Create `pages/uses/index.vue` hub page
- [ ] Create all section components in `components/uses/`
- [ ] Create `server/api/__sitemap__/uses-urls.ts` (dynamic discovery)
- [ ] Add sitemap source to `nuxt.config.ts`
- [ ] Create `composables/useUseCaseSchema.ts` for structured data

### SEO Requirements
- [ ] Meta title populated from `data.metaTitle`
- [ ] Meta description populated from `data.metaDescription`
- [ ] OG image populated (use default or page-specific)
- [ ] JSON-LD: BreadcrumbList schema
- [ ] JSON-LD: FAQPage schema
- [ ] JSON-LD: WebPage schema
- [ ] JSON-LD: HowTo schema

### Feature Requirements
- [ ] Pages auto-discovered from JSON files (no manual routing)
- [ ] Sitemap auto-discovers pages from `data/uses/` folder
- [ ] Hero image: uses default unless `data.hero.image` is provided
- [ ] Features section: shows ALL features
- [ ] Features section: `featureIds` determines initial ordering
- [ ] Features section: mobile shows 1 card at a time
- [ ] Features section: tablet/desktop shows 3 cards at a time with swipe

---

## Step 1: Data Layer Setup

### 1.1 Create Folder Structure

```
your-project/
├── data/
│   └── uses/
│       ├── 12-cheque-rent.json
│       ├── rent-assistance.json
│       ├── rent-emi.json
│       └── rent-loan-alternative-dubai.json
```

### 1.2 Data Shape

Each JSON file has two levels: **top-level metadata** and a **`data` object** for page content.

```json
{
  "keyword": "rent assistance",
  "slug": "rent-assistance",
  "anchor": "Rent Assistance",
  "title": "Rent Assistance | Pay Rent Monthly in the UAE | Rently",
  "description": "Meta description (for reference)",
  "h1": "Rent Assistance for Your New Home in the UAE",
  "paragraph": "Supporting paragraph (for reference)",
  "category": "default",
  "data": {
    "cta": "Get Rent Assistance Now",
    "faqs": [
      {
        "question": "How does Rently's rent assistance work?",
        "answer": "Rently pays your annual rent directly to your landlord..."
      }
    ],
    "hero": {
      "title": "Alternative title (NOT used - h1 is used instead)",
      "subtitle": "Rently pays your full annual rent upfront...",
      "image": "https://example.com/optional-image.jpg"
    },
    "features": {
      "title": "Flexible Rent Solutions for UAE Tenants",
      "subtitle": "Optional subtitle text",
      "featureIds": ["move-in-immediately", "security-deposit", "no-bank-account"]
    },
    "metaTitle": "Rent Assistance | Pay Rent Monthly in the UAE | Rently",
    "metaDescription": "Rent assistance in the UAE is now easier...",
    "howItWorks": {
      "title": "How Rent Assistance Works With Rently",
      "subtitle": "Rently transforms your annual rent into convenient monthly payments."
    },
    "eligibility": {
      "title": "Who Can Apply for Rent Assistance",
      "subtitle": "Rently's rent assistance is available to tenants in the UAE..."
    },
    "comparisonTitle": "Why Choose Rently for Rent Assistance"
  }
}
```

### 1.3 Field Mapping (IMPORTANT)

When multiple fields could serve the same purpose, use the correct one:

| Purpose | Use This Field | DO NOT Use |
|---------|---------------|------------|
| **H1 / Hero Title** | `h1` (top-level) | `data.hero.title` |
| **Hero Subtitle** | `data.hero.subtitle` | - |
| **Hero Image** | `data.hero.image` (optional) | - |
| **Meta Title** | `data.metaTitle` | `title` (top-level) |
| **Meta Description** | `data.metaDescription` | `description` (top-level) |
| **Hub Page Title** | `anchor` (top-level) | - |
| **Primary Keyword** | `keyword` (top-level) | - |
| **URL Slug** | `slug` (top-level) | - |
| **CTA Title** | `data.cta` (string) | - |

### 1.4 TypeScript Types

Create `utils/uses/types.ts`:

```typescript
export interface UseCaseMeta {
  slug: string
  title: string
  keyword: string
  category: string
}

export interface UseCaseSEO {
  title: string
  description: string
}

export interface UseCaseHero {
  title: string
  subtitle: string
  ctaText: string
  heroImage?: string
}

export interface UseCaseFeatures {
  title: string
  subtitle?: string
  featureIds: string[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface UseCasePageData {
  meta: UseCaseMeta
  seo: UseCaseSEO
  hero: UseCaseHero
  comparison?: { title: string }
  howItWorks?: { title: string; subtitle: string }
  eligibility?: { title: string; subtitle?: string }
  features?: UseCaseFeatures
  faqs: FAQItem[]
  cta: { title: string; buttonText?: string }
}
```

### 1.5 Data Loader with Auto-Discovery

Create `utils/uses/use-case-data.ts`:

```typescript
import type { UseCasePageData } from './types'

// Define the raw JSON structure
interface UseCaseJsonData {
  cta: string
  faqs: Array<{ question: string; answer: string }>
  hero: { title: string; subtitle: string; image?: string }
  features?: { title: string; subtitle?: string; featureIds: string[] }
  metaTitle: string
  metaDescription: string
  howItWorks?: { title: string; subtitle: string }
  eligibility?: { title: string; subtitle?: string }
  comparisonTitle?: string
}

interface UseCaseJsonFile {
  keyword: string
  slug: string
  anchor: string
  title: string
  h1: string
  category: string
  data: UseCaseJsonData
}

// Auto-discover all JSON files in data/uses/
const useCaseModules = import.meta.glob<{ default: UseCaseJsonFile }>(
  '~/data/uses/*.json',
  { eager: true }
)

function getSlugFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.json$/)
  return match ? match[1] : ''
}

// Transform raw JSON to page data format
function transformToPageData(json: UseCaseJsonFile): UseCasePageData {
  const { data } = json
  const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop'

  return {
    meta: {
      slug: json.slug,
      title: json.anchor,
      keyword: json.keyword,
      category: json.category,
    },
    seo: {
      title: data.metaTitle,
      description: data.metaDescription,
    },
    hero: {
      title: json.h1,  // Use top-level h1, NOT data.hero.title
      subtitle: data.hero.subtitle,
      ctaText: 'Get Started Today',
      heroImage: data.hero.image || DEFAULT_HERO_IMAGE,
    },
    comparison: data.comparisonTitle ? { title: data.comparisonTitle } : undefined,
    howItWorks: data.howItWorks,
    eligibility: data.eligibility,
    features: data.features,
    faqs: data.faqs,
    cta: {
      title: data.cta,
      buttonText: 'Apply Now',
    },
  }
}

export function getUseCaseData(slug: string): UseCasePageData | null {
  for (const [path, module] of Object.entries(useCaseModules)) {
    if (getSlugFromPath(path) === slug) {
      return transformToPageData(module.default)
    }
  }
  return null
}

export function getAllUseCases(): UseCasePageData[] {
  return Object.values(useCaseModules).map((module) => transformToPageData(module.default))
}
```

---

## Step 2: Dynamic Page Template

Create `pages/uses/[slug].vue`:

```vue
<template>
  <div>
    <UsesPageContent v-if="pageData" :data="pageData" />

    <!-- 404 fallback -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Page Not Found</h1>
        <NuxtLink to="/uses">View All Use Cases</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUseCaseData } from '~/utils/uses/use-case-data'
import { SEO_DEFAULTS } from '~/utils/seo/constants'
import { useUseCaseSchema } from '~/composables/useUseCaseSchema'

const route = useRoute()
const slug = route.params.slug as string
const pageData = getUseCaseData(slug)

if (pageData) {
  const pageUrl = `${SEO_DEFAULTS.siteUrl}/uses/${slug}`

  // Meta tags
  useSEO({
    title: pageData.seo.title,
    description: pageData.seo.description,
    keywords: [pageData.meta.keyword, 'rent payment', 'UAE', 'Dubai'],
  })

  // JSON-LD: BreadcrumbList
  useBreadcrumbSchema([
    { name: 'Home', url: SEO_DEFAULTS.siteUrl },
    { name: 'Use Cases', url: `${SEO_DEFAULTS.siteUrl}/uses` },
    { name: pageData.meta.title, url: pageUrl },
  ])

  // JSON-LD: FAQPage
  useFAQSchema(pageData.faqs)

  // JSON-LD: WebPage + HowTo
  useUseCaseSchema({
    title: pageData.seo.title,
    description: pageData.seo.description,
    url: pageUrl,
    keyword: pageData.meta.keyword,
    includeHowTo: !!pageData.howItWorks,
  })
}
</script>
```

---

## Step 3: Sitemap Auto-Discovery

### 3.1 Create Sitemap Source

Create `server/api/__sitemap__/uses-urls.ts`:

```typescript
import { readdirSync } from 'fs'
import { join } from 'path'

// Dynamically discover pages from data/uses/ folder
function getUseCaseSlugs(): string[] {
  const dataDir = join(process.cwd(), 'data/uses')
  try {
    const files = readdirSync(dataDir)
    return files
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''))
  } catch {
    return []
  }
}

export default defineSitemapEventHandler(async () => {
  const slugs = getUseCaseSlugs()
  return slugs.map((slug) => ({
    loc: `/uses/${slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))
})
```

### 3.2 Add to nuxt.config.ts

```typescript
sitemap: {
  sources: [
    '/api/__sitemap__/blog-urls',
    '/api/__sitemap__/uses-urls',  // Add this line
  ],
  defaults: {
    changefreq: 'weekly',
    priority: 0.8,
  },
},
```

---

## Step 4: SEO Implementation

### 4.1 Meta Tags

The `useSEO` composable should set:
- `<title>` tag
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta property="og:image">` (use default OG image)

### 4.2 JSON-LD Structured Data

Create `composables/useUseCaseSchema.ts` for WebPage and HowTo schemas:

```typescript
export const useUseCaseSchema = (options: {
  title: string
  description: string
  url: string
  keyword: string
  includeHowTo?: boolean
}) => {
  const schemas: Record<string, unknown>[] = []

  // WebPage schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.title,
    description: options.description,
    url: options.url,
    mainEntity: {
      '@type': 'Service',
      name: options.title,
      description: options.description,
      areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
    },
  })

  // HowTo schema (if howItWorks section exists)
  if (options.includeHowTo) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to ${options.keyword} with Rently`,
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Share details', text: '...' },
        { '@type': 'HowToStep', position: 2, name: 'Upload documents', text: '...' },
        { '@type': 'HowToStep', position: 3, name: 'We review', text: '...' },
        { '@type': 'HowToStep', position: 4, name: 'We pay your landlord', text: '...' },
      ],
    })
  }

  useStructuredData(schemas)
}
```

### 4.3 Required JSON-LD Schemas

Each page must include:

| Schema | Source | Purpose |
|--------|--------|---------|
| **BreadcrumbList** | `useBreadcrumbSchema()` | Navigation hierarchy |
| **FAQPage** | `useFAQSchema(faqs)` | FAQ rich results |
| **WebPage** | `useUseCaseSchema()` | Page metadata |
| **HowTo** | `useUseCaseSchema()` | How-to rich results |

---

## Step 5: Features Section Implementation

### 5.1 Behavior Requirements

The features section must:

1. **Show ALL features** - Not just those in `featureIds`
2. **Order by `featureIds` first** - Listed features appear first
3. **Append remaining features** - Unlisted features come after
4. **Responsive carousel**:
   - Mobile: 1 card at a time, swipe to navigate
   - Tablet/Desktop: 3 cards at a time, swipe for more pages

### 5.2 Implementation Logic

```typescript
// In UsesFeaturesSection.vue
const allFeatures = { /* all feature definitions */ }

const orderedFeatures = computed(() => {
  // 1. Get features specified in featureIds (in order)
  const prioritized = props.featureIds
    .map(id => allFeatures[id])
    .filter(Boolean)

  // 2. Get remaining features not in featureIds
  const prioritizedIds = new Set(props.featureIds)
  const remaining = Object.values(allFeatures)
    .filter(f => !prioritizedIds.has(f.id))

  // 3. Combine: prioritized first, then remaining
  return [...prioritized, ...remaining]
})

// For desktop: chunk into pages of 3
const featurePages = computed(() => {
  const pages = []
  for (let i = 0; i < orderedFeatures.value.length; i += 3) {
    pages.push(orderedFeatures.value.slice(i, i + 3))
  }
  return pages
})
```

### 5.3 Hero Image Override

```typescript
// In data transformation
heroImage: data.hero.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop'
```

- If `data.hero.image` is provided, use it
- Otherwise, use the default Unsplash image

---

## Testing Checklist

After implementation, verify each item:

### Page Rendering
- [ ] `/uses/12-cheque-rent` renders correctly
- [ ] `/uses/rent-assistance` renders correctly
- [ ] `/uses/rent-emi` renders correctly
- [ ] `/uses/rent-loan-alternative-dubai` renders correctly
- [ ] Adding a new JSON file auto-creates the page (no code changes needed)

### Sitemap
- [ ] `/sitemap.xml` includes all 4 use case URLs
- [ ] Adding a new JSON file auto-updates sitemap

### Hero Section
- [ ] H1 displays from top-level `h1` field (not `data.hero.title`)
- [ ] Subtitle displays from `data.hero.subtitle`
- [ ] Default hero image shows when `data.hero.image` is not provided
- [ ] Custom hero image shows when `data.hero.image` is provided

### Features Section
- [ ] ALL features are displayed (not just those in `featureIds`)
- [ ] Features in `featureIds` appear first in order
- [ ] Remaining features appear after
- [ ] Mobile: Shows 1 card at a time with swipe dots
- [ ] Tablet/Desktop: Shows 3 cards at a time with swipe dots

### SEO - Meta Tags
- [ ] `<title>` matches `data.metaTitle`
- [ ] `<meta name="description">` matches `data.metaDescription`
- [ ] `<meta property="og:title">` is populated
- [ ] `<meta property="og:description">` is populated
- [ ] `<meta property="og:image">` is populated

### SEO - JSON-LD (check in page source or browser dev tools)
- [ ] BreadcrumbList schema present with correct hierarchy
- [ ] FAQPage schema present with all FAQ items
- [ ] WebPage schema present with correct title/description
- [ ] HowTo schema present (when howItWorks section exists)

### Validation Tools
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) passes
- [ ] No console errors on page load

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `data/uses/*.json` | Page data (auto-discovered) |
| `utils/uses/types.ts` | TypeScript interfaces |
| `utils/uses/use-case-data.ts` | Data loader with transformation |
| `pages/uses/[slug].vue` | Dynamic page template |
| `pages/uses/index.vue` | Hub page listing all use cases |
| `components/uses/UsesPageContent.vue` | Main page layout |
| `components/uses/UsesHeroSection.vue` | Hero with image |
| `components/uses/UsesFeaturesSection.vue` | Features carousel |
| `server/api/__sitemap__/uses-urls.ts` | Sitemap auto-discovery |
| `composables/useUseCaseSchema.ts` | WebPage + HowTo schemas |
| `nuxt.config.ts` | Sitemap source configuration |

---

## Data Files to Deploy

Copy these 4 JSON files to `data/uses/`:

1. `12-cheque-rent.json`
2. `rent-assistance.json`
3. `rent-emi.json`
4. `rent-loan-alternative-dubai.json`

---

## Post-Implementation

Once all items in the testing checklist pass:

1. Deploy to staging/production
2. Verify pages are accessible:
   - `https://www.rently-uae.com/uses/12-cheque-rent`
   - `https://www.rently-uae.com/uses/rent-assistance`
   - `https://www.rently-uae.com/uses/rent-emi`
   - `https://www.rently-uae.com/uses/rent-loan-alternative-dubai`
3. Verify sitemap includes all pages: `https://www.rently-uae.com/sitemap.xml`
4. **Notify Raymond for review**

---

## Common Pitfalls

1. **Using wrong field for H1**: Use `h1` (top-level), not `data.hero.title`
2. **Hardcoding sitemap slugs**: Must dynamically read from `data/uses/` folder
3. **Only showing `featureIds` features**: Must show ALL features, with `featureIds` only controlling order
4. **Missing JSON-LD schemas**: All 4 schemas (Breadcrumb, FAQ, WebPage, HowTo) are required
5. **Not setting OG image**: Must have a default OG image for social sharing
