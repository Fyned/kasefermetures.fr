import { motion } from 'framer-motion'
import logoBeyaz from '../../assets/logos/kasefermetures-header-beyaz-logo.svg'

export default function Header() {
  return (
    <motion.header
      className="absolute top-0 left-0 right-0 z-10 px-6 md:px-12 py-6 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <img src={logoBeyaz} alt="KASE Fermetures" style={{ height: '44px' }} />

      <a
        href="tel:+33782984436"
        className="flex items-center gap-2 group"
        aria-label="Appeler KASE Fermetures"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#6BBE45' }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <span className="hidden md:block text-white font-medium text-sm">07 82 98 44 36</span>
      </a>
    </motion.header>
  )
}
