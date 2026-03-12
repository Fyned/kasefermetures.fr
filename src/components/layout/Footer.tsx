import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE_NAME, PHONE, PHONE_HREF, EMAIL, ADDRESS, INSTAGRAM } from '../../lib/constants'
import { mainNavItems } from '../../data/navigation'
import { PhoneIcon, MailIcon, MapPinIcon, InstagramIcon, ChevronDownIcon } from '../../lib/icons'
import logoDark from '../../assets/logos/kasefermetures-header-siyah-logo.svg'

const serviceLinks = [
  { label: 'Fenêtres', href: '/fenetres' },
  { label: 'Portes d\'entrée', href: '/portes' },
  { label: 'Portes de Garage', href: '/portes-de-garage' },
  { label: 'Volets', href: '/volets' },
  { label: 'Brise-Soleil (BSO)', href: '/volets?cat=bso' },
]

const navLinks = mainNavItems.filter((i) => !i.children).map((i) => ({ label: i.label, href: i.href }))

interface FooterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FooterSection({ title, children, defaultOpen = false }: FooterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between md:pointer-events-none py-2 md:py-0"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-kase-anthracite">{title}</h3>
        <ChevronDownIcon
          className={`size-4 text-kase-gray-mid md:hidden transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div className={`mt-4 space-y-2 ${isOpen ? 'block' : 'hidden md:block'}`}>{children}</div>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Logo + tagline */}
          <div className="space-y-4">
            <Link to="/">
              <img src={logoDark} alt={SITE_NAME} className="h-10" />
            </Link>
            <p className="text-sm text-kase-gray-dark leading-relaxed">
              Expert en menuiserie extérieure dans les Vosges. Fenêtres, portes, portes de garage et volets sur mesure.
            </p>
            <div className="flex gap-3">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-kase-gray-mid transition-colors hover:border-kase-green hover:text-kase-green"
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <FooterSection title="Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-sm text-kase-gray-dark transition-colors hover:text-kase-green"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/devis-gratuit" className="block text-sm text-kase-gray-dark transition-colors hover:text-kase-green">
              Devis Gratuit
            </Link>
          </FooterSection>

          {/* Col 3 — Services */}
          <FooterSection title="Nos Services">
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-sm text-kase-gray-dark transition-colors hover:text-kase-green"
              >
                {link.label}
              </Link>
            ))}
          </FooterSection>

          {/* Col 4 — Contact */}
          <FooterSection title="Contact" defaultOpen>
            <div className="space-y-3">
              <a href={PHONE_HREF} className="flex items-start gap-2 text-sm text-kase-gray-dark transition-colors hover:text-kase-green">
                <PhoneIcon className="size-4 mt-0.5 shrink-0" />
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-start gap-2 text-sm text-kase-gray-dark transition-colors hover:text-kase-green">
                <MailIcon className="size-4 mt-0.5 shrink-0" />
                {EMAIL}
              </a>
              <div className="flex items-start gap-2 text-sm text-kase-gray-dark">
                <MapPinIcon className="size-4 mt-0.5 shrink-0" />
                <span>{ADDRESS.full}</span>
              </div>
            </div>
          </FooterSection>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-kase-gray-mid sm:flex-row">
          <p>&copy; {year} {SITE_NAME}. Tous droits réservés.</p>
          <Link to="/mentions-legales" className="transition-colors hover:text-kase-green">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  )
}
