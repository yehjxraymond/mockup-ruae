# Programmatic SEO Landing Pages - Implementation Guide

## Overview

This document describes the architecture for programmatic SEO (pSEO) landing pages at `/uses/[slug]`. The system allows creating keyword-targeted landing pages by adding JSON data files - no code changes required for new pages.

**Goal**: Enable marketing/content teams to create SEO landing pages (e.g., "pay rent with credit card", "rent loan alternative") without developer involvement after initial setup.

---

## Key Concepts

### 1. Data-Driven Pages

Each landing page is driven by a JSON file. The JSON contains only **dynamic content** (titles, descriptions, FAQs, feature selections). **Static content** (comparison table rows, how-it-works steps, eligibility requirements) lives in the components themselves.

This separation means:
- JSON files stay lean and focused on SEO-relevant content
- Structural changes happen in one place (components)
- Non-technical users can create pages by copying/modifying JSON

### 2. Feature Selection System

Instead of defining feature content in each JSON file, features are defined once in a component with unique IDs. JSON files reference features by ID:

```json
"featureIds": ["move-in-immediately", "new-to-uae", "security-deposit"]
```

This ensures consistency across pages and makes it easy to reuse features.

### 3. Static Sitemap Registration

Due to Vite's `import.meta.glob` not working server-side, sitemap URLs are registered via a static array. New pages require adding the slug to this array.

### 4. Anchor-Based CTAs

