import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../../lib/icons'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-kase-gray-mid">
      <Link to="/" className="hover:text-kase-green transition-colors">Accueil</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRightIcon size={14} className="text-kase-gray-dark" />
          {item.href ? (
            <Link to={item.href} className="hover:text-kase-green transition-colors">{item.label}</Link>
          ) : (
            <span className="text-kase-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
