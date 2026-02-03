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

export interface UseCaseComparison {
  title: string
}

export interface UseCaseHowItWorks {
  title: string
  subtitle: string
}

export interface UseCaseEligibility {
  title: string
  subtitle?: string
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

export interface UseCaseCTA {
  title: string
  buttonText?: string
}

export interface UseCasePageData {
  meta: UseCaseMeta
  seo: UseCaseSEO
  hero: UseCaseHero
  comparison?: UseCaseComparison
  howItWorks?: UseCaseHowItWorks
  eligibility?: UseCaseEligibility
  features?: UseCaseFeatures
  faqs: FAQItem[]
  cta: UseCaseCTA
}
