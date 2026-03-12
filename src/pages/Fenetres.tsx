import { Helmet } from 'react-helmet-async'
import { SITE_NAME, BASE_URL } from '../lib/constants'

const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Fenêtres sur mesure',
  provider: { '@type': 'LocalBusiness', name: 'KASE Fermetures' },
  areaServed: { '@type': 'Place', name: 'Vosges, Grand Est, France' },
  description: 'Fenêtres sur mesure en PVC, aluminium et bois. Double et triple vitrage, haute isolation thermique et acoustique.',
  url: `${BASE_URL}/fenetres`,
}
import { fenetresProducts, fenetresCategories } from '../data/fenetres'
import ServicePageLayout from '../components/layout/ServicePageLayout'

const seoText = `KASE Fermetures vous propose une large gamme de fenêtres sur mesure en PVC, aluminium et bois, adaptées aux exigences climatiques des Vosges. Nos fenêtres offrent une isolation thermique et acoustique optimale grâce au double et triple vitrage. Que ce soit pour une construction neuve ou une rénovation, nous sélectionnons les meilleures menuiseries certifiées pour garantir performance énergétique et confort au quotidien. Basés à Saulcy-sur-Meurthe, nous intervenons dans tout le département des Vosges et le Grand Est pour l'installation professionnelle de vos fenêtres.`

export default function Fenetres() {
  return (
    <>
      <Helmet>
        <title>Fenêtres PVC, Aluminium, Bois — {SITE_NAME} | Vosges</title>
        <meta name="description" content="Fenêtres sur mesure PVC, aluminium et bois dans les Vosges. Double et triple vitrage, haute isolation. Devis gratuit par KASE Fermetures à Saint-Dié-des-Vosges." />
        <link rel="canonical" href={`${BASE_URL}/fenetres`} />
        <meta property="og:title" content={`Fenêtres sur mesure — ${SITE_NAME}`} />
        <meta property="og:description" content="Fenêtres PVC, aluminium et bois sur mesure dans les Vosges. Isolation optimale." />
        <meta property="og:url" content={`${BASE_URL}/fenetres`} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
      </Helmet>
      <ServicePageLayout
        title="Fenêtres"
        description="Fenêtres PVC, aluminium et bois sur mesure. Isolation thermique et acoustique optimale avec double et triple vitrage."
        seoText={seoText}
        products={fenetresProducts}
        categories={fenetresCategories}
        breadcrumbItems={[{ label: 'Fenêtres' }]}
      />
    </>
  )
}
