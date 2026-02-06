import { buildWispClient } from '@wisp-cms/client'

export const WISP_BLOG_ID = 'clvxv39ma00002zbc7j4heyj1'

export const wisp = buildWispClient({
  blogId: WISP_BLOG_ID,
})

export type { GetPostsResult, GetPostResult } from '@wisp-cms/client'
