import { Helmet } from 'react-helmet-async'
import { SITE_NAME, BASE_URL } from '../lib/constants'

const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: "Portes d'entrée sur mesure",
  provider: { '@type': 'LocalBusiness', name: 'KASE Fermetures' },
  areaServed: { '@type': 'Place', name: 'Vosges, Grand Est, France' },
  description: "Portes d'entrée EKO-OKNA en aluminium, PVC, acier et bois. Sécurité renforcée avec serrures multipoints et design personnalisé.",
  url: `${BASE_URL}/portes`,
}
import { portesProducts, portesCategories } from '../data/portes'
import ServicePageLayout from '../components/layout/ServicePageLayout'

const seoText = `Découvrez notre sélection de portes d'entrée haut de gamme EKO-OKNA. Disponibles en PVC, aluminium, acier et bois, nos portes d'entrée allient sécurité renforcée, isolation thermique et design contemporain. Chaque modèle est équipé de serrures multipoints et peut être personnalisé selon vos goûts : coloris, vitrage, poignées et accessoires. KASE Fermetures assure la pose professionnelle de votre porte d'entrée dans les Vosges et le Grand Est, avec un devis gratuit et sans engagement.`

export default function Portes() {
  return (
    <>
      <Helmet>
        <title>Portes d'entrée Aluminium, PVC, Acier — {SITE_NAME} | Vosges</title>
        <meta name="description" content="Portes d'entrée EKO-OKNA en aluminium, PVC, acier et bois. Sécurité renforcée et design personnalisé. Devis gratuit KASE Fermetures dans les Vosges." />
        <link rel="canonical" href={`${BASE_URL}/portes`} />
        <meta property="og:title" content={`Portes d'entrée — ${SITE_NAME}`} />
        <meta property="og:description" content="Portes d'entrée haut de gamme EKO-OKNA. Aluminium, PVC, acier, bois." />
        <meta property="og:url" content={`${BASE_URL}/portes`} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
      </Helmet>
      <ServicePageLayout
        title="Portes d'entrée"
        description="Portes d'entrée en aluminium, PVC, acier et bois. Sécurité renforcée avec serrures multipoints et design personnalisé."
        seoText={seoText}
        products={portesProducts}
        categories={portesCategories}
        breadcrumbItems={[{ label: "Portes d'entrée" }]}
      />
    </>
  )
}
