import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardIcon, PhoneIcon, ArrowUpIcon } from '../../lib/icons'
import { PHONE_HREF } from '../../lib/constants'
import { useScrollY } from '../../hooks/useScrollY'

export default function FloatingSidebar() {
  const scrollY = useScrollY()
  const showScrollTop = scrollY > 400

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="fixed right-4 bottom-32 z-30 hidden md:flex flex-col gap-3">
      <Link
        to="/devis-gratuit"
        aria-label="Demander un devis gratuit"
        className="flex size-12 items-center justify-center rounded-full bg-kase-green text-white shadow-lg transition-all duration-300 hover:bg-kase-green-dark hover:scale-110"
      >
        <ClipboardIcon className="size-5" />
      </Link>
      <a
        href={PHONE_HREF}
        aria-label="Appeler KASE Fermetures"
        className="flex size-12 items-center justify-center rounded-full bg-kase-anthracite text-kase-white shadow-lg border border-kase-charcoal transition-all duration-300 hover:bg-kase-light hover:scale-110"
      >
        <PhoneIcon className="size-5" />
      </a>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Retour en haut"
            className="flex size-12 items-center justify-center rounded-full bg-kase-anthracite text-kase-white shadow-lg border border-kase-charcoal transition-all duration-300 hover:bg-kase-light hover:scale-110"
          >
            <ArrowUpIcon className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
