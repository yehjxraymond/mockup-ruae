# Dynamic Sitemap Generation

Uses `@nuxtjs/sitemap` for automatic sitemap generation with support for dynamic routes.

## Files

| File | Purpose |
|------|---------|
| [nuxt.config.ts](../nuxt.config.ts) | Sitemap module config |
| [server/api/__sitemap__/blog-urls.ts](../server/api/__sitemap__/blog-urls.ts) | Dynamic blog URL source |

---

## How It Works

1. **Static pages** - Auto-discovered from `/pages` directory
2. **Dynamic pages** - Generated via sitemap sources in `/server/api/__sitemap__/`

The sitemap is available at `/sitemap.xml`.

---

## Configuration

In [nuxt.config.ts](../nuxt.config.ts):

```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots'],

  site: {
    url: 'https://www.rently-uae.com',
    name: 'Rently UAE',
  },

  sitemap: {
    sources: ['/api/__sitemap__/blog-urls'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
    },
  },

  robots: {
    sitemap: '/sitemap.xml',
  },
})
```

---

## Adding Dynamic Sources

Create a file in `/server/api/__sitemap__/` that returns URL entries.

### Example: Blog posts ([blog-urls.ts](../server/api/__sitemap__/blog-urls.ts))

```typescript
const blogPosts = [
  { slug: 'article-one', date: '2026-01-15' },
  { slug: 'article-two', date: '2026-01-20' },
]

export default defineSitemapEventHandler(async () => {
  return blogPosts.map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'monthly' as const,
    priority: 0.7,
  }))
})
```

### Example: Location pages (future)

```typescript
// /server/api/__sitemap__/location-urls.ts
export default defineSitemapEventHandler(async () => {
  const locations = await fetchLocationsFromCMS()

  return locations.map((loc) => ({
    loc: `/locations/${loc.slug}`,
    lastmod: loc.updatedAt,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))
})
```

Then add to `nuxt.config.ts`:

```typescript
sitemap: {
  sources: [
    '/api/__sitemap__/blog-urls',
    '/api/__sitemap__/location-urls',  // Add new source
  ],
}
```

---

## URL Entry Options

| Field | Type | Description |
|-------|------|-------------|
| `loc` | `string` | URL path (e.g., `/blog/slug`) |
| `lastmod` | `string` | Last modified date (ISO format) |
| `changefreq` | `string` | `daily`, `weekly`, `monthly`, `yearly` |
| `priority` | `number` | 0.0 to 1.0 (1.0 = most important) |

---

## Adding New Page Types (pSEO)

1. Create page: `/pages/[type]/[slug].vue`
2. Create sitemap source: `/server/api/__sitemap__/[type]-urls.ts`
3. Add source to `nuxt.config.ts` sitemap.sources array
4. Add structured data schemas in the page component

---

## Verification

- View sitemap: `https://www.rently-uae.com/sitemap.xml`
- View robots.txt: `https://www.rently-uae.com/robots.txt`
- Submit to [Google Search Console](https://search.google.com/search-console)
