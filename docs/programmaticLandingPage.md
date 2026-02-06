# Programmatic SEO Landing Pages

This document describes how to create and manage programmatic SEO (pSEO) landing pages for the Rently UAE website. These pages are designed to target specific keywords like "pay rent with credit card", "rent loan alternative", etc.

## Overview

Landing pages are located at `/uses/[slug]` and are driven by JSON data files. Adding a new page is as simple as creating a new JSON file - the system automatically handles routing, sitemap generation, and the hub page listing.

## File Structure

```
rently-mock/
├── data/uses/                     # JSON data files for each page
│   ├── 12-cheque-rent.json
│   └── rent-loan-alternative.json
├── pages/uses/
│   ├── index.vue                  # Hub page listing all use cases
│   └── [slug].vue                 # Dynamic page template
├── components/uses/               # Page section components
│   ├── UsesPageContent.vue        # Master layout component
│   ├── UsesHeroSection.vue
│   ├── UsesSocialProofSection.vue
│   ├── UsesComparisonTable.vue
│   ├── UsesEligibilitySection.vue
│   ├── UsesFeaturesSection.vue
│   └── UsesCTASection.vue
├── utils/uses/
│   ├── types.ts                   # TypeScript interfaces
│   └── use-case-data.ts           # Data loader utilities
├── composables/
│   └── useUseCaseSchema.ts        # Structured data for SEO
└── server/api/__sitemap__/
    └── uses-urls.ts               # Sitemap source
```

## Creating a New Page

Create a new file at `data/uses/[your-slug].json` following the schema below.

That's it! The page will automatically be:
- Available at `/uses/your-new-slug`
- Listed on the hub page (`/uses`)
- Included in the sitemap (auto-discovered from `data/uses/` folder)

---

## Data Schema

### Complete JSON Structure

The JSON file has two levels: **top-level metadata** and a **`data` object** containing page content.

```json
{
  "keyword": "primary seo keyword",
  "slug": "your-page-slug",
  "anchor": "Display Title for Hub Page",
  "title": "Full Page Title",
  "h1": "Main H1 Headline for Hero",
  "paragraph": "Supporting paragraph text",
  "category": "default",
  "data": {
    "cta": "Ready to Get Started?",
    "faqs": [
      {
        "question": "Your question here?",
        "answer": "Detailed answer to the question."
      }
    ],
    "hero": {
      "title": "Alternative hero title (not used, see h1)",
      "subtitle": "Supporting copy that expands on the headline and value proposition.",
      "image": "https://images.unsplash.com/photo-xxx?w=600&h=800&fit=crop"
    },
    "features": {
      "title": "Rently is expat friendly",
      "subtitle": "Features designed for modern renters.",
      "featureIds": ["move-in-immediately", "new-to-uae", "security-deposit"]
    },
    "metaTitle": "SEO Meta Title - Browser Tab Title",
    "metaDescription": "Meta description for search engines, 150-160 characters recommended.",
    "howItWorks": {
      "title": "How Rently helps you split payments?",
      "subtitle": "Get started in minutes with our simple 4-step process."
    },
    "eligibility": {
      "title": "Eligibility Requirements",
      "subtitle": "Check if you qualify for Rently's flexible rent payment solution."
    },
    "comparisonTitle": "Why choose Rently for splitting rental?"
  }
}
```

---

## Field Mapping & Priority

When multiple fields could serve the same purpose, here's which field is used:

| Purpose | Field Used | NOT Used |
|---------|------------|----------|
| **H1 / Hero Title** | `h1` (top-level) | `data.hero.title` |
| **Hero Subtitle** | `data.hero.subtitle` | - |
| **Hero Image** | `data.hero.image` (optional, has default) | - |
| **Meta Title** | `data.metaTitle` | `title` (top-level) |
| **Meta Description** | `data.metaDescription` | `description` (top-level) |
| **Hub Page Title** | `anchor` (top-level) | - |
| **Primary Keyword** | `keyword` (top-level) | - |
| **URL Slug** | `slug` (top-level) | - |
| **Category** | `category` (top-level) | - |
| **CTA Title** | `data.cta` (string) | - |
| **Comparison Title** | `data.comparisonTitle` (string) | - |

---

## Field Reference

### Top-Level Fields (required)

| Field | Type | Description |
|-------|------|-------------|
| `keyword` | string | Primary SEO keyword for the page |
| `slug` | string | URL path segment (e.g., `12-cheque-rent`) |
| `anchor` | string | Display title for hub page listings |
| `title` | string | Full page title (used for reference) |
| `h1` | string | **Main H1 headline displayed in hero section** |
| `paragraph` | string | Supporting paragraph (used for reference) |
| `category` | string | Category for grouping on hub page (e.g., `default`) |

### `data.hero` (required)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Alternative title (NOT used - `h1` is used instead) |
| `subtitle` | string | Yes | Supporting copy below headline |
| `image` | string | No | URL for hero image. Defaults to Unsplash image if not provided |

*Note: Hero CTA text defaults to "Get Started Today". CTA links to `#calculator`.*

### `data.cta` (required)

| Type | Description |
|------|-------------|
| string | CTA section headline (e.g., "Ready to Get Started?") |

*Note: Button text defaults to "Apply Now". CTA links to `#calculator`.*

### `data.metaTitle` & `data.metaDescription` (required)

