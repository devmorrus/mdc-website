/**
 * Generate sitemap.xml dan robots.txt untuk kebutuhan SEO (mdc-website).
 *
 * - Static routes diambil dari daftar di bawah (mirror dari src/App.tsx).
 * - Detail portfolio (/portfolio/:slug) diambil otomatis dari
 *   src/data/portfolio.static.ts agar slug baru ikut ke-sitemap tanpa edit manual.
 * - Detail blog (/blog/:slug) diambil otomatis dari src/data/home.static.ts.
 * - Base URL bisa dioverride via env VITE_SITE_URL.
 *
 * Output ditulis ke public/ dan ke dist/ jika folder dist sudah ada.
 *
 * Cara pakai: node scripts/generate-sitemap.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.morrusdigitalconnecting.com').replace(/\/$/, '')
const today = new Date().toISOString().split('T')[0]
const SITEMAP_FILE = 'sitemap.xml'
const ROBOTS_FILE = 'robots.txt'

/** Mirror dari src/App.tsx — tambah route baru di sini jika menambah halaman. */
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
]

function getSlugsFromFile(relativePath, label) {
  const sourceFile = resolve(projectRoot, relativePath)
  if (!existsSync(sourceFile)) {
    console.warn(`[sitemap] ${relativePath} tidak ditemukan, lewati ${label}.`)
    return []
  }

  const source = readFileSync(sourceFile, 'utf-8')
  const slugs = new Set()
  const slugPattern = /slug:\s*['"]([^'"]+)['"]/g
  let match
  while ((match = slugPattern.exec(source)) !== null) {
    slugs.add(match[1])
  }
  return [...slugs].sort()
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSitemapXml(urls) {
  const entries = urls
    .map(
      (u) => `  <url>\n    <loc>${escapeXml(`${SITE_URL}${u.path}`)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/${SITEMAP_FILE}\n`
}

function writePublicFile(fileName, content) {
  const targets = [resolve(projectRoot, 'public', fileName)]
  const distDir = resolve(projectRoot, 'dist')
  if (existsSync(distDir)) {
    targets.push(resolve(distDir, fileName))
  } else {
    mkdirSync(resolve(projectRoot, 'public'), { recursive: true })
  }

  for (const target of targets) {
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, content)
    console.log(`[seo] written: ${target}`)
  }
}

const portfolioSlugs = getSlugsFromFile('src/data/portfolio.static.ts', 'detail portfolio')
const blogSlugs = getSlugsFromFile('src/data/home.static.ts', 'detail blog')
const urls = [
  ...STATIC_ROUTES,
  ...portfolioSlugs.map((slug) => ({
    path: `/portfolio/${slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...blogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
]

writePublicFile(SITEMAP_FILE, buildSitemapXml(urls))
writePublicFile(ROBOTS_FILE, buildRobotsTxt())
console.log(
  `[sitemap] ${urls.length} URLs (${portfolioSlugs.length} portfolio detail, ${blogSlugs.length} blog detail) - base: ${SITE_URL}`,
)
