import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOnce } from '../../lib/animations'
import type { Product } from '../../types'
import Breadcrumb from '../ui/Breadcrumb'
import ProductCard from '../ui/ProductCard'
import Button from '../ui/Button'

interface Category {
  id: string
  label: string
}

interface ServicePageLayoutProps {
  title: string
  description: string
  seoText?: string
  products: Product[]
  categories: Category[]
  breadcrumbItems: { label: string; href?: string }[]
}

export default function ServicePageLayout({
  title,
  description,
  seoText,
  products,
  categories,
  breadcrumbItems,
}: ServicePageLayoutProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'all'

  const [showSeoText, setShowSeoText] = useState(false)

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products
    return products.filter((p) => p.category === activeCategory)
  }, [activeCategory, products])

  const handleCategoryChange = (catId: string) => {
    if (catId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ cat: catId })
    }
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-kase-anthracite py-12 md:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumb items={breadcrumbItems} />
          <motion.h1
            viewport={viewportOnce}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl font-[Outfit] break-words"
          >
            {title}
          </motion.h1>
          <motion.p
            viewport={viewportOnce}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-3 max-w-2xl text-kase-gray-mid md:text-lg break-words"
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-12 z-20 border-b border-kase-charcoal bg-kase-deep/95 backdrop-blur-sm overflow-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none min-w-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-kase-green text-white'
                    : 'bg-kase-light text-kase-gray-mid hover:text-kase-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 md:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-12 lg:flex-row min-w-0">
            {/* SEO Text Column */}
            {seoText && (
              <div className="lg:w-[30%] shrink-0 min-w-0">
                <div className="rounded-xl border border-kase-charcoal bg-kase-anthracite p-6 lg:sticky lg:top-28 overflow-hidden">
                  <p className={`text-sm text-kase-gray-mid leading-relaxed break-words ${!showSeoText ? 'line-clamp-6' : ''}`}>
                    {seoText}
                  </p>
                  <button
                    onClick={() => setShowSeoText(!showSeoText)}
                    className="mt-2 text-xs text-kase-green hover:underline"
                  >
                    {showSeoText ? 'Réduire' : 'Lire la suite'}
                  </button>
                  <div className="mt-6">
                    <Button href="/devis-gratuit" variant="primary" size="sm" fullWidth>
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              <motion.div
                viewport={viewportOnce}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
              {filteredProducts.length === 0 && (
                <p className="py-12 text-center text-kase-gray-mid">
                  Aucun produit trouvé dans cette catégorie.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
