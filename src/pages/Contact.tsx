import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_NAME, BASE_URL, PHONE, PHONE_HREF, EMAIL, ADDRESS, INSTAGRAM, FORMSPREE_ENDPOINT } from '../lib/constants'
import Breadcrumb from '../components/ui/Breadcrumb'

const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact — KASE Fermetures',
  url: `${BASE_URL}/contact`,
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'KASE Fermetures',
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
  },
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const serviceOptions = [
  { value: '', label: 'Sélectionnez un service' },
  { value: 'fenetres', label: 'Fenêtres' },
  { value: 'portes', label: "Portes d'entrée" },
  { value: 'portes-garage', label: 'Portes de Garage' },
  { value: 'volets', label: 'Volets & BSO' },
  { value: 'autre', label: 'Autre' },
]

export default function Contact() {
  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [rgpd, setRgpd] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!nom.trim()) e.nom = 'Veuillez entrer votre nom'
    if (!telephone.trim()) e.telephone = 'Veuillez entrer votre téléphone'
    else if (!/^[\d\s+()-]{8,}$/.test(telephone.trim())) e.telephone = 'Numéro invalide'
    if (!email.trim()) e.email = 'Veuillez entrer votre email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Email invalide'
    if (!message.trim()) e.message = 'Veuillez entrer un message'
    if (!rgpd) e.rgpd = "Veuillez accepter la politique de confidentialité"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nom,
          telephone,
          email,
          service: serviceOptions.find(s => s.value === service)?.label || '',
          message,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact — {SITE_NAME} | Menuiserie Vosges</title>
        <meta name="description" content="Contactez KASE Fermetures pour vos projets de menuiserie dans les Vosges. Devis gratuit, réponse sous 48h. Appelez le 07 82 98 44 36." />
        <link rel="canonical" href={`${BASE_URL}/contact`} />
        <meta property="og:title" content={`Contact — ${SITE_NAME}`} />
        <meta property="og:description" content="Contactez KASE Fermetures pour vos projets de menuiserie. Devis gratuit dans les Vosges." />
        <meta property="og:url" content={`${BASE_URL}/contact`} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-kase-anthracite py-10 md:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <Breadcrumb items={[{ label: 'Contact' }]} />
          <h1 className="mt-4 text-3xl font-bold md:text-4xl font-[Outfit] text-kase-white">
            Contactez-nous
          </h1>
          <p className="mt-2 text-kase-gray-mid md:text-lg">
            Une question ou un projet ? Nous sommes à votre écoute.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Form — Left */}
            <div className="md:col-span-3">
              {status === 'success' ? (
                <div className="rounded-xl border border-kase-green/20 bg-kase-green/5 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-kase-green">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-kase-anthracite font-[Outfit]">
                    Message envoyé !
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h2 className="text-xl font-bold text-kase-anthracite font-[Outfit]">
                    Envoyez-nous un message
                  </h2>

                  {/* Nom + Téléphone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="nom" className="mb-1 block text-sm font-medium text-gray-700">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="nom"
                        type="text"
                        value={nom}
                        onChange={e => setNom(e.target.value)}
                        placeholder="Jean Dupont"
                        className={`w-full rounded-lg border bg-white px-4 py-3 text-kase-anthracite outline-none transition-colors placeholder:text-gray-400 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20 ${errors.nom ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.nom && <p className="mt-1 text-xs text-red-500">{errors.nom}</p>}
                    </div>
                    <div>
                      <label htmlFor="telephone" className="mb-1 block text-sm font-medium text-gray-700">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="telephone"
                        type="tel"
                        value={telephone}
                        onChange={e => setTelephone(e.target.value)}
                        placeholder="07 00 00 00 00"
                        className={`w-full rounded-lg border bg-white px-4 py-3 text-kase-anthracite outline-none transition-colors placeholder:text-gray-400 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20 ${errors.telephone ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.telephone && <p className="mt-1 text-xs text-red-500">{errors.telephone}</p>}
                    </div>
                  </div>

                  {/* Email + Service */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="jean@exemple.fr"
                        className={`w-full rounded-lg border bg-white px-4 py-3 text-kase-anthracite outline-none transition-colors placeholder:text-gray-400 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="service" className="mb-1 block text-sm font-medium text-gray-700">
                        Service concerné
                      </label>
                      <select
                        id="service"
                        value={service}
                        onChange={e => setService(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-kase-anthracite outline-none transition-colors focus:border-kase-green focus:ring-2 focus:ring-kase-green/20"
                      >
                        {serviceOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={5}
                      placeholder="Décrivez votre projet ou posez-nous votre question..."
                      className={`w-full rounded-lg border bg-white px-4 py-3 text-kase-anthracite outline-none transition-colors placeholder:text-gray-400 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20 resize-none ${errors.message ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  {/* RGPD */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rgpd}
                        onChange={e => setRgpd(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-kase-green accent-kase-green"
                      />
                      <span className="text-xs text-gray-500 leading-relaxed">
                        J'accepte que mes données soient utilisées pour traiter ma demande conformément à la{' '}
                        <a href="/mentions-legales" className="text-kase-green underline hover:text-kase-green-dark">
                          politique de confidentialité
                        </a>
                        . <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.rgpd && <p className="mt-1 text-xs text-red-500">{errors.rgpd}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="rounded-lg bg-kase-green px-8 py-3.5 font-semibold text-white transition-all hover:bg-kase-green-dark hover:shadow-lg hover:shadow-kase-green/25 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </form>
              )}
            </div>

            {/* Info — Right */}
            <div className="md:col-span-2">
              <div className="space-y-8">
                {/* Adresse */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-kase-green">
                    Adresse
                  </h3>
                  <div className="mt-3 flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-kase-gray-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-kase-anthracite">{ADDRESS.street}</p>
                      <p className="text-gray-500">{ADDRESS.postalCode} {ADDRESS.city}</p>
                    </div>
                  </div>
                </div>

                {/* Téléphone */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-kase-green">
                    Téléphone
                  </h3>
                  <a
                    href={PHONE_HREF}
                    className="mt-3 flex items-center gap-3 text-kase-anthracite transition-colors hover:text-kase-green"
                  >
                    <svg className="h-5 w-5 shrink-0 text-kase-gray-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span className="font-medium">{PHONE}</span>
                  </a>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-kase-green">
                    Email
                  </h3>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-3 flex items-center gap-3 text-kase-anthracite transition-colors hover:text-kase-green"
                  >
                    <svg className="h-5 w-5 shrink-0 text-kase-gray-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <span className="font-medium">{EMAIL}</span>
                  </a>
                </div>

                {/* Instagram */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-kase-green">
                    Suivez-nous
                  </h3>
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-3 text-kase-anthracite transition-colors hover:text-kase-green"
                  >
                    <svg className="h-5 w-5 shrink-0 text-kase-gray-mid" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="font-medium">@kasefermetures</span>
                  </a>
                </div>

                {/* Horaires */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-kase-green">
                    Horaires
                  </h3>
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium text-kase-anthracite">Lun – Ven :</span> 8h00 – 18h00</p>
                    <p><span className="font-medium text-kase-anthracite">Samedi :</span> Sur rendez-vous</p>
                    <p><span className="font-medium text-kase-anthracite">Dimanche :</span> Fermé</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-xl bg-kase-off-white p-6">
                  <p className="text-sm font-medium text-kase-anthracite">
                    Besoin d'un devis rapide ?
                  </p>
                  <a
                    href="/devis-gratuit"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-kase-green px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-kase-green-dark hover:shadow-lg hover:shadow-kase-green/25"
                  >
                    Demander un devis gratuit
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
