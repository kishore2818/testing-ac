const SITE_URL = 'https://adlercontracts.in'

export default function JsonLd() {
  // 1. Organization schema — establishes brand identity
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Adler Contracts',
    alternateName: ['Adler Contracts India', 'Adlercontracts'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 400,
      height: 100,
    },
    description:
      "India's trusted electrical panel manufacturer. Expert design, manufacturing & installation of MCC panels, PCC panels, APFC panels, control desks and bus ducts.",
    foundingDate: '2010',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-80-41105000',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Kannada'],
      },
    ],
    sameAs: [
      SITE_URL,
      // Add your LinkedIn / Facebook / Twitter URLs here once you have them
    ],
  }

  // 2. LocalBusiness schema — critical for "near me" & city searches
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ElectronicsStore'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Adler Contracts',
    image: [`${SITE_URL}/logo.png`, `${SITE_URL}/og-image.png`],
    url: SITE_URL,
    telephone: '+91-80-41105000',
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Bank Transfer, Cheque',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bengaluru',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    hasMap: 'https://maps.google.com/?q=Bengaluru+Karnataka+India',
  }

  // 3. WebSite schema — enables Google Sitelinks search box
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Adler Contracts',
    url: SITE_URL,
    description:
      "India's trusted electrical panel manufacturer in Bengaluru. MCC, PCC, APFC panels & bus ducts.",
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/projects?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // 4. BreadcrumbList for homepage
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: 'Projects', item: `${SITE_URL}/projects` },
      { '@type': 'ListItem', position: 4, name: 'About', item: `${SITE_URL}/about` },
      { '@type': 'ListItem', position: 5, name: 'Contact', item: `${SITE_URL}/contact` },
    ],
  }

  const schemas = [organizationSchema, localBusinessSchema, websiteSchema, breadcrumbSchema]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
