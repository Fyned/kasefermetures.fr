import { motion } from 'framer-motion'
import { useState } from 'react'

const services = [
  {
    title: 'Fenêtres',
    description: 'PVC, aluminium et bois. Performance thermique et acoustique supérieure.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    title: 'Portes',
    description: "Portes d'entrée sur mesure. Sécurité renforcée et design personnalisé.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="4" y="2" width="16" height="20" rx="1" />
        <circle cx="15.5" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Portes de Garage',
    description: 'Sectionnelles, basculantes et enroulables. Motorisation disponible.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M3 12L12 4l9 8" />
        <rect x="4" y="12" width="16" height="9" rx="1" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Volets',
    description: 'Volets roulants et battants. Isolation optimale et protection accrue.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="8" x2="21" y2="8" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="16" x2="21" y2="16" />
      </svg>
    ),
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '36px 28px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #2B2B2B 0%, #3A3A3A 100%)',
        border: hovered ? '1px solid rgba(107,190,69,0.3)' : '1px solid rgba(255,255,255,0.06)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? '0 12px 32px rgba(107,190,69,0.15)' : 'none',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '16px',
          right: '16px',
          height: '3px',
          backgroundColor: '#6BBE45',
          borderRadius: '0 0 4px 4px',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.3s ease',
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          backgroundColor: hovered ? '#6BBE45' : 'rgba(107,190,69,0.1)',
          color: hovered ? '#fff' : '#6BBE45',
          transition: 'all 0.3s ease',
        }}
      >
        {service.icon}
      </div>

      <h3
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 700,
          color: '#fff',
          fontSize: '1.2rem',
          marginBottom: '12px',
          margin: '0 0 12px',
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          color: '#999',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          margin: 0,
        }}
      >
        {service.description}
      </p>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section style={{ padding: '96px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p
            style={{
              color: '#6BBE45',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '16px',
            }}
          >
            NOS EXPERTISES
          </p>
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              color: '#fff',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              margin: 0,
            }}
          >
            Des solutions sur mesure pour votre habitat
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
