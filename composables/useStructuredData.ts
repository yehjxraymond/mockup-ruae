import { SEO_DEFAULTS, ORGANIZATION_SCHEMA } from '~/utils/seo/constants'

type JsonLdSchema = Record<string, unknown>

/**
 * Base composable to inject JSON-LD structured data
 */
export const useStructuredData = (schema: JsonLdSchema | JsonLdSchema[]) => {
  const jsonLd = Array.isArray(schema) ? schema : [schema]

  useHead({
    script: jsonLd.map((item) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(item),
    })),
  })
}

/**
 * Organization schema for homepage
 */
export const useOrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION_SCHEMA.name,
    legalName: ORGANIZATION_SCHEMA.legalName,
    url: ORGANIZATION_SCHEMA.url,
    logo: ORGANIZATION_SCHEMA.logo,
    description: ORGANIZATION_SCHEMA.description,
    foundingDate: ORGANIZATION_SCHEMA.foundingDate,
    sameAs: ORGANIZATION_SCHEMA.sameAs,
    contactPoint: ORGANIZATION_SCHEMA.contactPoint,
    address: ORGANIZATION_SCHEMA.address,
  }

  useStructuredData(schema)
}

/**
 * WebSite schema with search action
 */
export const useWebSiteSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_DEFAULTS.siteName,
    url: SEO_DEFAULTS.siteUrl,
    description: SEO_DEFAULTS.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_DEFAULTS.siteUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  useStructuredData(schema)
}

export interface FAQItem {
  question: string
  answer: string
}

/**
 * FAQPage schema
 * @param faqs - Array of FAQ items (required)
 */
export const useFAQSchema = (faqs: FAQItem[]) => {
  if (faqs.length === 0) return

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  useStructuredData(schema)
}

export interface ArticleOptions {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
  section?: string
}

/**
 * Article schema for blog posts
 */
export const useArticleSchema = (options: ArticleOptions) => {
  const {
    title,
    description,
    url,
    image = SEO_DEFAULTS.defaultImage,
    datePublished,
    dateModified,
    author = ORGANIZATION_SCHEMA.name,
    section,
  } = options

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: ORGANIZATION_SCHEMA.url,
    },
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION_SCHEMA.name,
      logo: {
        '@type': 'ImageObject',
        url: ORGANIZATION_SCHEMA.logo,
      },
    },
    ...(section && { articleSection: section }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  useStructuredData(schema)
}

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Breadcrumb navigation schema
 */
export const useBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  useStructuredData(schema)
}
