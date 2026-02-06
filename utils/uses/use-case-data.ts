import type { UseCasePageData } from './types'

interface UseCaseJsonData {
  cta: string
  faqs: Array<{ question: string; answer: string }>
  hero: {
    title: string
    subtitle: string
    image?: string
  }
  features?: {
    title: string
    subtitle?: string
    featureIds: string[]
  }
  metaTitle: string
  metaDescription: string
  howItWorks?: {
    title: string
    subtitle: string
  }
  eligibility?: {
    title: string
    subtitle?: string
  }
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

const useCaseModules = import.meta.glob<{ default: UseCaseJsonFile }>(
  '~/data/uses/*.json',
  { eager: true }
)

function getSlugFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.json$/)
  return match ? match[1] : ''
}

function transformToPageData(json: UseCaseJsonFile): UseCasePageData {
  const { data } = json

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
      title: json.h1,
      subtitle: data.hero.subtitle,
      ctaText: 'Get Started Today',
      heroImage: data.hero.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop',
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

export function getAllUseCaseSlugs(): string[] {
  return Object.keys(useCaseModules).map(getSlugFromPath).filter(Boolean)
}

export function getAllUseCases(): UseCasePageData[] {
  return Object.values(useCaseModules).map((module) => transformToPageData(module.default))
}

export function getUseCasesByCategory(): Record<string, UseCasePageData[]> {
  const useCases = getAllUseCases()
  const grouped: Record<string, UseCasePageData[]> = {}

  for (const useCase of useCases) {
    const category = useCase.meta.category
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(useCase)
  }

  return grouped
}