All CTA buttons link to `#calculator` (the rent estimation section on the same page). This is hardcoded in components rather than configurable in JSON, ensuring consistent user flow.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        JSON Data Files                          │
│                     (data/uses/*.json)                          │
│         Dynamic content: titles, FAQs, feature IDs              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Data Loader                              │
│                (utils/uses/use-case-data.ts)                    │
│         Uses import.meta.glob to load all JSON files            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Page Template                              │
│                   (pages/uses/[slug].vue)                       │
│           Fetches data, sets SEO meta, renders layout           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Master Layout Component                      │
│              (components/uses/UsesPageContent.vue)              │
│         Orchestrates all sections based on data presence        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Section Components                          │
│   Hero | Comparison | HowItWorks | Eligibility | Features | CTA │
│        Mix of dynamic props and static internal content         │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Reference

### Types & Utilities

| File | Purpose |
|------|---------|
| `utils/uses/types.ts` | TypeScript interfaces for JSON schema |
| `utils/uses/use-case-data.ts` | Data loader using `import.meta.glob` |

### Pages

| File | Purpose |
|------|---------|
| `pages/uses/[slug].vue` | Dynamic route - loads data, sets SEO, renders content |
| `pages/uses/index.vue` | Hub page listing all use cases grouped by category |

### Components

| File | Purpose | Dynamic Props | Static Content |
|------|---------|---------------|----------------|
| `components/uses/UsesPageContent.vue` | Master layout orchestrating all sections | Entire `data` object | Section order |
| `components/uses/UsesHeroSection.vue` | Hero with headline, subtitle, CTA, image | `hero` object | CTA link (`#calculator`) |
| `components/uses/UsesSocialProofSection.vue` | Logo carousel | None | All logos |
| `components/uses/UsesComparisonTable.vue` | "Why choose us" comparison | `title` only | Headers, rows |
| `components/HowItWorksSection.vue` | 4-step process | `title`, `subtitle` | All 4 steps |
| `components/uses/UsesEligibilitySection.vue` | Requirements & documents | `title`, `subtitle` | Requirements, documents list |
| `components/uses/UsesFeaturesSection.vue` | Swipeable feature cards | `title`, `subtitle`, `featureIds` | Feature definitions |
| `components/uses/UsesCTASection.vue` | Final call-to-action | `cta` object | Link (`#calculator`), tagline |
| `components/FAQSection.vue` | Expandable FAQ accordion | `faqs`, `title`, `subtitle` | Contact link |

### Data

| File | Purpose |
|------|---------|
| `data/uses/*.json` | One JSON file per landing page |

### SEO & Sitemap

| File | Purpose |
|------|---------|
| `composables/useUseCaseSchema.ts` | Generates structured data (WebPage, HowTo schemas) |
| `server/api/__sitemap__/uses-urls.ts` | Sitemap source - **requires manual slug registration** |

---

## Data Schema

See `utils/uses/types.ts` for the complete TypeScript interface.

**Required fields:**
- `meta` - slug, title, keyword, category
- `seo` - title, description
- `hero` - title, subtitle, ctaText
- `faqs` - array of question/answer pairs
- `cta` - title

**Optional sections** (omit to hide):
- `comparison` - just needs `title`
- `howItWorks` - needs `title` and `subtitle`
- `eligibility` - needs `title`, optional `subtitle`
- `features` - needs `title`, `subtitle`, and `featureIds` array

**Example JSON**: See `data/uses/pay-rent-with-credit-card.json`

---

## Adding a New Page

1. **Create JSON file** at `data/uses/[slug].json`
   - Copy an existing file as template
   - Update all content fields

2. **Register in sitemap** at `server/api/__sitemap__/uses-urls.ts`
   - Add the new slug to the `useCaseSlugs` array

3. **Done** - Page is live at `/uses/[slug]`

---

## Adding a New Feature

Features are defined in `components/uses/UsesFeaturesSection.vue` in the `allFeatures` object.

1. Add new entry with unique ID:
```typescript
'your-feature-id': {
  id: 'your-feature-id',
  title: 'Feature Title',
  description: 'Feature description text.',
  image: 'https://...', // or use icon instead
}
```

2. Reference in JSON files:
```json
"featureIds": ["your-feature-id", "other-feature"]
```

**Current feature IDs**: See `components/uses/UsesFeaturesSection.vue` lines 82-140

---

## Modifying Static Content

| To change... | Edit this file |
|--------------|----------------|
| Comparison table rows | `components/uses/UsesComparisonTable.vue` |
| How-it-works steps | `components/HowItWorksSection.vue` |
| Eligibility requirements | `components/uses/UsesEligibilitySection.vue` |
| Feature definitions | `components/uses/UsesFeaturesSection.vue` |
| Social proof logos | `components/uses/UsesSocialProofSection.vue` |
| CTA tagline | `components/uses/UsesCTASection.vue` |

---

## Design Decisions

### Why static content in components?

**Decision**: Keep comparison rows, steps, and eligibility requirements in components rather than JSON.

**Rationale**:
- This content rarely changes per-page
- Reduces JSON complexity and potential for errors
- Single source of truth for structural content
- JSON focuses on SEO-relevant dynamic content

### Why manual sitemap registration?

**Decision**: Slugs are manually listed in the sitemap handler.

**Rationale**:
- `import.meta.glob` doesn't work in server-side code
- Avoids complex workarounds or build-time generation
- Simple enough for low-volume page creation
- Explicit control over what's in sitemap

### Why anchor links for CTAs?

**Decision**: All CTAs link to `#calculator` rather than being configurable.

**Rationale**:
- Consistent user journey across all pages
- Reduces JSON complexity
- Calculator section is always present
- Easy to change globally if needed

---

## Checklist for Implementation

- [ ] Copy `utils/uses/types.ts`
- [ ] Copy `utils/uses/use-case-data.ts`
- [ ] Copy all `components/uses/*.vue` components
- [ ] Update `components/HowItWorksSection.vue` and `components/FAQSection.vue` to accept props
- [ ] Copy `pages/uses/[slug].vue` and `pages/uses/index.vue`
- [ ] Copy `composables/useUseCaseSchema.ts` (optional, for structured data)
- [ ] Create `server/api/__sitemap__/uses-urls.ts`
- [ ] Update `nuxt.config.ts` to include sitemap source
- [ ] Copy `data/uses/*.json` files
- [ ] Ensure Tailwind colors (`rently-purple`, `rently-teal`, etc.) are defined
- [ ] Ensure `RentEstimationSection` component exists with `id="calculator"`
