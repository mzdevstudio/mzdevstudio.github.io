import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

interface StaticRouteMeta {
  routePath: string;
  outFile: string;
  title: string;
  description: string;
  robots?: string;
  isNotFound?: boolean;
  breadcrumbName?: string;
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeBasePath(rawBase?: string): string {
  const trimmed = (rawBase || '/').trim();
  if (!trimmed || trimmed === '/') return '/';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
}

function prerenderStaticRoutes(basePath: string): Plugin {
  const siteUrl = (process.env.VITE_SITE_URL || 'https://mzdevstudio.pl').trim().replace(/\/+$/, '');
  const siteNoindex = process.env.VITE_SITE_NOINDEX === 'true';
  let outDir = 'dist';

  const routes: StaticRouteMeta[] = [
    {
      routePath: '/polityka-prywatnosci',
      outFile: path.join('polityka-prywatnosci', 'index.html'),
      title: 'Polityka Prywatności & RODO — MZDevStudio',
      description:
        'Polityka prywatności MZDevStudio. Dowiedz się, jakie dane zbieram, w jakim celu i jakie masz prawa wynikające z RODO.',
      breadcrumbName: 'Polityka Prywatności',
    },
    {
      routePath: '/regulamin',
      outFile: path.join('regulamin', 'index.html'),
      title: 'Regulamin Świadczenia Usług — MZDevStudio',
      description:
        'Regulamin świadczenia usług tworzenia stron internetowych i aplikacji webowych przez MZDevStudio. Zasady współpracy, płatności, gwarancji i reklamacji.',
      breadcrumbName: 'Regulamin',
    },
    {
      routePath: '/404',
      outFile: '404.html',
      title: '404 — Strona nie została znaleziona | MZDevStudio',
      description: 'Nie znaleziono strony. Wróć na stronę główną MZDevStudio.',
      robots: 'noindex, nofollow',
      isNotFound: true,
    },
  ];

  return {
    name: 'mzdevstudio-static-routes',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    transformIndexHtml(html) {
      let transformed = html.replace(/https:\/\/mzdevstudio\.pl/g, siteUrl);

      if (basePath !== '/') {
        transformed = transformed.replace(
          /href="\/(sitemap\.xml|hero-panorama\.webp|icon\.svg|favicon-32x32\.png|favicon\.ico|apple-touch-icon\.png)/g,
          `href="${basePath}$1`
        );
      }

      if (siteNoindex) {
        transformed = transformed.replace(
          /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
          '<meta name="robots" content="noindex, nofollow" />'
        );
      }

      return transformed;
    },
    closeBundle() {
      const distRoot = path.resolve(__dirname, outDir);
      const indexPath = path.join(distRoot, 'index.html');
      if (!fs.existsSync(indexPath)) return;

      if (siteUrl !== 'https://mzdevstudio.pl') {
        for (const staticFile of ['sitemap.xml', 'robots.txt', 'llms.txt']) {
          const target = path.join(distRoot, staticFile);
          if (fs.existsSync(target)) {
            const content = fs.readFileSync(target, 'utf8');
            fs.writeFileSync(target, content.replace(/https:\/\/mzdevstudio\.pl/g, siteUrl), 'utf8');
          }
        }
      }

      const template = fs.readFileSync(indexPath, 'utf8');

      for (const route of routes) {
        const pageUrl = `${siteUrl}${route.routePath}`;
        const safeTitle = escapeHtmlAttr(route.title);
        const safeDesc = escapeHtmlAttr(route.description);

        let html = template
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
            `<meta name="description" content="${safeDesc}" />`
          )
          .replace(
            /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:title" content="${safeTitle}" />`
          )
          .replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:description" content="${safeDesc}" />`
          )
          .replace(
            /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:url" content="${pageUrl}" />`
          )
          .replace(
            /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
            `<meta name="twitter:title" content="${safeTitle}" />`
          )
          .replace(
            /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
            `<meta name="twitter:description" content="${safeDesc}" />`
          )
          .replace(
            /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/,
            `<meta name="twitter:url" content="${pageUrl}" />`
          )
          // Subpages and 404 do not render Hero panorama, so drop preload on those HTML entries
          .replace(/\s*<link\s+rel="preload"[^>]*href="[^"]*hero-panorama\.webp"[^>]*\/?>/, '');

        if (route.isNotFound) {
          html = html
            .replace(
              /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
              `<meta name="robots" content="${route.robots || 'noindex, nofollow'}" />`
            )
            .replace(/\s*<link\s+rel="canonical"[^>]*\/?>/, '')
            .replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*\/?>/g, '')
            .replace(
              /\s*<!-- Fallback JSON-LD[\s\S]*?<script id="static-seo-schema"[^>]*>[\s\S]*?<\/script>/,
              ''
            );
        } else {
          const breadcrumbJson = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Strona Główna', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: route.breadcrumbName || route.title, item: pageUrl },
            ],
          });

          html = html
            .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${pageUrl}" />`)
            .replace(
              /<link\s+rel="alternate"\s+hreflang="pl"\s+href="[^"]*"\s*\/?>/,
              `<link rel="alternate" hreflang="pl" href="${pageUrl}" />`
            )
            .replace(
              /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/?>/,
              `<link rel="alternate" hreflang="en" href="${pageUrl}?lang=en" />`
            )
            .replace(
              /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/,
              `<link rel="alternate" hreflang="x-default" href="${pageUrl}" />`
            )
            .replace(
              /<script id="static-seo-schema" type="application\/ld\+json">[\s\S]*?<\/script>/,
              `<script id="static-seo-schema" type="application/ld+json">${breadcrumbJson}</script>`
            );
        }

        const targetPath = path.join(distRoot, route.outFile);
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.writeFileSync(targetPath, html, 'utf8');
      }
    },
  };
}

export default defineConfig(() => {
  const base = normalizeBasePath(process.env.VITE_BASE_PATH);

  return {
    base,
    plugins: [react(), tailwindcss(), prerenderStaticRoutes(base)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
