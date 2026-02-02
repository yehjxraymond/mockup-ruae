import { SEO_DEFAULTS } from '~/utils/seo/constants'

export interface SEOOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  canonical?: string
  noindex?: boolean
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  section?: string
  author?: string
}

export const useSEO = (options: SEOOptions = {}) => {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  const {
    title,
    description,
    image,
    url,
    type = 'website',
    canonical,
    noindex = false,
    keywords,
    publishedTime,
    modifiedTime,
    section,
    author,
  } = options

  const siteUrl = runtimeConfig.public.siteUrl || SEO_DEFAULTS.siteUrl
  const fullTitle = title
    ? `${title} | ${SEO_DEFAULTS.siteName}`
    : SEO_DEFAULTS.defaultTitle
  const fullDescription = description || SEO_DEFAULTS.defaultDescription
  const fullImage = image || SEO_DEFAULTS.defaultImage
  const canonicalUrl = canonical || `${siteUrl}${route.path}`
  const pageUrl = url || canonicalUrl

  const meta: Array<{ name?: string; property?: string; content: string }> = [
    { name: 'description', content: fullDescription },
    // Open Graph
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: fullDescription },
    { property: 'og:type', content: type },
    { property: 'og:url', content: pageUrl },
    { property: 'og:image', content: fullImage },
    { property: 'og:site_name', content: SEO_DEFAULTS.siteName },
    { property: 'og:locale', content: SEO_DEFAULTS.locale },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: fullDescription },
    { name: 'twitter:image', content: fullImage },
    { name: 'twitter:site', content: SEO_DEFAULTS.twitterHandle },
  ]

  // Add noindex if specified
  if (noindex) {
    meta.push({ name: 'robots', content: 'noindex, nofollow' })
  }

  // Add keywords if provided
  if (keywords && keywords.length > 0) {
    meta.push({ name: 'keywords', content: keywords.join(', ') })
  }

  // Article-specific meta tags
  if (type === 'article') {
    if (publishedTime) {
      meta.push({ property: 'article:published_time', content: publishedTime })
    }
    if (modifiedTime) {
      meta.push({ property: 'article:modified_time', content: modifiedTime })
    }
    if (section) {
      meta.push({ property: 'article:section', content: section })
    }
    if (author) {
      meta.push({ property: 'article:author', content: author })
    }
  }

  useHead({
    title: fullTitle,
    meta,
    link: [{ rel: 'canonical', href: canonicalUrl }],
  })
}
