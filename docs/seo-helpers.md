# SEO Helpers

Composables for managing page metadata and structured data (JSON-LD).

## Files

| File | Purpose |
|------|---------|
| [composables/useSEO.ts](../composables/useSEO.ts) | Page meta tags, Open Graph, Twitter Cards |
| [composables/useStructuredData.ts](../composables/useStructuredData.ts) | JSON-LD structured data schemas |
| [utils/seo/constants.ts](../utils/seo/constants.ts) | Centralized SEO defaults and org data |

---

## useSEO

Sets page title, description, canonical URL, and social meta tags.

```typescript
useSEO({
  title: 'Page Title',           // Appended with " | Rently UAE"
  description: 'Page description',
  type: 'website',               // or 'article' for blog posts
})
```

### Article pages

For blog posts, add article-specific meta:

```typescript
useSEO({
  title: 'Article Title',
  description: 'Article excerpt',
  type: 'article',
  publishedTime: '2026-01-15',   // ISO date
  modifiedTime: '2026-01-20',    // Optional
  section: 'Category Name',
})
```

### Options

| Option | Type | Description |
|--------|------|-------------|
| `title` | `string` | Page title (auto-appends site name) |
| `description` | `string` | Meta description |
| `type` | `string` | `website` or `article` |
| `canonical` | `string` | Override canonical URL |
| `noindex` | `boolean` | Block search indexing |
| `keywords` | `string[]` | Meta keywords |
| `publishedTime` | `string` | Article publish date (ISO) |
| `modifiedTime` | `string` | Article modified date (ISO) |
| `section` | `string` | Article category |

---

## useStructuredData

Injects JSON-LD schemas for rich search results.

### Available schemas

| Composable | Use case |
|------------|----------|
| `useOrganizationSchema()` | Homepage only |
| `useWebSiteSchema()` | Homepage only |
| `useFAQSchema(faqs)` | Pages with FAQ sections |
| `useArticleSchema(options)` | Blog posts |
| `useBreadcrumbSchema(items)` | Any page with breadcrumbs |

### FAQ Schema

Requires an array of FAQ items:

```typescript
import { FAQ_DATA } from '~/utils/seo/constants'
import type { FAQItem } from '~/composables/useStructuredData'

// Use defaults from constants
useFAQSchema(FAQ_DATA)

// Or pass custom FAQs
const customFaqs: FAQItem[] = [
  { question: 'How does X work?', answer: 'X works by...' },
]
useFAQSchema(customFaqs)
```

### Article Schema

For blog posts:

```typescript
useArticleSchema({
  title: 'Article Title',
  description: 'Article excerpt',
  url: 'https://www.rently-uae.com/blog/slug',
  datePublished: '2026-01-15',
  section: 'Category',
})
```

### Breadcrumb Schema

```typescript
useBreadcrumbSchema([
  { name: 'Home', url: 'https://www.rently-uae.com' },
  { name: 'Blog', url: 'https://www.rently-uae.com/blog' },
  { name: 'Article Title', url: 'https://www.rently-uae.com/blog/slug' },
])
```

---

## Page Examples

### Homepage ([pages/index.vue](../pages/index.vue))

```typescript
import { FAQ_DATA } from '~/utils/seo/constants'

useSEO({ title: 'Split Annual Rent into Monthly Payments' })
useOrganizationSchema()
useWebSiteSchema()
useFAQSchema(FAQ_DATA)
```

### Blog Post ([pages/blog/[slug].vue](../pages/blog/[slug].vue))

```typescript
import { SEO_DEFAULTS } from '~/utils/seo/constants'

useSEO({
  title: article.title,
  description: article.excerpt,
  type: 'article',
  publishedTime: article.dateISO,
  section: article.category,
})

useArticleSchema({
  title: article.title,
  description: article.excerpt,
  url: `${SEO_DEFAULTS.siteUrl}/blog/${slug}`,
  datePublished: article.dateISO,
  section: article.category,
})

useBreadcrumbSchema([
  { name: 'Home', url: SEO_DEFAULTS.siteUrl },
  { name: 'Blog', url: `${SEO_DEFAULTS.siteUrl}/blog` },
  { name: article.title, url: articleUrl },
])
```

---

## Validation

Test structured data at [Google Rich Results Test](https://search.google.com/test/rich-results).
