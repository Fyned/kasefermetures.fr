import type { Product } from '../../types'
import Badge from './Badge'
import Button from './Button'

const materialIcons: Record<string, string> = {
  PVC: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm2 3h8v1H8V9zm0 3h8v1H8v-1z',
  Aluminium: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm3 3h8v2H8V8zm0 4h8v2H8v-2z',
  Bois: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.93 0 3.68.69 5.05 1.83C16.02 7.26 14.13 8 12 8s-4.02-.74-5.05-2.17A7.96 7.96 0 0 1 12 4zm0 16c-4.41 0-8-3.59-8-8 0-.73.1-1.43.29-2.1C5.9 11.18 8.78 12 12 12s6.1-.82 7.71-2.1c.19.67.29 1.37.29 2.1 0 4.41-3.59 8-8 8z',
  Acier: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v5.7c0 4.83-3.23 9.36-7 10.58V3.18z',
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-kase-light rounded-2xl overflow-hidden border border-transparent hover:border-kase-green/40 transition-all duration-300 hover:-translate-y-1 min-w-0">
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={400}
            height={300}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-kase-anthracite via-kase-deep to-kase-anthracite gap-3">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-kase-green/40" fill="currentColor">
              <path d={materialIcons[product.material] || materialIcons.PVC} />
            </svg>
            <span className="text-kase-gray-mid text-sm font-medium tracking-wide break-words text-center px-2">{product.name}</span>
          </div>
        )}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge>{product.badge}</Badge>
          </div>
        )}
      </div>
      <div className="p-5">
        <span className="inline-block px-2 py-0.5 bg-kase-charcoal rounded text-xs text-kase-gray-mid mb-2">
          {product.material}
        </span>
        <h3 className="text-lg font-bold text-white mb-2 break-words">{product.name}</h3>
        <p className="text-kase-gray-mid text-sm leading-relaxed mb-4 line-clamp-2 break-words">{product.description}</p>
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4">
            {product.colors.slice(0, 5).map((color, i) => (
              <span
                key={i}
                className="w-5 h-5 rounded-full border border-white/20"
                style={{ backgroundColor: color }}
                title={color}
                aria-label={`Coloris ${color}`}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-kase-gray-mid">+{product.colors.length - 5}</span>
            )}
          </div>
        )}
        <Button variant="outline" size="sm" href="/devis-gratuit" fullWidth>
          Demander un devis
        </Button>
      </div>
    </div>
  )
}
