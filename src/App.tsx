import { Helmet } from 'react-helmet-async'
import Header from './components/sections/Header'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import Divider from './components/sections/Divider'
import ContactInfo from './components/sections/ContactInfo'
import Footer from './components/sections/Footer'

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "KASE Fermetures",
  "description": "Expert en menuiserie extérieure dans les Vosges : fenêtres, portes, portes de garage et volets.",
  "url": "https://kasefermetures.fr",
  "telephone": "+33782984436",
  "email": "contact@kasefermetures.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "60 Rue des Déportés",
    "addressLocality": "Saulcy-sur-Meurthe",
    "postalCode": "88580",
    "addressRegion": "Grand Est",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.238,
    "longitude": 6.965
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 48.238,
      "longitude": 6.965
    },
    "geoRadius": "50000"
  },
  "sameAs": ["https://www.instagram.com/kasefermetures/"]
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1E1E1E' }}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Header />
      <Hero />
      <Services />
      <Divider />
      <ContactInfo />
      <Footer />
    </div>
  )
}
