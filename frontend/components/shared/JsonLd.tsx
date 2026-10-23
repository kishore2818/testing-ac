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
      "Karnataka Class I Licensed Electrical Contractor up to 33 kV. Turnkey HT/LT power distribution, substations, transformer setups, and CEIG approvals.",
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-90350-27395',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Kannada'],
      },
    ],
    sameAs: [
      SITE_URL,
    ],
  }

  // 2. LocalBusiness schema — critical for "near me" & city searches
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Adler Contracts',
    image: [`${SITE_URL}/logo.png`, `${SITE_URL}/og-image.png`],
    url: SITE_URL,
    telephone: '+91-90350-27395',
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Bank Transfer, Cheque',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No 1/A RS No. 43/2A, Saraf Enclave, Azam Nagar Circle',
      addressLocality: 'Belagavi',
      addressRegion: 'Karnataka',
      postalCode: '590010',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 15.8497,
      longitude: 74.4977,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:30',
      },
    ],
    hasMap: 'https://maps.google.com/?q=Belagavi+Karnataka+India',
  }

  // 3. WebSite schema — enables Google Sitelinks search box
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Adler Contracts',
    url: SITE_URL,
    description:
      "Karnataka Class I Licensed Electrical Contractor up to 33 kV in Belagavi. Turnkey HT/LT electrical engineering.",
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
