# Programmatic SEO Landing Pages

This document describes how to create and manage programmatic SEO (pSEO) landing pages for the Rently UAE website. These pages are designed to target specific keywords like "pay rent with credit card", "rent loan alternative", etc.

## Overview

Landing pages are located at `/uses/[slug]` and are driven by JSON data files. Adding a new page is as simple as creating a new JSON file - the system automatically handles routing, sitemap generation, and the hub page listing.

## File Structure

```
rently-mock/
├── data/uses/                     # JSON data files for each page
│   ├── pay-rent-with-credit-card.json
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

### Step 1: Create the JSON Data File

Create a new file at `data/uses/[your-slug].json` following the schema below.

### Step 2: Add to Sitemap

Add the new slug to `server/api/__sitemap__/uses-urls.ts`:

```typescript
const useCaseSlugs = [
  'pay-rent-with-credit-card',
  'rent-loan-alternative',
  'your-new-slug',  // Add here
]
```

That's it! The page will automatically be available at `/uses/your-new-slug` and appear on the hub page.

---

## Data Schema

### Complete JSON Structure

```json
{
  "meta": {
    "slug": "your-page-slug",
    "title": "Display Title for Hub Page",
    "keyword": "primary seo keyword",
    "category": "category-slug"
  },
  "seo": {
    "title": "SEO Meta Title - Browser Tab Title",
    "description": "Meta description for search engines, 150-160 characters recommended."
  },
  "hero": {
    "title": "Main H1 Headline",
    "subtitle": "Supporting copy that expands on the headline and value proposition.",
    "ctaText": "Get Instant Quote",
    "heroImage": "https://images.unsplash.com/photo-xxx?w=600&h=800&fit=crop"
  },
  "comparison": {
    "title": "Why choose Rently for splitting rental?"
  },
  "howItWorks": {
    "title": "How Rently helps you split payments?",
    "subtitle": "Get started in minutes with our simple 4-step process."
  },
  "eligibility": {
    "title": "Eligibility Requirements",
    "subtitle": "Check if you qualify for Rently's flexible rent payment solution."
  },
  "features": {
    "title": "Rently is expat friendly",
    "subtitle": "Features designed for modern renters.",
    "featureIds": ["move-in-immediately", "new-to-uae", "security-deposit"]
  },
  "faqs": [
    {
      "question": "Your question here?",
      "answer": "Detailed answer to the question."
    }
  ],
  "cta": {
    "title": "Ready to Get Started?",
    "buttonText": "Apply Now"
  }
}
```

### Field Reference

#### `meta` (required)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | URL path segment (e.g., `pay-rent-with-credit-card`) |
| `title` | string | Yes | Display title for hub page listings |
| `keyword` | string | Yes | Primary SEO keyword for the page |
| `category` | string | Yes | Category for grouping on hub page |

**Categories used:**
- `payment-flexibility` - Payment method options
- `alternatives` - Alternative to traditional methods

#### `seo` (required)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Browser tab title / meta title |
| `description` | string | Yes | Meta description (150-160 chars recommended) |

#### `hero` (required)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Main H1 headline |
| `subtitle` | string | Yes | Supporting copy below headline |
| `ctaText` | string | Yes | Button text (e.g., "Get Instant Quote") |
| `heroImage` | string | No | URL for hero image (tall aspect ratio recommended) |

*Note: CTA links automatically point to `#calculator` (rent estimation section).*

#### `comparison` (optional)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |

*Note: Table headers and rows are static in the component.*

#### `howItWorks` (optional)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | Yes | Subheading below title |

*Note: The 4 steps are static in the component.*

#### `eligibility` (optional)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Subheading below title |

*Note: Requirements and documents list are static in the component.*

#### `features` (optional)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Subheading below title |
| `featureIds` | string[] | Yes | Array of feature IDs to display |

**Available Feature IDs:**
| ID | Title |
|----|-------|
| `move-in-immediately` | Move in immediately |
| `new-to-uae` | New to the UAE? |
| `new-to-uae-calendar` | New to the UAE? (calendar variant) |
| `security-deposit` | Security deposit assistance |
| `sharia-compliant` | Sharia-compliant model |
| `property-pre-approval` | Property pre-approval |
| `choose-payment-method` | You choose how you pay rent |
| `no-bank-account` | Don't have a bank account yet? |
| `rent-increase-renewal` | Landlord increasing rent on renewal? |
| `earn-rewards` | Earn rewards on each rental payment |

#### `faqs` (required)
Array of FAQ items:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `question` | string | Yes | The question |
| `answer` | string | Yes | The answer |

#### `cta` (required)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | CTA section headline |
| `buttonText` | string | No | Button text (defaults to "Get Instant Quote") |

*Note: CTA links automatically point to `#calculator`.*

---

## Page Sections (in order)

1. **Hero Section** - Full-width hero with headline, subtitle, CTA, and image
2. **Social Proof Section** - Logo carousel (static, shown on all pages)
3. **Comparison Table** - "Why choose Rently" comparison (static content)
4. **How It Works** - 4-step process (static content)
5. **Eligibility Section** - Requirements and documents (static content)
6. **Features Section** - Swipeable feature cards (selected via `featureIds`)
7. **Rent Calculator** - Interactive rent estimation form (static component)
8. **FAQ Section** - Expandable FAQ accordion
9. **CTA Section** - Final call-to-action

---

## Static vs Dynamic Content

To keep JSON files lean, some content is hardcoded in components:

| Section | Dynamic (from JSON) | Static (in component) |
|---------|--------------------|-----------------------|
| Hero | title, subtitle, ctaText, heroImage | CTA link (`#calculator`) |
| Comparison | title | headers, rows |
| How It Works | title, subtitle | 4 steps |
| Eligibility | title, subtitle | requirements, documents |
| Features | title, subtitle, featureIds | feature definitions |
| FAQ | all content | - |
| CTA | title, buttonText | link (`#calculator`) |

---

## SEO Features

Each page automatically includes:
- Meta title and description
- Open Graph tags
- Breadcrumb structured data
- FAQ structured data (from `faqs` array)
- HowTo structured data
- WebPage/Service schema

---

## Example: Minimal Page

```json
{
  "meta": {
    "slug": "rent-now-pay-later",
    "title": "Rent Now Pay Later",
    "keyword": "rent now pay later",
    "category": "payment-flexibility"
  },
  "seo": {
    "title": "Rent Now Pay Later in UAE | Rently",
    "description": "Split your annual rent into monthly payments with Rently's rent now pay later solution in Dubai and UAE."
  },
  "hero": {
    "title": "Rent Now, Pay Later",
    "subtitle": "Move into your dream home today and spread your rent payments over 12 months.",
    "ctaText": "Get Instant Quote"
  },
  "faqs": [
    {
      "question": "How does rent now pay later work?",
      "answer": "Rently pays your landlord upfront and you repay us in convenient monthly installments."
    }
  ],
  "cta": {
    "title": "Ready to Move In?"
  }
}
```

This minimal example will still render a full page with all static sections included.
