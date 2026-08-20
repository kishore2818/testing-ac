import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adlercontracts.com'

  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/clients',
    '/contact',
    '/services/mcc-panels',
    '/services/pcc-panels',
    '/services/apfc-panels',
    '/services/control-desk',
    '/services/bus-ducts',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
