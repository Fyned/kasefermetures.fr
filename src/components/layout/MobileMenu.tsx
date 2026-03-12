import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { XIcon, ChevronDownIcon } from '../../lib/icons'
import { mainNavItems } from '../../data/navigation'
import { PHONE_HREF } from '../../lib/constants'
import Button from '../ui/Button'
import logoWhite from '../../assets/logos/kasefermetures-header-beyaz-logo.svg'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleItem = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto bg-kase-deep"
          >
            <div className="flex items-center justify-between border-b border-kase-charcoal p-4">
              <img src={logoWhite} alt="KASE Fermetures" className="h-8" />
              <button
                onClick={onClose}
                aria-label="Fermer le menu"
                className="rounded-lg p-2 text-kase-gray-mid transition-colors hover:text-kase-white"
              >
                <XIcon className="size-6" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-1">
                {mainNavItems.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleItem(item.label)}
                          aria-expanded={expandedItem === item.label}
                          className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-kase-white transition-colors hover:bg-kase-light"
                        >
                          <span className="font-medium">{item.label}</span>
                          <ChevronDownIcon
                            className={`size-4 text-kase-gray-mid transition-transform duration-200 ${
                              expandedItem === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedItem === item.label && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4"
                            >
                              <li>
                                <Link
                                  to={item.href}
                                  onClick={onClose}
                                  className="block rounded-lg px-4 py-2 text-sm text-kase-green transition-colors hover:bg-kase-light"
                                >
                                  Tout voir
                                </Link>
                              </li>
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    to={child.href}
                                    onClick={onClose}
                                    className="block rounded-lg px-4 py-2 text-sm text-kase-gray-light transition-colors hover:bg-kase-light hover:text-kase-white"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className="block rounded-lg px-4 py-3 font-medium text-kase-white transition-colors hover:bg-kase-light"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-kase-charcoal p-4 space-y-3">
              <Button href="/devis-gratuit" variant="primary" fullWidth onClick={onClose}>
                Devis Gratuit
              </Button>
              <Button href={PHONE_HREF} variant="ghost-light" fullWidth onClick={onClose}>
                Appeler
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
