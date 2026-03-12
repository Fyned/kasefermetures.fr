import { Helmet } from 'react-helmet-async'
import { SITE_NAME, BASE_URL } from '../lib/constants'

const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Portes de garage',
  provider: { '@type': 'LocalBusiness', name: 'KASE Fermetures' },
  areaServed: { '@type': 'Place', name: 'Vosges, Grand Est, France' },
  description: 'Portes de garage sectionnelles, basculantes et enroulables. Motorisation et télécommande disponibles. Installation dans les Vosges.',
  url: `${BASE_URL}/portes-de-garage`,
}
import { portesGarageProducts, portesGarageCategories } from '../data/portes-garage'
import ServicePageLayout from '../components/layout/ServicePageLayout'

const seoText = `KASE Fermetures propose l'installation de portes de garage sectionnelles, basculantes et enroulables dans les Vosges. Nos portes de garage sont disponibles avec motorisation et télécommande pour un confort d'utilisation optimal. Isolation thermique renforcée, nombreux coloris et finitions disponibles. Que vous construisiez ou rénoviez, nous trouvons la solution adaptée à votre garage. Intervention rapide dans tout le département des Vosges et devis gratuit.`

export default function PortesGarage() {
  return (
    <>
      <Helmet>
        <title>Portes de Garage Sectionnelles, Basculantes — {SITE_NAME} | Vosges</title>
        <meta name="description" content="Portes de garage sectionnelles, basculantes et enroulables dans les Vosges. Motorisation disponible. Devis gratuit KASE Fermetures." />
        <link rel="canonical" href={`${BASE_URL}/portes-de-garage`} />
        <meta property="og:title" content={`Portes de Garage — ${SITE_NAME}`} />
        <meta property="og:description" content="Portes de garage sectionnelles, basculantes et enroulables. Installation dans les Vosges." />
        <meta property="og:url" content={`${BASE_URL}/portes-de-garage`} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
      </Helmet>
      <ServicePageLayout
        title="Portes de Garage"
        description="Portes de garage sectionnelles, basculantes et enroulables. Motorisation et télécommande disponibles."
        seoText={seoText}
        products={portesGarageProducts}
        categories={portesGarageCategories}
        breadcrumbItems={[{ label: 'Portes de Garage' }]}
      />
    </>
  )
}
