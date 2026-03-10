import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ minHeight: '100vh', backgroundColor: '#1E1E1E' }}
    >
      {/* Radial glow — top right */}
      <div
        className="absolute top-0 right-0 pointer-events-none animate-pulse"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,190,69,0.13) 0%, transparent 70%)',
        }}
      />
      {/* Radial glow — bottom left */}
      <div
        className="absolute bottom-20 left-0 pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,190,69,0.08) 0%, transparent 70%)',
        }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(107,190,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,190,69,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto"
        style={{ paddingTop: '96px' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'rgba(107,190,69,0.1)',
              border: '1px solid rgba(107,190,69,0.3)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#6BBE45' }}
            />
            <span
              className="text-xs font-medium uppercase"
              style={{ color: '#6BBE45', letterSpacing: '0.2em' }}
            >
              Site en construction
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-white font-extrabold mb-6"
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            letterSpacing: '-1.5px',
            lineHeight: '1.05',
          }}
        >
          Votre expert en
          <br />
          <span className="relative inline-block" style={{ color: '#6BBE45' }}>
            menuiserie
            <span
              className="absolute left-0 right-0 rounded-full"
              style={{
                bottom: '-4px',
                height: '3px',
                backgroundColor: '#6BBE45',
              }}
            />
          </span>{' '}
          dans
          <br />
          les Vosges
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10"
          style={{
            color: '#999',
            fontSize: '1.1rem',
            lineHeight: '1.7',
            maxWidth: '600px',
          }}
        >
          Installation et remplacement de fenêtres, portes, portes de garage et volets.{' '}
          Artisan de confiance à Saulcy-sur-Meurthe. Devis gratuit et sans engagement.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="tel:+33782984436"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300"
            style={{
              padding: '16px 32px',
              backgroundColor: '#6BBE45',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = '#5AA63A'
              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = '0 8px 24px rgba(107,190,69,0.4)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = '#6BBE45'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
            aria-label="Demander un devis gratuit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Devis Gratuit
          </a>

          <a
            href="mailto:contact@kasefermetures.fr"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300"
            style={{
              padding: '16px 32px',
              backgroundColor: 'transparent',
              color: '#fff',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.3)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = '#6BBE45'
              el.style.color = '#6BBE45'
              el.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(255,255,255,0.3)'
              el.style.color = '#fff'
              el.style.transform = 'translateY(0)'
            }}
            aria-label="Nous contacter par email"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Nous Contacter
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
