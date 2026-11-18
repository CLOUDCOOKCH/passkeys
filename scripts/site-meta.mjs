import { readFile, writeFile } from 'node:fs/promises'
import { loadEnv } from 'vite'

const env = loadEnv('production', process.cwd(), 'VITE_')
const origin = new URL(env.VITE_SITE_ORIGIN || 'https://cloudcookch.github.io')
if (!['http:', 'https:'].includes(origin.protocol))
  throw new Error('VITE_SITE_ORIGIN must be an HTTP(S) origin')
const base = new URL((env.VITE_BASE_PATH || '/passkeys/').replace(/\/?$/, '/'), origin.origin)
const xml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
const locales = [
  {
    folder: '',
    language: 'de-CH',
    code: 'de',
    title: 'Passkeys verstehen – der interaktive Lernguide',
  },
  {
    folder: 'en/',
    language: 'en',
    code: 'en',
    title: 'Understand passkeys – an interactive learning guide',
  },
]
const links = locales.map(({ folder, language }) => ({ url: new URL(folder, base).href, language }))
for (const { folder, language, code, title } of locales) {
  const file = 'dist/' + folder + 'index.html'
  const url = new URL(folder, base).href
  const graphic = new URL('share-' + code + '.png', base).href
  const data = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    inLanguage: language,
    url,
    learningResourceType: 'interactive tutorial',
    isAccessibleForFree: true,
  }).replaceAll('<', '\\u003c')
  const tags = [
    '<link rel="canonical" href="' + xml(url) + '">',
    ...links.map(
      (link) =>
        '<link rel="alternate" hreflang="' + link.language + '" href="' + xml(link.url) + '">',
    ),
    '<link rel="alternate" hreflang="x-default" href="' + xml(base.href) + '">',
    '<meta property="og:url" content="' + xml(url) + '">',
    '<meta property="og:image" content="' + xml(graphic) + '">',
    '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">',
    '<script type="application/ld+json">' + data + '</script>',
  ]
  const html = await readFile(file, 'utf8')
  await writeFile(file, html.replace('</head>', tags.join('\n') + '\n</head>'))
}
await writeFile(
  'dist/sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    links.map((link) => '  <url><loc>' + xml(link.url) + '</loc></url>').join('\n') +
    '\n</urlset>\n',
)
await writeFile(
  'dist/robots.txt',
  'User-agent: *\nAllow: /\nSitemap: ' + new URL('sitemap.xml', base).href + '\n',
)
