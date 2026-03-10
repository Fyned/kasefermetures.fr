import { motion } from 'framer-motion'

const blocks = [
  {
    label: 'ADRESSE',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    content: (
      <p className="text-white text-sm leading-relaxed">
        60 Rue des Déportés<br />
        88580 Saulcy-sur-Meurthe<br />
        Vosges, Grand Est
      </p>
    ),
  },
  {
    label: 'TÉLÉPHONE',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    content: (
      <a
        href="tel:+33782984436"
        className="text-white text-sm transition-colors duration-300 hover:text-[#6BBE45]"
        style={{ textDecoration: 'none' }}
      >
        07 82 98 44 36
      </a>
    ),
  },
  {
    label: 'EMAIL',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    content: (
      <a
        href="mailto:contact@kasefermetures.fr"
        className="text-white text-sm transition-colors duration-300 hover:text-[#6BBE45] break-all"
        style={{ textDecoration: 'none' }}
      >
        contact@kasefermetures.fr
      </a>
    ),
  },
]

export default function ContactInfo() {
  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y divide-white/[0.06] md:divide-y-0 md:divide-x md:divide-white/[0.06]">
          {blocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center px-8 py-8 md:py-0"
            >
              <div
                className="flex items-center justify-center mb-4 rounded-xl"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'rgba(107,190,69,0.1)',
                  color: '#6BBE45',
                }}
              >
                {block.icon}
              </div>
              <p
                className="font-semibold mb-3"
                style={{
                  color: '#6BBE45',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                }}
              >
                {block.label}
              </p>
              {block.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
