import type { Product } from '../../types'
import Badge from './Badge'
import Button from './Button'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-kase-light rounded-2xl overflow-hidden border border-transparent hover:border-kase-green/40 transition-all duration-300 hover:-translate-y-1">
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-kase-charcoal to-kase-deep text-kase-gray-dark text-sm">
            {product.name}
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
        <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
        <p className="text-kase-gray-mid text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>
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
