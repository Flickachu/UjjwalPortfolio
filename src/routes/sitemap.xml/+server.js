import fs from 'fs';
import path from 'path';

export async function GET() {
  const domain = 'https://ujjwal-portfolio.vercel.app';
  
  // Read cms data directly from file to ensure it's up to date
  const dataPath = path.resolve('src/lib/cms/data.json');
  let data = { projects: [] };
  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }

  const pages = [
    '',
    '/services',
    '/about',
    '/insights',
    '/contact',
    '/projects',
  ];

  const projectUrls = (data.projects || []).map(p => `/projects/${p.slug}`);
  const allUrls = [...pages, ...projectUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${domain}${url}</loc>
    <changefreq>${url === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