| Field | Type | Description |
|-------|------|-------------|
| `metaTitle` | string | Browser tab title / meta title |
| `metaDescription` | string | Meta description (150-160 chars recommended) |

### `data.comparisonTitle` (optional)

| Type | Description |
|------|-------------|
| string | Section heading for comparison table |

*Note: Table headers and rows are static in the component.*

### `data.howItWorks` (optional)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | Yes | Subheading below title |

*Note: The 4 steps are static in the component.*

### `data.eligibility` (optional)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Subheading below title |

*Note: Requirements and documents list are static in the component.*

### `data.features` (optional)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Subheading below title |
| `featureIds` | string[] | Yes | Array of feature IDs to prioritize in ordering |

**Important:** The features section displays ALL available features. The `featureIds` array determines the **initial ordering** - features listed here appear first, followed by all remaining features.

**Available Feature IDs:**

| ID | Title |
|----|-------|
| `move-in-immediately` | Move in immediately |
| `new-to-uae` | New to the UAE? |
| `security-deposit` | Security deposit assistance |
| `sharia-compliant` | Sharia-compliant model |
| `property-pre-approval` | Property pre-approval |
| `choose-payment-method` | You choose how you pay rent |
| `no-bank-account` | Don't have a bank account yet? |
| `rent-increase-renewal` | Landlord increasing rent on renewal? |
| `earn-rewards` | Earn rewards on each rental payment |

**Display behavior:**
- **Mobile:** One card at a time, swipe to navigate
- **Desktop/Tablet:** 3 cards at a time, swipe to see more

### `data.faqs` (required)

Array of FAQ items:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `question` | string | Yes | The question |
| `answer` | string | Yes | The answer |

---

## Page Sections (in order)

1. **Hero Section** - Full-width hero with headline (`h1`), subtitle, CTA, and image
2. **Social Proof Section** - Logo carousel (static, shown on all pages)
3. **Comparison Table** - "Why choose Rently" comparison (static content)
4. **How It Works** - 4-step process (static content)
5. **Eligibility Section** - Requirements and documents (static content)
6. **Features Section** - All features displayed (ordered by `featureIds`, then remaining)
7. **Rent Calculator** - Interactive rent estimation form (static component)
8. **FAQ Section** - Expandable FAQ accordion
9. **CTA Section** - Final call-to-action

---

## Static vs Dynamic Content

To keep JSON files lean, some content is hardcoded in components:

| Section | Dynamic (from JSON) | Static (in component) |
|---------|--------------------|-----------------------|
| Hero | `h1`, `data.hero.subtitle`, `data.hero.image` | CTA text, CTA link (`#calculator`) |
| Comparison | `data.comparisonTitle` | headers, rows |
| How It Works | `data.howItWorks.title`, `subtitle` | 4 steps |
| Eligibility | `data.eligibility.title`, `subtitle` | requirements, documents |
| Features | `data.features.title`, `subtitle`, `featureIds` (ordering) | feature definitions, all features shown |
| FAQ | `data.faqs` | - |
| CTA | `data.cta` | button text, link (`#calculator`) |

---

## SEO Features

Each page automatically includes:
- Meta title and description (from `data.metaTitle`, `data.metaDescription`)
- Open Graph tags
- Breadcrumb structured data
- FAQ structured data (from `data.faqs` array)
- HowTo structured data
- WebPage/Service schema

---

## Example: Complete Page

```json
{
  "keyword": "12 cheque rent",
  "slug": "12-cheque-rent",
  "anchor": "12 Cheque Rent",
  "title": "12 Cheque Rent Options | Flexible Payments in UAE | Rently",
  "h1": "Flexible 12 Cheque Rent Alternatives",
  "paragraph": "Feeling strained by the 12 cheque rent system? Rently pays your full annual rent upfront.",
  "category": "default",
  "data": {
    "cta": "Get Started with Monthly Rent Payments",
    "faqs": [
      {
        "question": "How does Rently's 12 cheque rent alternative work?",
        "answer": "Rently's service works by paying your landlord the full annual rent upfront on your behalf, while you repay Rently in convenient monthly installments."
      }
    ],
    "hero": {
      "title": "Break Free From 12 Cheque Rent Payment Stress",
      "subtitle": "Rently pays your full annual rent upfront to your landlord while you repay in easy monthly installments."
    },
    "features": {
      "title": "A Better Way to Handle Rent in the UAE",
      "subtitle": "Rently transforms how you pay rent with innovative solutions.",
      "featureIds": ["move-in-immediately", "security-deposit", "choose-payment-method"]
    },
    "metaTitle": "12 Cheque Rent Options | Flexible Payments in UAE | Rently",
    "metaDescription": "12 cheque rent payments causing financial stress? Rently offers a better way.",
    "howItWorks": {
      "title": "Converting Annual Rent to Monthly Payments",
      "subtitle": "Rently simplifies the rental process by paying your landlord upfront."
    },
    "eligibility": {
      "title": "Who Can Use Rently for Rent Payments",
      "subtitle": "Our Rent Now, Pay Later service is available to tenants in the UAE."
    },
    "comparisonTitle": "Why Choose Rently Instead of 12 Cheque Rent"
  }
}
```

Note: The `h1` field ("Flexible 12 Cheque Rent Alternatives") is used for the hero title, NOT `data.hero.title`.
