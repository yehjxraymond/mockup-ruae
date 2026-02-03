// Use case pages data for sitemap
// When adding new JSON files to /data/uses/, add the slug here as well
const useCaseSlugs = [
  'pay-rent-with-credit-card',
  'rent-loan-alternative',
]

export default defineSitemapEventHandler(async () => {
  return useCaseSlugs.map((slug) => ({
    loc: `/uses/${slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))
})
