'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[2000] flex items-center justify-end pointer-events-auto">
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10, scale: 0.95 }}
        animate={{ 
          opacity: hovered ? 1 : 0, 
          x: hovered ? 0 : 10,
          scale: hovered ? 1 : 0.95 
        }}
        transition={{ duration: 0.2 }}
        className="hidden sm:block bg-[#111827] text-white font-inter text-xs font-semibold py-2 px-3.5 rounded-xl mr-3 shadow-xl border border-white/10 whitespace-nowrap pointer-events-none"
      >
        Chat on WhatsApp
      </motion.div>

      {/* Floating Animated WhatsApp Button */}
      <motion.a
        href="https://wa.me/919035027395"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Adler Contracts on WhatsApp"
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)] cursor-pointer transition-shadow"
      >
        {/* Crisp Official WhatsApp Vector */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 md:w-8 md:h-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.72.775 5.257 2.115 7.412L2.5 30l6.786-1.58C11.353 29.472 13.613 30 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm8.28 19.86c-.347.973-1.737 1.787-2.827 2.023-.746.16-1.72.288-5.006-1.073-4.2-1.74-6.907-6.02-7.116-6.297-.202-.277-1.706-2.27-1.706-4.327 0-2.057 1.077-3.07 1.46-3.487.383-.417.834-.52 1.112-.52.278 0 .556.003.8.014.26.012.607-.098.95.727.347.834 1.18 2.88 1.285 3.09.104.208.174.452.035.73-.14.278-.208.452-.417.695-.208.243-.438.542-.625.728-.208.208-.426.435-.183.852.243.417 1.08 1.782 2.318 2.884 1.593 1.417 2.936 1.858 3.353 2.066.417.208.66.174.903-.104.243-.278 1.04-1.216 1.318-1.633.278-.417.556-.347.938-.208.382.139 2.428 1.146 2.845 1.354.417.208.695.312.798.486.104.174.104 1.007-.243 1.98z"/>
        </svg>
      </motion.a>
    </div>
  )
}
