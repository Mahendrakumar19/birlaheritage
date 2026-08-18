import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://birlaheritage.com';

  const routes = [
    '',
    '/about-us',
    '/about-us/philosophy',
    '/about-us/leadership',
    '/about-us/curriculum',
    '/about-us/mandatory-disclosure',
    '/campus-life',
    '/admissions',
    '/admission-process',
    '/contact-us',
    '/gallery',
    '/gallery/campus',
    '/gallery/students-corner',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
