export const useSEO = (options: {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}) => {
  const { title, description, image, url, type = 'website' } = options

  useHead({
    title: title || 'Rently | The better way to rent.',
    meta: [
      {
        name: 'description',
        content: description || 'Rent now, pay later. Split your rent into manageable monthly payments with Rently. No large upfront deposits required.'
      },
      // Open Graph
      {
        property: 'og:title',
        content: title || 'Rently | The better way to rent.'
      },
      {
        property: 'og:description',
        content: description || 'Rent now, pay later. Split your rent into manageable monthly payments with Rently.'
      },
      {
        property: 'og:type',
        content: type
      },
      ...(url ? [{ property: 'og:url', content: url }] : []),
      ...(image ? [{ property: 'og:image', content: image }] : []),
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: title || 'Rently | The better way to rent.'
      },
      {
        name: 'twitter:description',
        content: description || 'Rent now, pay later. Split your rent into manageable monthly payments with Rently.'
      },
      ...(image ? [{ name: 'twitter:image', content: image }] : []),
    ]
  })
}
