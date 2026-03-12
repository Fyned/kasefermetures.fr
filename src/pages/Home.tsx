import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { fadeInUp, fadeIn, staggerContainer, viewportOnce } from '../lib/animations'
import { SITE_NAME, PHONE, PHONE_HREF, BASE_URL } from '../lib/constants'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'
import Button from '../components/ui/Button'
import SectionTitle from '../components/ui/SectionTitle'
import Badge from '../components/ui/Badge'
import ServiceCard from '../components/ui/ServiceCard'
import Divider from '../components/ui/Divider'
import { StarIcon, CheckIcon, ChevronDownIcon, MapPinIcon } from '../lib/icons'

const advantages = [
  { title: 'Devis gratuit', desc: 'Estimation détaillée sans engagement, adaptée à votre projet.' },
  { title: 'Artisan local', desc: 'Basé dans les Vosges, intervention rapide dans un rayon de 50 km.' },
  { title: 'Produits certifiés', desc: 'Menuiseries de qualité, certifiées et garanties par nos fournisseurs.' },
  { title: 'Pose professionnelle', desc: 'Installation soignée par un professionnel expérimenté.' },
]

const communes = [
  'Saint-Dié-des-Vosges', 'Épinal', 'Gérardmer', 'Remiremont',
  'Bruyères', 'Raon-l\'Étape', 'Senones', 'Fraize',
  'Corcieux', 'Saulcy-sur-Meurthe',
]

