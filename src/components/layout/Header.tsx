import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { PHONE, PHONE_HREF, EMAIL, INSTAGRAM } from '../../lib/constants'
import { mainNavItems } from '../../data/navigation'
import { PhoneIcon, MailIcon, InstagramIcon, MenuIcon } from '../../lib/icons'
import { useScrollY } from '../../hooks/useScrollY'
import Button from '../ui/Button'
import MegaMenu from './MegaMenu'
import MobileMenu from './MobileMenu'
import logoWhite from '../../assets/logos/kasefermetures-header-beyaz-logo.svg'
import logoDark from '../../assets/logos/kasefermetures-header-siyah-logo.svg'

export default function Header() {
  const scrollY = useScrollY()
  const location = useLocation()
  const isScrolled = scrollY > 100
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleMenuEnter = useCallback((label: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current)
    setActiveMenu(label)
  }, [])

  const handleMenuLeave = useCallback(() => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 100)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Desktop: Pennant/Flama header (hides on scroll) */}
      <div
        className={`hidden md:block bg-white transition-all duration-300 ${
          isScrolled ? 'h-0 overflow-hidden opacity-0' : 'opacity-100'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-start">
            {/* Pennant / Flama — dark banner with pointed bottom */}
            <Link
              to="/"
              aria-label="KASE Fermetures — Accueil"
              className="relative z-10 flex-shrink-0 block"
            >
              <div
                className="bg-kase-anthracite flex flex-col items-center justify-center px-8 pt-5 pb-9 shadow-lg"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), 50% 100%, 0 calc(100% - 16px))',
                }}
              >
                <img src={logoWhite} alt="KASE Fermetures" className="h-11" />
                <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-kase-gray-mid">
                  Expert menuiserie
                </span>
              </div>
            </Link>

            {/* Right content */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Top bar — contact info */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 h-9">
                <div className="flex items-center gap-5 text-xs text-kase-gray-dark">
                  <a href={PHONE_HREF} className="flex items-center gap-1.5 transition-colors hover:text-kase-green">
                    <PhoneIcon className="size-3.5" />
                    <span>{PHONE}</span>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 transition-colors hover:text-kase-green">
                    <MailIcon className="size-3.5" />
                    <span>{EMAIL}</span>
                  </a>
                </div>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram KASE Fermetures"
                  className="text-kase-gray-dark transition-colors hover:text-kase-green"
                >
                  <InstagramIcon className="size-4" />
                </a>
              </div>

              {/* CTA row */}
              <div className="flex items-center justify-end gap-3 px-6 py-5">
                <a
                  href={PHONE_HREF}
                  className="mr-auto flex items-center gap-2 text-sm font-medium text-kase-gray-dark transition-colors hover:text-kase-green"
                >
                  <PhoneIcon className="size-4 text-kase-green" />
                  <span>{PHONE}</span>
                </a>
                <Button href="/contact" variant="ghost" size="sm">
                  Contact
                </Button>
                <Button href="/devis-gratuit" variant="primary" size="sm">
                  Devis Gratuit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar (sticky) */}
      <div className={`bg-white/95 backdrop-blur-sm border-b border-gray-200 ${
        isScrolled ? 'shadow-md' : ''
      }`}>
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
          {/* Logo mini (visible when scrolled) */}
          <Link
            to="/"
            aria-label="KASE Fermetures — Accueil"
            className={`transition-all duration-300 ${isScrolled ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}
          >
            <img src={logoDark} alt="KASE Fermetures" className="h-7" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {mainNavItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleMenuEnter(item.label)}
                onMouseLeave={handleMenuLeave}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `relative px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-kase-green'
                        : 'text-kase-anthracite hover:text-kase-green'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-3 right-3 h-0.5 bg-kase-green transition-transform duration-200 origin-left ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
                {item.children && (
                  <MegaMenu
                    children={item.children}
                    parentLabel={item.label}
                    isOpen={activeMenu === item.label}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Scrolled CTA (desktop) */}
          <div className={`hidden md:flex items-center gap-2 transition-all duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <Button href="/devis-gratuit" variant="primary" size="sm">
              Devis
            </Button>
          </div>

          {/* Mobile hamburger + phone */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={PHONE_HREF}
              aria-label="Appeler KASE Fermetures"
              className="rounded-lg p-2 text-kase-anthracite transition-colors hover:text-kase-green"
            >
              <PhoneIcon className="size-5" />
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="rounded-lg p-2 text-kase-anthracite transition-colors hover:text-kase-green"
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
