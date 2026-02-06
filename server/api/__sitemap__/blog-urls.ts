import { buildWispClient } from '@wisp-cms/client'

const wisp = buildWispClient({
  blogId: 'clvxv39ma00002zbc7j4heyj1',
})

export default defineSitemapEventHandler(async () => {
  const { posts } = await wisp.getPosts({ limit: 'all' })

  return posts.map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.updatedAt ? new Date(post.updatedAt).toISOString().split('T')[0] : undefined,
    changefreq: 'monthly' as const,
    priority: 0.7,
  }))
})
