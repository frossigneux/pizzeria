import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/?$/, '/')}sitemap.xml`, site ?? 'http://localhost').href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`);
};
