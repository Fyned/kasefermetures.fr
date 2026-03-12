import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_NAME, BASE_URL, PHONE, PHONE_HREF, FORMSPREE_ENDPOINT } from '../lib/constants'
import Breadcrumb from '../components/ui/Breadcrumb'

type ServiceType = 'fenetres' | 'portes' | 'portes-garage' | 'volets' | ''
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormErrors {
  [key: string]: string
}

const serviceOptions = [
  {
    id: 'fenetres' as const,
    label: 'Fenêtres',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3zm9 0v18M3 12h18" />
      </svg>
    ),
    description: 'PVC, aluminium ou bois',
  },
  {
    id: 'portes' as const,
    label: "Portes d'entrée",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V3h12l4 4v14H3zm9 0V3M14 10h1" />
      </svg>
    ),
    description: 'Aluminium, PVC, acier, bois',
  },
  {
    id: 'portes-garage' as const,
    label: 'Portes de Garage',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V8l9-5 9 5v13H3zm0-4h18M3 13h18" />
      </svg>
    ),
    description: 'Sectionnelles, basculantes, enroulables',
  },
  {
    id: 'volets' as const,
    label: 'Volets & BSO',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4V4zm0 4h16m0 4H4m0 4h16" />
      </svg>
    ),
    description: 'Roulants, battants, brise-soleil',
  },
]

const productOptions: Record<string, { id: string; label: string }[]> = {
  fenetres: [
    { id: 'pvc', label: 'PVC' },
    { id: 'aluminium', label: 'Aluminium' },
    { id: 'bois', label: 'Bois' },
    { id: 'coulissante', label: 'Coulissante' },
  ],
  portes: [
    { id: 'aluminium', label: 'Aluminium' },
    { id: 'pvc', label: 'PVC' },
    { id: 'acier', label: 'Acier' },
    { id: 'bois', label: 'Bois' },
  ],
  'portes-garage': [
    { id: 'sectionnelle', label: 'Sectionnelle' },
    { id: 'basculante', label: 'Basculante' },
    { id: 'enroulable', label: 'Enroulable' },
  ],
  volets: [
    { id: 'roulant', label: 'Volet roulant' },
    { id: 'battant', label: 'Volet battant' },
    { id: 'bso', label: 'Brise-soleil orientable (BSO)' },
  ],
}

const steps = [
  { number: 1, label: 'Service' },
  { number: 2, label: 'Produit' },
  { number: 3, label: 'Détails' },
  { number: 4, label: 'Contact' },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
}

