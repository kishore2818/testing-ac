'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-[2000] flex items-center justify-end">
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 20 }}
        className="bg-[var(--black)] text-white font-inter text-sm py-2 px-4 rounded-full mr-4 whitespace-nowrap shadow-lg border border-[var(--gray-dark)]"
      >
        Chat with us on WhatsApp!
      </motion.div>

      <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {/* Button */}
        <a
          href="https://wa.me/919035027395"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_6px_24px_rgba(37,211,102,0.45)] cursor-pointer hover:scale-110 transition-transform active:scale-95"
        >
          <svg viewBox="0 0 32 32" width="30" height="30" fill="white">
            <path d="M16.033 2.1C8.361 2.1 2.13 8.358 2.13 16.059c0 2.453.642 4.843 1.862 6.948L1.93 30.22l7.351-1.934a13.882 13.882 0 006.752 1.761h.005c7.67 0 13.903-6.257 13.903-13.987A13.945 13.945 0 0025.86 6.168 13.864 13.864 0 0016.033 2.1zm0 2.34c3.21 0 6.228 1.256 8.497 3.535 2.27 2.279 3.522 5.309 3.522 8.535 0 6.388-5.176 11.59-11.532 11.59-2.03 0-4.02-.533-5.753-1.542l-.412-.246-4.27 1.123 1.144-4.184-.27-.432a11.521 11.521 0 01-1.782-6.177c.002-6.387 5.18-11.59 11.54-11.59l.06-.002zm-6.29 4.793c-.237 0-.616.089-.938.445s-1.233 1.21-1.233 2.946c0 1.74 1.265 3.42 1.442 3.655.178.238 2.456 3.905 6.07 5.253.86.32 1.533.513 2.054.656.862.273 1.646.234 2.264.142.695-.104 2.133-.873 2.43-1.716.297-.845.297-1.567.208-1.716-.088-.15-.327-.237-.682-.416s-2.134-1.054-2.46-1.173c-.326-.12-.564-.179-.801.178-.238.356-.934 1.172-1.142 1.411-.208.238-.415.267-.77.089a8.673 8.673 0 01-2.585-1.598 9.54 9.54 0 01-1.79-2.228c-.208-.356-.021-.55.158-.727.16-.16.356-.416.533-.624.18-.208.238-.356.356-.594.12-.238.059-.446-.03-.624-.088-.178-.801-1.932-1.098-2.645-.29-.696-.583-.601-.8-.611-.207-.008-.445-.01-.683-.01z"></path>
          </svg>
        </a>
      </div>
    </div>
  )
}
