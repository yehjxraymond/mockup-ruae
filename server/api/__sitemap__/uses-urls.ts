import { readdirSync } from 'fs'
import { join } from 'path'

// Dynamically discover use case pages from data/uses folder
function getUseCaseSlugs(): string[] {
  const dataDir = join(process.cwd(), 'data/uses')
  try {
    const files = readdirSync(dataDir)
    return files
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''))
  } catch {
    return []
  }
}

export default defineSitemapEventHandler(async () => {
  const slugs = getUseCaseSlugs()
  return slugs.map((slug) => ({
    loc: `/uses/${slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))
})
