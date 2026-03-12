import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import PageLoader from './components/ui/PageLoader'

const Home = lazy(() => import('./pages/Home'))
const Fenetres = lazy(() => import('./pages/Fenetres'))
const Portes = lazy(() => import('./pages/Portes'))
const PortesGarage = lazy(() => import('./pages/PortesGarage'))
const Volets = lazy(() => import('./pages/Volets'))
const Contact = lazy(() => import('./pages/Contact'))
const DevisGratuit = lazy(() => import('./pages/DevisGratuit'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="fenetres" element={<Fenetres />} />
            <Route path="portes" element={<Portes />} />
            <Route path="portes-de-garage" element={<PortesGarage />} />
            <Route path="volets" element={<Volets />} />
            <Route path="contact" element={<Contact />} />
            <Route path="devis-gratuit" element={<DevisGratuit />} />
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
