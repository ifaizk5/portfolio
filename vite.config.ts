import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Absolute site URL for canonical / Open Graph tags, robots.txt and sitemap.xml.
// SITE_URL overrides it (e.g. for a staging domain); otherwise the production domain is used.
const siteUrl = (process.env.SITE_URL ?? 'https://faizkhan.tech').replace(/\/$/, '')

function siteMeta(): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      // Without a known domain, drop the tags that require absolute URLs rather than ship broken ones.
      if (!siteUrl) return html.replace(/^.*%SITE_URL%.*\n/gm, '')
      return html.replaceAll('%SITE_URL%', siteUrl)
    },
    generateBundle() {
      const robots = siteUrl
        ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
        : 'User-agent: *\nAllow: /\n'
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      if (siteUrl) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><changefreq>monthly</changefreq></url>\n</urlset>\n`,
        })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap') || id.includes('@gsap')) return 'gsap'
          if (id.includes('node_modules/react')) return 'react'
        },
      },
    },
  },
})
