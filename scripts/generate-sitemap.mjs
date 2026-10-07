/**
 * Generate sitemap.xml untuk kebutuhan SEO (mdc-website).
 *
 * - Static routes diambil dari daftar di bawah (mirror dari src/App.tsx).
 * - Detail portfolio (/portfolio/:slug) diambil otomatis dari
 *   src/data/portfolio.static.ts agar slug baru ikut ke-sitemap tanpa edit manual.
 * - Base URL bisa dioverride via env VITE_SITE_URL.
 *
 * Output ditulis ke public/sitemap.xml (ikut tercopy ke dist/ oleh Vite)
 * dan ke dist/sitemap.xml jika folder dist sudah ada (untuk build yang sudah jalan).
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

/** Mirror dari src/App.tsx — tambah route baru di sini jika menambah halaman. */
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
]

function getPortfolioSlugs() {
  const portfolioFile = resolve(projectRoot, 'src/data/portfolio.static.ts')
  if (!existsSync(portfolioFile)) {
    console.warn('[sitemap] portfolio.static.ts tidak ditemukan, lewati detail portfolio.')
    return []
  }
  const source = readFileSync(portfolioFile, 'utf-8')
  const slugs = new Set()
  const slugPattern = /slug:\s*['"]([^'"]+)['"]/g
  let match
  while ((match = slugPattern.exec(source)) !== null) {
    slugs.add(match[1])
  }
  return [...slugs].sort()
}

function buildSitemapXml(urls) {
  const entries = urls
    .map(
      (u) => `  <url>\n    <loc>${SITE_URL}${u.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

function writeSitemap(content) {
  const targets = [resolve(projectRoot, 'public/sitemap.xml')]
  const distDir = resolve(projectRoot, 'dist')
  if (existsSync(distDir)) {
    targets.push(resolve(distDir, 'sitemap.xml'))
  } else {
    mkdirSync(resolve(projectRoot, 'public'), { recursive: true })
  }
  for (const target of targets) {
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, content)
    console.log(`[sitemap] written: ${target}`)
  }
}

const portfolioSlugs = getPortfolioSlugs()
const urls = [
  ...STATIC_ROUTES,
  ...portfolioSlugs.map((slug) => ({
    path: `/portfolio/${slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
]

writeSitemap(buildSitemapXml(urls))
console.log(`[sitemap] ${urls.length} URLs (${portfolioSlugs.length} portfolio detail) — base: ${SITE_URL}`)