const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'KASE Fermetures',
  description: 'Expert en menuiserie extérieure dans les Vosges : fenêtres, portes, portes de garage et volets.',
  url: 'https://kasefermetures.fr',
  telephone: '+33782984436',
  email: 'contact@kasefermetures.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '60 Rue des Déportés',
    addressLocality: 'Saulcy-sur-Meurthe',
    postalCode: '88580',
    addressRegion: 'Grand Est',
    addressCountry: 'FR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 48.238, longitude: 6.965 },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 48.238, longitude: 6.965 },
    geoRadius: '50000',
  },
  sameAs: ['https://www.instagram.com/kasefermetures/'],
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Expert Menuiserie Vosges | Fenêtres, Portes, Volets</title>
        <meta name="description" content="KASE Fermetures, expert en menuiserie dans les Vosges. Fenêtres, portes d'entrée, portes de garage et volets sur mesure. Devis gratuit à Saint-Dié-des-Vosges." />
        <link rel="canonical" href={BASE_URL} />
        <meta property="og:title" content={`${SITE_NAME} — Expert Menuiserie Vosges`} />
        <meta property="og:description" content="Expert en menuiserie extérieure dans les Vosges. Fenêtres, portes, volets sur mesure." />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-kase-anthracite">
        <img src="/images/hero/hero-main.jpeg" alt="Menuiserie extérieure de qualité" className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="async" width={1920} height={820} />
        <div className="absolute inset-0 bg-gradient-to-b from-kase-deep/85 via-kase-anthracite/70 to-kase-deep/90" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.div viewport={viewportOnce} variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={fadeInUp}>
              <Badge variant="green" pulse>Artisan certifié — Vosges, Grand Est</Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl xl:text-6xl font-[Outfit]">
              Votre expert en{' '}
              <span className="text-kase-green">menuiserie</span>{' '}
              dans les Vosges
            </motion.h1>
            <motion.p variants={fadeInUp} className="mx-auto max-w-2xl text-lg text-kase-gray-mid md:text-xl">
              Fenêtres, portes, portes de garage et volets sur mesure. Installation professionnelle et devis gratuit.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button href="/devis-gratuit" variant="primary" size="lg">
                Demander un devis gratuit
              </Button>
              <Button href="#services" variant="ghost-light" size="lg">
                Découvrir nos services
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDownIcon className="size-6 text-kase-gray-mid" />
        </motion.div>
      </section>

      <Divider />

      {/* Services Grid */}
      <section id="services" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div viewport={viewportOnce} variants={fadeInUp} initial="hidden" whileInView="visible">
            <SectionTitle
              label="Nos expertises"
              title="Des solutions sur mesure pour votre habitat"
              subtitle="De la fenêtre au volet, nous vous accompagnons dans tous vos projets de menuiserie extérieure."
            />
          </motion.div>
          <motion.div
            viewport={viewportOnce}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Pourquoi Nous */}
      <section className="py-16 md:py-24 bg-kase-anthracite">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div viewport={viewportOnce} variants={fadeInUp} initial="hidden" whileInView="visible">
            <SectionTitle
              label="Pourquoi nous choisir"
              title="Un artisan de confiance à vos côtés"
            />
          </motion.div>
          <motion.div
            viewport={viewportOnce}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {advantages.map((adv) => (
              <motion.div
                key={adv.title}
                variants={fadeInUp}
                className="rounded-xl border border-kase-charcoal bg-kase-light/50 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-kase-green/10">
                  <CheckIcon className="size-6 text-kase-green" />
                </div>
                <h3 className="text-lg font-semibold text-kase-white">{adv.title}</h3>
                <p className="mt-2 text-sm text-kase-gray-mid">{adv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Zone d'Intervention */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div viewport={viewportOnce} variants={fadeInUp} initial="hidden" whileInView="visible">
            <SectionTitle
              label="Zone d'intervention"
              title="Nous intervenons dans les Vosges et le Grand Est"
              subtitle="Intervention dans un rayon de 50 km autour de Saulcy-sur-Meurthe."
            />
          </motion.div>
          <motion.div
            viewport={viewportOnce}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="mt-12"
          >
            <div className="rounded-xl border border-kase-charcoal bg-kase-anthracite p-4 sm:p-6 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPinIcon className="size-5 text-kase-green" />
                    <span className="text-sm font-medium text-kase-green uppercase tracking-wider">Communes desservies</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {communes.map((c) => (
                      <span key={c} className="rounded-full border border-kase-charcoal bg-kase-light/50 px-3 py-1 text-sm text-kase-gray-light">
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-kase-gray-mid">
                    Et toutes les communes environnantes. Contactez-nous pour vérifier la disponibilité dans votre secteur.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-kase-deep p-8 text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-kase-green font-[Outfit]">50 km</div>
                  <p className="mt-2 text-kase-gray-mid">de rayon d'intervention</p>
                  <div className="mt-6">
                    <Button href="/contact" variant="primary" size="sm">
                      Vérifier ma zone
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-kase-anthracite">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div viewport={viewportOnce} variants={fadeInUp} initial="hidden" whileInView="visible">
            <SectionTitle
              label="Témoignages"
              title="Ce que disent nos clients"
            />
          </motion.div>
          <motion.div
            viewport={viewportOnce}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                className="min-w-[85vw] shrink-0 snap-center rounded-xl border border-kase-charcoal bg-kase-light/30 p-6 sm:min-w-[60vw] md:min-w-0 md:shrink"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} className="size-4 text-kase-green" />
                  ))}
                </div>
                <p className="text-sm text-kase-gray-light leading-relaxed">"{t.text}"</p>
                <div className="mt-4 border-t border-kase-charcoal pt-3">
                  <p className="text-sm font-medium text-kase-white">{t.name}</p>
                  <p className="text-xs text-kase-gray-mid">{t.city}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Partners / Certifications */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div viewport={viewportOnce} variants={fadeInUp} initial="hidden" whileInView="visible">
            <SectionTitle
              label="Nos partenaires"
              title="Des marques de confiance"
              subtitle="Nous travaillons avec les meilleurs fabricants européens de menuiseries."
            />
          </motion.div>
          <motion.div
            viewport={viewportOnce}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            {['FUTUROL', 'EKO-OKNA', 'Somfy'].map((name) => (
              <div
                key={name}
                className="flex h-16 items-center justify-center rounded-lg border border-kase-charcoal bg-kase-light/30 px-4 sm:px-8 text-base sm:text-lg font-semibold text-kase-gray-mid opacity-60 transition-opacity hover:opacity-100"
              >
                {name}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-kase-green-dark via-kase-green to-kase-green-light py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div viewport={viewportOnce} variants={staggerContainer} initial="hidden" whileInView="visible" className="space-y-6">
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white md:text-4xl font-[Outfit]">
              Prêt à transformer votre habitat ?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/80">
              Demandez votre devis gratuit et sans engagement. Nous vous répondons sous 48h.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/devis-gratuit"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-kase-green transition-all duration-300 hover:bg-kase-off-white hover:shadow-lg"
              >
                Demander un devis gratuit
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Appeler le {PHONE}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
