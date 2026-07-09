import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { COMPLIANCE_DATABASE } from '../lib/compliance-data';
import { TAXATION_DATABASE } from '../lib/taxation-data';
import { TRADEMARK_DATABASE } from '../lib/trademark-data';

const BASE_URL = 'https://compliancebharo.com';

function getStaticRoutes(dir: string, baseRoute = ''): string[] {
  let routes: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith('[') || entry.name === 'components' || entry.name === 'api' || entry.name.startsWith('.')) continue;
      const route = baseRoute + '/' + entry.name;
      if (fs.existsSync(path.join(dir, entry.name, 'page.tsx'))) {
          routes.push(route);
      }
      routes = routes.concat(getStaticRoutes(path.join(dir, entry.name), route));
    }
  }
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Homepage
  sitemapEntries.push({
    url: BASE_URL,
    lastModified: new Date(),
    priority: 1.0,
  });

  // 2. Static routes
  const appDir = path.join(process.cwd(), 'src/app');
  const staticRoutes = getStaticRoutes(appDir);
  
  staticRoutes.forEach((route) => {
    sitemapEntries.push({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      priority: 0.8,
    });
  });

  // 3. Dynamic routes
  const complianceSlugs = Object.keys(COMPLIANCE_DATABASE);
  complianceSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${BASE_URL}/compliance/${slug}`,
      lastModified: new Date(),
      priority: 0.8,
    });
  });

  const taxationSlugs = Object.keys(TAXATION_DATABASE);
  taxationSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${BASE_URL}/taxation/${slug}`,
      lastModified: new Date(),
      priority: 0.8,
    });
  });

  const trademarkSlugs = Object.keys(TRADEMARK_DATABASE);
  trademarkSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${BASE_URL}/trademark-ip/${slug}`,
      lastModified: new Date(),
      priority: 0.8,
    });
  });

  return sitemapEntries;
}
