<template>
  <div class="min-h-screen bg-white">
    <!-- Article Header -->
    <div class="bg-rently-purple">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
        >
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
          Back to Blog
        </NuxtLink>

        <div class="flex flex-wrap items-center gap-2 mb-4">
          <NuxtLink
            v-for="tag in post.tags"
            :key="tag.id"
            :to="{ path: '/blog', query: { tag: tag.name } }"
            class="text-sm font-semibold text-white bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
          >
            {{ tag.name }}
          </NuxtLink>
          <span class="text-sm text-white/80">{{ formattedDate }}</span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          {{ post.title }}
        </h1>

        <p v-if="post.description" class="text-xl text-white/90">
          {{ post.description }}
        </p>
      </div>
    </div>

    <!-- Article Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <!-- Main Content -->
        <article class="lg:col-span-8">
          <div class="prose prose-lg max-w-none" v-html="processedHtml" />

          <!-- CTA -->
          <div class="mt-12 p-8 bg-rently-purple rounded-2xl text-center">
            <h3 class="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p class="text-white/80 mb-6">Join thousands of renters who are already enjoying flexible payments</p>
            <NuxtLink
              to="/#apply"
              class="inline-block px-8 py-4 bg-rently-teal text-rently-purple font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Apply Now
            </NuxtLink>
          </div>
        </article>

        <!-- Table of Contents Sidebar -->
        <aside class="hidden lg:block lg:col-span-4">
          <BlogTableOfContents :items="tableOfContents" />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'
import { generateTableOfContents } from '@wisp-cms/table-of-content'
import { SEO_DEFAULTS } from '~/utils/seo/constants'
import { wisp } from '~/utils/blog/wisp'

const route = useRoute()
const slug = route.params.slug as string

const { data } = await useAsyncData(`blog-post-${slug}`, () => wisp.getPost(slug))

if (!data.value?.post) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const post = data.value.post

const sanitizedContent = sanitizeHtml(post.content, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'figure',
    'figcaption',
    'iframe',
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    a: ['href', 'target', 'rel'],
    iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen'],
    '*': ['id', 'class'],
  },
})

const { modifiedHtml: processedHtml, tableOfContents } = generateTableOfContents(sanitizedContent)

const formattedDate = post.publishedAt
  ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  : ''

const articleUrl = `${SEO_DEFAULTS.siteUrl}/blog/${slug}`
const dateISO = post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : ''

useSEO({
  title: post.title,
  description: post.description || undefined,
  image: post.image || undefined,
  type: 'article',
  publishedTime: dateISO,
  modifiedTime: new Date(post.updatedAt).toISOString().split('T')[0],
})

useArticleSchema({
  title: post.title,
  description: post.description || '',
  url: articleUrl,
  image: post.image || undefined,
  datePublished: dateISO,
  dateModified: new Date(post.updatedAt).toISOString().split('T')[0],
})

useBreadcrumbSchema([
  { name: 'Home', url: SEO_DEFAULTS.siteUrl },
  { name: 'Blog', url: `${SEO_DEFAULTS.siteUrl}/blog` },
  { name: post.title, url: articleUrl },
])
</script>

<style scoped>
.prose {
  @apply text-gray-700;
}

.prose :deep(h1) {
  @apply text-4xl font-bold text-gray-900 mt-8 mb-4;
}

.prose :deep(h2) {
  @apply text-3xl font-bold text-gray-900 mt-8 mb-4;
}

.prose :deep(h3) {
  @apply text-2xl font-semibold text-gray-900 mt-6 mb-3;
}

.prose :deep(h4) {
  @apply text-xl font-semibold text-gray-900 mt-6 mb-3;
}

.prose :deep(p) {
  @apply mb-4 leading-relaxed;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply mb-4 ml-6;
}

.prose :deep(ul) {
  @apply list-disc;
}

.prose :deep(ol) {
  @apply list-decimal;
}

.prose :deep(li) {
  @apply mb-2;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-rently-purple pl-4 italic text-gray-600 my-6;
}

.prose :deep(img) {
  @apply rounded-lg my-6 max-w-full h-auto;
}

.prose :deep(table) {
  @apply w-full border-collapse my-6;
}

.prose :deep(th),
.prose :deep(td) {
  @apply border border-gray-300 px-4 py-2 text-left;
}

.prose :deep(th) {
  @apply bg-gray-100 font-semibold;
}

.prose :deep(pre) {
  @apply bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto;
}

.prose :deep(code) {
  @apply bg-gray-100 text-rently-purple px-1.5 py-0.5 rounded text-sm;
}

.prose :deep(pre code) {
  @apply bg-transparent text-gray-100 p-0;
}

.prose :deep(a) {
  @apply text-rently-purple underline hover:text-rently-teal transition-colors;
}
</style>
