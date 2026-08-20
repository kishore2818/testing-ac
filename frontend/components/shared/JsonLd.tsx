export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Adler Contracts',
    url: 'https://adlercontracts.com',
    logo: 'https://adlercontracts.com/logo.png',
    description:
      "India's premier electrical panel specialists. Expert design, installation, and maintenance of MCC, PCC, and control panels.",
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-80-41105000',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
    sameAs: ['https://adlercontracts.com'],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Adler Contracts',
    image: 'https://adlercontracts.com/logo.png',
    '@id': 'https://adlercontracts.com/#localbusiness',
    url: 'https://adlercontracts.com',
    telephone: '+91-80-41105000',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  )
}
