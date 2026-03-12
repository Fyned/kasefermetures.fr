import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavChild } from '../../types'

interface MegaMenuProps {
  children: NavChild[]
  parentLabel: string
  isOpen: boolean
}

export default function MegaMenu({ children, parentLabel, isOpen }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-full z-50 w-full border-t border-gray-200 bg-white shadow-xl"
        >
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                {children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className="group flex items-start gap-3 rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-kase-anthracite group-hover:text-kase-green transition-colors duration-200">
                        {child.label}
                      </p>
                      {child.description && (
                        <p className="mt-0.5 text-xs text-kase-gray-mid">{child.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-center rounded-lg bg-gray-50 p-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-kase-anthracite">{parentLabel}</p>
                  <p className="mt-1 text-sm text-kase-gray-mid">
                    Découvrez notre gamme complète
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
