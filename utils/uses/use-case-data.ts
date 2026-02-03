import type { UseCasePageData } from './types'

const useCaseModules = import.meta.glob<{ default: UseCasePageData }>(
  '~/data/uses/*.json',
  { eager: true }
)

function getSlugFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.json$/)
  return match ? match[1] : ''
}

export function getUseCaseData(slug: string): UseCasePageData | null {
  for (const [path, module] of Object.entries(useCaseModules)) {
    if (getSlugFromPath(path) === slug) {
      return module.default
    }
  }
  return null
}

export function getAllUseCaseSlugs(): string[] {
  return Object.keys(useCaseModules).map(getSlugFromPath).filter(Boolean)
}

export function getAllUseCases(): UseCasePageData[] {
  return Object.values(useCaseModules).map((module) => module.default)
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
