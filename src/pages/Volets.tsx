import { Helmet } from 'react-helmet-async'
import { SITE_NAME, BASE_URL } from '../lib/constants'

const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Volets et brise-soleil orientables',
  provider: { '@type': 'LocalBusiness', name: 'KASE Fermetures' },
  areaServed: { '@type': 'Place', name: 'Vosges, Grand Est, France' },
  description: 'Volets roulants FUTUROL, volets battants et brise-soleil orientables (BSO). Motorisation Somfy. Installation dans les Vosges.',
  url: `${BASE_URL}/volets`,
}
import { voletsProducts, voletsCategories } from '../data/volets'
import { bsoProducts } from '../data/bso'
import ServicePageLayout from '../components/layout/ServicePageLayout'

const allProducts = [...voletsProducts, ...bsoProducts]

const seoText = `KASE Fermetures installe tous types de volets dans les Vosges : volets roulants motorisés FUTUROL, volets battants en aluminium et PVC, et brise-soleil orientables (BSO). Nos volets roulants offrent isolation thermique, sécurité anti-effraction et confort d'utilisation grâce à la motorisation Somfy. Les brise-soleil orientables régulent la luminosité et la chaleur tout en préservant votre vue. Disponibles dans plus de 30 coloris standard, nos volets s'adaptent à toutes les architectures. Devis gratuit sur rendez-vous.`

export default function Volets() {
  return (
    <>
      <Helmet>
        <title>Volets Roulants, Battants, BSO — {SITE_NAME} | Vosges</title>
        <meta name="description" content="Volets roulants FUTUROL, volets battants et brise-soleil orientables BSO dans les Vosges. Motorisation Somfy. Devis gratuit KASE Fermetures." />
        <link rel="canonical" href={`${BASE_URL}/volets`} />
        <meta property="og:title" content={`Volets et BSO — ${SITE_NAME}`} />
        <meta property="og:description" content="Volets roulants, battants et brise-soleil orientables. Installation professionnelle dans les Vosges." />
        <meta property="og:url" content={`${BASE_URL}/volets`} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
      </Helmet>
      <ServicePageLayout
        title="Volets & Brise-Soleil"
        description="Volets roulants, volets battants et brise-soleil orientables (BSO). Motorisation et large choix de coloris."
        seoText={seoText}
        products={allProducts}
        categories={voletsCategories}
        breadcrumbItems={[{ label: 'Volets & BSO' }]}
      />
    </>
  )
}
