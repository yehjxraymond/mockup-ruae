// Blog posts data - scaffolded for CMS integration
// Replace with CMS fetch when ready: const posts = await fetchPostsFromCMS()
const blogPosts = [
  {
    slug: 'how-to-rent-without-deposit',
    date: '2026-02-02',
  },
  {
    slug: 'dubai-rental-market-2026',
    date: '2026-01-28',
  },
  {
    slug: 'first-time-renters-guide',
    date: '2026-01-25',
  },
  {
    slug: 'managing-monthly-rent-payments',
    date: '2026-01-22',
  },
  {
    slug: 'choosing-right-neighborhood',
    date: '2026-01-18',
  },
  {
    slug: 'rental-contract-tips',
    date: '2026-01-15',
  },
]

export default defineSitemapEventHandler(async () => {
  return blogPosts.map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'monthly' as const,
    priority: 0.7,
  }))
})
