import type { APIRoute } from 'astro';
import { langs, langPath } from '../i18n';

// One URL per language, each listing its translations.
export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site ?? 'http://localhost').href;
  const alternates = langs.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(langPath[l])}"/>`).join('');
  const urls = langs.map((l) => `<url><loc>${abs(langPath[l])}</loc>${alternates}</url>`).join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
