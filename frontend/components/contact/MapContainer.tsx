'use client'

export default function MapContainer() {
  const latitude = 15.8850051
  const longitude = 74.5108251
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`
  
  // This embed URL format includes a search query that forces a marker/pin on the location
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3837.459026733319!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTXCsDUzJzA2LjAiTiA3NMKwMzAnMzkuMCJF!5e0!3m2!1sen!2sin!4v1712811000000!5m2!1sen!2sin`

  return (
    <div className="w-full h-full relative">
      {/* Google Maps Embed with forced Pin */}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Adler Contracts Location - Belagavi"
      />

      {/* Get Directions Button — overlaid at bottom center */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--primary, #c8102e)',
          color: '#ffffff',
          fontFamily: "var(--font-rajdhani, 'Rajdhani', sans-serif)",
          fontWeight: 700,
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '12px 20px',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(200, 16, 46, 0.3)',
          zIndex: 10,
          whiteSpace: 'nowrap',
          borderRadius: '18px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = '#a00d24'
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 32px rgba(160, 13, 36, 0.45)'
          ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(-50%) translateY(-2px)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'var(--primary, #c8102e)'
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(200, 16, 46, 0.3)'
          ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(-50%) translateY(0)'
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
        Get Directions
      </a>
    </div>
  )
}