export default function DevisGratuit() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [status, setStatus] = useState<FormStatus>('idle')

  const [serviceType, setServiceType] = useState<ServiceType>('')
  const [productType, setProductType] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [dimensions, setDimensions] = useState('')
  const [details, setDetails] = useState('')
  const [motorisation, setMotorisation] = useState(false)

  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [codePostal, setCodePostal] = useState('')
  const [message, setMessage] = useState('')
  const [rgpd, setRgpd] = useState(false)

  const [errors, setErrors] = useState<FormErrors>({})

  const goTo = (step: number) => {
    setDirection(step > currentStep ? 1 : -1)
    setCurrentStep(step)
  }

  const next = () => {
    if (currentStep < 4) goTo(currentStep + 1)
  }

  const prev = () => {
    if (currentStep > 1) goTo(currentStep - 1)
  }

  const validateStep4 = (): boolean => {
    const newErrors: FormErrors = {}
    if (!nom.trim()) newErrors.nom = 'Veuillez entrer votre nom'
    if (!telephone.trim()) newErrors.telephone = 'Veuillez entrer votre téléphone'
    else if (!/^[\d\s+()-]{8,}$/.test(telephone.trim()))
      newErrors.telephone = 'Numéro de téléphone invalide'
    if (!email.trim()) newErrors.email = 'Veuillez entrer votre email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      newErrors.email = 'Adresse email invalide'
    if (!rgpd) newErrors.rgpd = "Veuillez accepter la politique de confidentialité"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateStep4()) return
    setStatus('submitting')

    const serviceLabel = serviceOptions.find((s) => s.id === serviceType)?.label || serviceType
    const productLabel =
      productOptions[serviceType]?.find((p) => p.id === productType)?.label || productType

    const body = {
      service: serviceLabel,
      produit: productLabel,
      quantite: quantity,
      dimensions,
      details,
      motorisation: motorisation ? 'Oui' : 'Non',
      nom,
      telephone,
      email,
      codePostal,
      message,
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <>
        <Helmet>
          <title>Demande envoyée — {SITE_NAME}</title>
        </Helmet>
        <div className="min-h-[60vh] bg-white">
          <div className="mx-auto max-w-2xl px-4 py-20 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-kase-green"
            >
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h1 className="text-3xl font-bold text-kase-anthracite font-[Outfit]">
              Votre demande a bien été envoyée !
            </h1>
            <p className="mt-4 text-lg text-kase-gray-dark">
              Nous vous recontacterons dans les plus brefs délais pour établir votre devis personnalisé.
            </p>
            <div className="mt-8 rounded-xl border border-kase-gray-light bg-kase-off-white p-6">
              <p className="text-sm text-kase-gray-dark">
                Besoin d'une réponse rapide ? Appelez-nous directement :
              </p>
              <a href={PHONE_HREF} className="mt-2 inline-block text-xl font-bold text-kase-green hover:text-kase-green-dark transition-colors">
                {PHONE}
              </a>
            </div>
            <a
              href="/"
              className="mt-8 inline-block rounded-lg bg-kase-anthracite px-8 py-3 font-medium text-white transition-colors hover:bg-kase-charcoal"
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Devis Gratuit — {SITE_NAME} | Menuiserie Vosges</title>
        <meta
          name="description"
          content="Demandez votre devis gratuit pour fenêtres, portes, portes de garage et volets. KASE Fermetures, artisan menuisier dans les Vosges."
        />
        <link rel="canonical" href={`${BASE_URL}/devis-gratuit`} />
        <meta property="og:title" content={`Devis Gratuit — ${SITE_NAME}`} />
        <meta property="og:description" content="Demandez votre devis gratuit. Installation de menuiseries dans les Vosges." />
        <meta property="og:url" content={`${BASE_URL}/devis-gratuit`} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero - Dark */}
      <section className="bg-kase-anthracite py-10 md:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <Breadcrumb items={[{ label: 'Devis Gratuit' }]} />
          <h1 className="mt-4 text-3xl font-bold md:text-4xl font-[Outfit] text-kase-white">
            Demandez votre devis gratuit
          </h1>
          <p className="mt-2 text-kase-gray-mid md:text-lg">
            Décrivez votre projet en quelques étapes. Nous vous répondons sous 48h.
          </p>
        </div>
      </section>

      {/* Wizard - White Background */}
      <section className="bg-white py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-4">

          {/* Step Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                        currentStep >= step.number
                          ? 'bg-kase-green text-white shadow-lg shadow-kase-green/25'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {currentStep > step.number ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium hidden sm:block ${
                        currentStep >= step.number ? 'text-kase-anthracite' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`mx-1 sm:mx-2 h-0.5 w-8 sm:w-16 md:w-28 transition-all duration-500 ${
                        currentStep > step.number ? 'bg-kase-green' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              {/* Step 1 — Service Type */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <h2 className="mb-2 text-2xl font-bold text-kase-anthracite font-[Outfit]">
                    Quel type de projet ?
                  </h2>
                  <p className="mb-8 text-gray-500">
                    Sélectionnez le type de menuiserie qui vous intéresse.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setServiceType(opt.id)
                          setProductType('')
                          next()
                        }}
                        className={`group relative flex flex-col items-start rounded-xl border-2 p-6 text-left transition-all duration-200 hover:shadow-lg ${
                          serviceType === opt.id
                            ? 'border-kase-green bg-kase-green/5 shadow-md'
                            : 'border-gray-200 bg-white hover:border-kase-green/50'
                        }`}
                      >
                        <div
                          className={`mb-4 rounded-lg p-3 transition-colors ${
                            serviceType === opt.id
                              ? 'bg-kase-green text-white'
                              : 'bg-gray-100 text-gray-500 group-hover:bg-kase-green/10 group-hover:text-kase-green'
                          }`}
                        >
                          {opt.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-kase-anthracite">{opt.label}</h3>
                        <p className="mt-1 text-sm text-gray-500">{opt.description}</p>
                        <div
                          className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                            serviceType === opt.id
                              ? 'border-kase-green bg-kase-green'
                              : 'border-gray-300'
                          }`}
                        >
                          {serviceType === opt.id && (
                            <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2 — Product Type */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <h2 className="mb-2 text-2xl font-bold text-kase-anthracite font-[Outfit]">
                    Quel type de produit ?
                  </h2>
                  <p className="mb-8 text-gray-500">
                    Précisez le matériau ou le type de produit souhaité.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(productOptions[serviceType] || []).map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setProductType(opt.id)
                          next()
                        }}
                        className={`rounded-xl border-2 px-6 py-5 text-left font-medium transition-all duration-200 hover:shadow-md ${
                          productType === opt.id
                            ? 'border-kase-green bg-kase-green/5 text-kase-anthracite shadow-sm'
                            : 'border-gray-200 text-gray-700 hover:border-kase-green/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base">{opt.label}</span>
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                              productType === opt.id
                                ? 'border-kase-green bg-kase-green'
                                : 'border-gray-300'
                            }`}
                          >
                            {productType === opt.id && (
                              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={prev}
                    className="mt-8 text-sm font-medium text-gray-500 transition-colors hover:text-kase-anthracite"
                  >
                    ← Étape précédente
                  </button>
                </motion.div>
              )}

              {/* Step 3 — Details */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <h2 className="mb-2 text-2xl font-bold text-kase-anthracite font-[Outfit]">
                    Détails du projet
                  </h2>
                  <p className="mb-8 text-gray-500">
                    Aidez-nous à mieux comprendre vos besoins.
                  </p>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="quantity" className="mb-1.5 block text-sm font-medium text-kase-anthracite">
                        Nombre d'ouvertures <span className="text-kase-green">*</span>
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        min="1"
                        max="50"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-kase-anthracite outline-none transition-all duration-200 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="dimensions" className="mb-1.5 block text-sm font-medium text-kase-anthracite">
                        Dimensions approximatives
                      </label>
                      <input
                        id="dimensions"
                        type="text"
                        placeholder="Ex : 120 x 140 cm"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-kase-anthracite placeholder-gray-400 outline-none transition-all duration-200 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="details" className="mb-1.5 block text-sm font-medium text-kase-anthracite">
                        Informations complémentaires
                      </label>
                      <textarea
                        id="details"
                        rows={3}
                        placeholder="Coloris souhaité, type de vitrage, contraintes particulières..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="w-full resize-vertical rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-kase-anthracite placeholder-gray-400 outline-none transition-all duration-200 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20"
                      />
                    </div>
                    {(serviceType === 'volets' || serviceType === 'portes-garage') && (
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={motorisation}
                          onChange={(e) => setMotorisation(e.target.checked)}
                          className="h-5 w-5 rounded border-gray-300 text-kase-green accent-kase-green"
                        />
                        <span className="text-sm font-medium text-kase-anthracite">
                          Je souhaite une motorisation
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={prev}
                      className="text-sm font-medium text-gray-500 transition-colors hover:text-kase-anthracite"
                    >
                      ← Étape précédente
                    </button>
                    <button
                      onClick={next}
                      className="rounded-lg bg-kase-green px-8 py-3 font-medium text-white transition-all duration-200 hover:bg-kase-green-dark hover:shadow-lg hover:shadow-kase-green/25"
                    >
                      Continuer →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4 — Contact */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <h2 className="mb-2 text-2xl font-bold text-kase-anthracite font-[Outfit]">
                    Vos coordonnées
                  </h2>
                  <p className="mb-8 text-gray-500">
                    Pour vous envoyer votre devis personnalisé.
                  </p>
                  <div className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="nom" className="mb-1.5 block text-sm font-medium text-kase-anthracite">
                          Nom complet <span className="text-kase-green">*</span>
                        </label>
                        <input
                          id="nom"
                          type="text"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          placeholder="Jean Dupont"
                          aria-invalid={!!errors.nom}
                          aria-describedby={errors.nom ? 'nom-error' : undefined}
                          className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-kase-anthracite placeholder-gray-400 outline-none transition-all duration-200 ${
                            errors.nom
                              ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                              : 'border-gray-200 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20'
                          }`}
                        />
                        {errors.nom && (
                          <p id="nom-error" role="alert" className="mt-1 text-sm text-red-500">{errors.nom}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="tel" className="mb-1.5 block text-sm font-medium text-kase-anthracite">
                          Téléphone <span className="text-kase-green">*</span>
                        </label>
                        <input
                          id="tel"
                          type="tel"
                          value={telephone}
                          onChange={(e) => setTelephone(e.target.value)}
                          placeholder="07 00 00 00 00"
                          aria-invalid={!!errors.telephone}
                          aria-describedby={errors.telephone ? 'tel-error' : undefined}
                          className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-kase-anthracite placeholder-gray-400 outline-none transition-all duration-200 ${
                            errors.telephone
                              ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                              : 'border-gray-200 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20'
                          }`}
                        />
                        {errors.telephone && (
                          <p id="tel-error" role="alert" className="mt-1 text-sm text-red-500">{errors.telephone}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-kase-anthracite">
                          Email <span className="text-kase-green">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jean@exemple.fr"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-kase-anthracite placeholder-gray-400 outline-none transition-all duration-200 ${
                            errors.email
                              ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                              : 'border-gray-200 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20'
                          }`}
                        />
                        {errors.email && (
                          <p id="email-error" role="alert" className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="cp" className="mb-1.5 block text-sm font-medium text-kase-anthracite">
                          Code postal
                        </label>
                        <input
                          id="cp"
                          type="text"
                          value={codePostal}
                          onChange={(e) => setCodePostal(e.target.value)}
                          placeholder="88000"
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-kase-anthracite placeholder-gray-400 outline-none transition-all duration-200 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="msg" className="mb-1.5 block text-sm font-medium text-kase-anthracite">
                        Message
                      </label>
                      <textarea
                        id="msg"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Précisions sur votre projet, disponibilités..."
                        className="w-full resize-vertical rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-kase-anthracite placeholder-gray-400 outline-none transition-all duration-200 focus:border-kase-green focus:ring-2 focus:ring-kase-green/20"
                      />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rgpd}
                        onChange={(e) => setRgpd(e.target.checked)}
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 text-kase-green accent-kase-green"
                        aria-invalid={!!errors.rgpd}
                      />
                      <span className="text-sm text-gray-600">
                        J'accepte que mes données soient utilisées pour traiter ma demande de devis conformément à la{' '}
                        <a href="/mentions-legales" className="text-kase-green underline hover:text-kase-green-dark">
                          politique de confidentialité
                        </a>
                        . <span className="text-kase-green">*</span>
                      </span>
                    </label>
                    {errors.rgpd && (
                      <p role="alert" className="text-sm text-red-500">{errors.rgpd}</p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.
                    </div>
                  )}

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={prev}
                      className="text-sm font-medium text-gray-500 transition-colors hover:text-kase-anthracite"
                    >
                      ← Étape précédente
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={status === 'submitting'}
                      className="rounded-lg bg-kase-green px-6 sm:px-10 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-kase-green-dark hover:shadow-lg hover:shadow-kase-green/25 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'submitting' ? (
                        <span className="flex items-center gap-2">
                          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Envoi en cours...
                        </span>
                      ) : (
                        'Envoyer ma demande'
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary sidebar on step 3-4 */}
          {currentStep >= 3 && serviceType && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-5"
            >
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                Récapitulatif
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-kase-green/10 px-3 py-1 text-sm font-medium text-kase-green">
                  {serviceOptions.find((s) => s.id === serviceType)?.label}
                </span>
                {productType && (
                  <span className="rounded-full bg-kase-anthracite/10 px-3 py-1 text-sm font-medium text-kase-anthracite">
                    {productOptions[serviceType]?.find((p) => p.id === productType)?.label}
                  </span>
                )}
                {quantity !== '1' && (
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                    {quantity} ouverture{Number(quantity) > 1 ? 's' : ''}
                  </span>
                )}
                {motorisation && (
                  <span className="rounded-full bg-kase-green/10 px-3 py-1 text-sm font-medium text-kase-green">
                    Motorisation
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
