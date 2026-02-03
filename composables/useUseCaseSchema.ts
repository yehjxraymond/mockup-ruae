import { SEO_DEFAULTS, ORGANIZATION_SCHEMA } from '~/utils/seo/constants'

export interface UseCaseSchemaOptions {
  title: string
  description: string
  url: string
  keyword: string
  includeHowTo?: boolean
}

// Static steps for HowTo schema
const HOW_TO_STEPS = [
  { stepNumber: 1, title: 'Share details (1min)', description: 'Enter your rent, income and authenticate with UAE pass.' },
  { stepNumber: 2, title: 'Upload documents (2min)', description: 'Add your tenancy agreement, proof of income and credit report.' },
  { stepNumber: 3, title: 'We review (1 day)', description: 'We check your application, then you sign the contract and add payment details.' },
  { stepNumber: 4, title: 'We pay your landlord', description: 'Your landlord receives the full rental payment on the due date.' },
]

export const useUseCaseSchema = (options: UseCaseSchemaOptions) => {
  const { title, description, url, keyword, includeHowTo = true } = options

  const schemas: Record<string, unknown>[] = []

  // WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: SEO_DEFAULTS.siteName,
      url: SEO_DEFAULTS.siteUrl,
    },
    about: {
      '@type': 'Service',
      name: `Rently - ${keyword}`,
      description,
      provider: {
        '@type': 'Organization',
        name: ORGANIZATION_SCHEMA.name,
        url: ORGANIZATION_SCHEMA.url,
      },
    },
    mainEntity: {
      '@type': 'Service',
      name: title,
      description,
      provider: {
        '@type': 'Organization',
        name: ORGANIZATION_SCHEMA.name,
      },
      areaServed: {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
    },
  }
  schemas.push(webPageSchema)

  // HowTo schema
  if (includeHowTo) {
    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to ${keyword} with Rently`,
      description: `Step-by-step guide to ${keyword} using Rently's flexible rent payment service.`,
      step: HOW_TO_STEPS.map((step) => ({
        '@type': 'HowToStep',
        position: step.stepNumber,
        name: step.title,
        text: step.description,
      })),
      totalTime: 'PT24H',
      tool: [
        {
          '@type': 'HowToTool',
          name: 'Emirates ID',
        },
        {
          '@type': 'HowToTool',
          name: 'Tenancy Contract',
        },
      ],
    }
    schemas.push(howToSchema)
  }

  useStructuredData(schemas)
}
